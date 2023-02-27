'use client';

import { Input } from '@/components/Input';
import Link from 'next/link';
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
  validateGender,
  validateRegister,
  validateNameKatakana,
} from "@/utils/validate";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function PersonalRegister() {
  const { enqueueSnackbar } = useSnackbar();
  const [firstName, setFirstName] = useState("");
  const [firstNameKatakana, setFirstNameKatakana] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameKatakana, setLastNameKatakana] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    firstName: "",
    firstNameKatakana: "",
    lastName: "",
    lastNameKatakana: "",
    email: email,
    tel: "",
    password: "",
    gender: "",
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
  const checkValidateGender = () => {
    const checkValidateGender = validateGender(gender);
    setValidate({ ...validate, gender: checkValidateGender });
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
      !checkValidate.password
    ) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (data.status === "failure") {
          enqueueSnackbar(data.message, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 'success') {
          enqueueSnackbar('Registration successful', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          router.push('/auth/login');
        }
      } catch (error) {
        enqueueSnackbar('Registration failed', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate(checkValidate);
    }
  };

  return (
    <div className={` mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">サインアップ</h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <Input
            name="firstName"
            type="text"
            value={firstName}
            placeholder="名"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            validate={
              firstName
                ? () => checkValidateName(firstName, "firstName")
                : () => {}
            }
            messageError={validate.firstName}
          />
          <Input
            name="firstNameKatakana"
            type="text"
            placeholder="名（カタカナ）"
            value={firstNameKatakana}
            onChange={(e) => {
              setFirstNameKatakana(e.target.value);
            }}
            validate={
              firstNameKatakana
                ? () =>
                    checkValidateNameKatakana(firstNameKatakana, "firstName")
                : () => {}
            }
            messageError={validate.firstNameKatakana}
          />
          <Input
            name="lastName"
            type="text"
            placeholder="氏"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            validate={
              lastName
                ? () => checkValidateName(lastName, "lastName")
                : () => {}
            }
            messageError={validate.lastName}
          />
          <Input
            name="lastNameKatakana"
            type="text"
            placeholder="氏（カタカナ）"
            value={lastNameKatakana}
            onChange={(e) => {
              setLastNameKatakana(e.target.value);
            }}
            validate={
              lastNameKatakana
                ? () => checkValidateNameKatakana(lastNameKatakana, "lastName")
                : () => {}
            }
            messageError={validate.lastNameKatakana}
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
          <Input
            name="gender"
            type="text"
            value={gender}
            placeholder="性 別"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            validate={gender ? checkValidateGender : () => {}}
            messageError={validate.gender}
          />
          <Input
            name="phonenumber"
            type="text"
            value={tel}
            placeholder="携帯電話番号"
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
            <div className="w-full mb-4 flex justify-end">
              <Link href="" className="text-base text-primary">
                パスワードをお忘れの場合
              </Link>
            </div>
            <div className="w-full mb-2 flex flex-col justify-center items-center">
              <div className="w-full text-base text-third flex justify-end">利用規約とプライバシーポリシーに同意</div>
              <div
                className="mt-[5px] w-7 h-7 outline-none border-2 border-primary border-solid rounded-md flex justify-center items-center text-third
                cursor-pointer"
                onClick={() => setAcceptPolicy((prev) => !prev)}
              >
                {acceptPolicy && <RememberPasswordIcon />}
              </div>
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
    </div>
  );
}
