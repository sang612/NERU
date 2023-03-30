'use client';

import { Input } from '@/components/Input';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { RememberPasswordIcon } from '@/assets/icons';
import { Button } from '@/components/Button/button';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
import {
  validatePassword,
  validateName,
  validateEmail,
  validateTelPhone,
  validateRegister,
  validateNameKatakana,
} from '@/utils/validate';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { InputRadio } from '@/components/InputRadio';
import { ModalForgetPassword } from '@/components/Modal/ForgetPassword';
import Link from 'next/link';

export default function PersonalRegister() {
  const [activeItem, setActiveItem] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [firstName, setFirstName] = useState('');
  const [firstNameKatakana, setFirstNameKatakana] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameKatakana, setLastNameKatakana] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState('Male');
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailForgetPassword, setEmailForgetPassword] = useState('');
  const [validate, setValidate] = useState({
    firstName: '',
    firstNameKatakana: '',
    lastName: '',
    lastNameKatakana: '',
    email: email,
    tel: '',
    password: '',
    gender: '',
    acceptPolicy: '',
  });
  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, [type]: checkValidateFullName });
  };
  const checkValidateNameKatakana = (name, type) => {
    const checkValidateFullName = validateNameKatakana(name, type);
    setValidate({ ...validate, [`${type}Katakana`]: checkValidateFullName });
  };
  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const checkValidatePassword = () => {
    const checkValidatePassword = validatePassword(password, 'password');
    setValidate({ ...validate, password: checkValidatePassword });
  };
  const checkValidateTel = () => {
    const checkValidateTel = validateTelPhone(tel);
    setValidate({ ...validate, tel: checkValidateTel });
  };
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkValidate = validateRegister(
      firstName,
      firstNameKatakana,
      lastName,
      lastNameKatakana,
      email,
      gender,
      tel,
      password
    );
    if (
      !checkValidate.firstName &&
      !checkValidate.firstNameKatakana &&
      !checkValidate.lastName &&
      !checkValidate.lastNameKatakana &&
      !checkValidate.email &&
      !checkValidate.gender &&
      !checkValidate.tel &&
      !checkValidate.password &&
      acceptPolicy
    ) {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            first_name_kana: firstNameKatakana,
            last_name: lastName,
            last_name_kana: lastNameKatakana,
            phone: tel,
            gender: gender,
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.status !== 200 && data.status !== 201) {
          enqueueSnackbar(data.message ? data?.message : data?.error, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 200 || data.status === 201) {
          enqueueSnackbar('登録することは成功します。', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          router.push('/auth/login');
        }
      } catch (error) {
        enqueueSnackbar('登録することは失敗します。', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate({
        ...checkValidate,
        acceptPolicy: '続行するには利用規約とプライバシーポリシーに同意してください。',
      });
    }
  };
  const handleSendMail = async () => {
    const checkValidateEmail = validateEmail(emailForgetPassword);
    if (!checkValidateEmail) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/forget-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: emailForgetPassword,
            }),
          }
        );
        const data = await response.json();
        if (data.status !== 200 && data.status !== 201) {
          enqueueSnackbar(data.message ? data?.message : data?.error, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 200 || data.status === 201) {
          enqueueSnackbar('電子メールを正常に送信', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          setActiveItem();
        }
      } catch (error) {
        enqueueSnackbar('メール送信失敗', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      enqueueSnackbar(checkValidateEmail, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  return (
    <div className={` mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          サインアップ
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <Input
            name="lastName"
            type="text"
            value={lastName}
            placeholder="名"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            validate={lastName ? () => checkValidateName(lastName, 'lastName') : () => {}}
            messageError={validate.lastName}
          />
          <Input
            name="lastNameKatakana"
            type="text"
            placeholder="名(カタカナ)"
            value={lastNameKatakana}
            onChange={(e) => {
              setLastNameKatakana(e.target.value);
            }}
            validate={
              lastNameKatakana
                ? () => checkValidateNameKatakana(lastNameKatakana, 'lastName')
                : () => {}
            }
            messageError={validate.lastNameKatakana}
          />
          <Input
            name="firstName"
            type="text"
            placeholder="姓"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            validate={firstName ? () => checkValidateName(firstName, 'firstName') : () => {}}
            messageError={validate.firstName}
          />
          <Input
            name="firstNameKatakana"
            type="text"
            placeholder="姓(カタカナ)"
            value={firstNameKatakana}
            onChange={(e) => {
              setFirstNameKatakana(e.target.value);
            }}
            validate={
              firstNameKatakana
                ? () => checkValidateNameKatakana(firstNameKatakana, 'firstName')
                : () => {}
            }
            messageError={validate.firstNameKatakana}
          />
          <Input
            name="email"
            type="text"
            value={email}
            placeholder="メールアドレス"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            validate={email ? checkValidateEmail : () => {}}
            messageError={validate.email}
          />
          <div className="flex flex-row mb-4 -mt-4">
            <InputRadio
              text="男性"
              name="gender"
              checked
              value="Male"
              border={false}
              className="w-1/3 sm:w-1/4"
              onChange={(e) => setGender(e)}
            />
            <InputRadio
              text="女性"
              name="gender"
              value="Female"
              border={false}
              className="w-1/3 sm:w-1/4"
              onChange={(e) => setGender(e)}
            />
          </div>
          <Input
            name="phonenumber"
            type="text"
            value={tel}
            placeholder="電話番号"
            onChange={(e) => {
              setTel(e.target.value);
            }}
            validate={tel ? checkValidateTel : () => {}}
            messageError={validate.tel}
          />
          <div
            className={cx(
              'w-full relative mb-[24px]',
              css`
                input {
                  padding-right: calc(6% + 24px);
                }
              `
            )}
          >
            <Input
              name="password"
              type={isShowPass ? 'text' : 'password'}
              value={password}
              placeholder="パスワード"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              validate={password ? checkValidatePassword : () => {}}
              messageError={validate.password}
            />
            {isShowPass ? (
              <div className={`h-14 xsm:h-16 absolute top-0 right-[4%] flex items-center`}>
                <EyeInvisibleFilled
                  onClick={() => setIsShowPass(false)}
                  className={`${validate.password ? 'text-error' : 'text-primary'}`}
                />
              </div>
            ) : (
              <div className={`h-14 xsm:h-16 absolute top-0 right-[4%] flex items-center`}>
                <EyeFilled
                  onClick={() => setIsShowPass(true)}
                  className={`${validate.password ? 'text-error' : 'text-primary'}`}
                />
              </div>
            )}
          </div>

          <div className="left-0 w-full">
            <div className="w-full mb-4 flex justify-between">
              <div
                onClick={() => router.push('auth/login')}
                className="text-base text-primary hover:cursor-pointer"
              >
                ログイン
              </div>
              <div
                onClick={() => setActiveItem(true)}
                className="text-base text-primary hover:cursor-pointer"
              >
                パスワードをお忘れの場合
              </div>
            </div>
            <div className="w-full mb-2 flex flex-col justify-center items-center">
              <div className="w-full text-base text-third flex justify-end">
                <Link href="/terms-of-service" className="text-primary underline">
                  利用規約
                </Link>
                と
                <Link href="/privacy-policy" className="text-primary underline">
                  プライバシーポリシー
                </Link>
                に同意
              </div>
              <div
                className="mt-[5px] w-7 h-7 outline-none border-2 border-primary border-solid rounded-md flex justify-center items-center text-third
                cursor-pointer"
                onClick={() => setAcceptPolicy((prev) => !prev)}
              >
                {acceptPolicy && <RememberPasswordIcon width={25} height={19} />}
              </div>
              {!acceptPolicy && <h3 className="text-error">{validate.acceptPolicy}</h3>}
            </div>
            <Button
              classname="bg-primary mt-[20px] ssm:mt-[60px]"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              サインアップ
            </Button>
          </div>
        </div>
      </div>
      {activeItem && (
        <ModalForgetPassword
          action={handleSendMail}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setEmailForgetPassword={setEmailForgetPassword}
        />
      )}
    </div>
  );
}
