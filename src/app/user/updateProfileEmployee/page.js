'use client';
import { Input } from '@/components/Input';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { Inter } from '@next/font/google';
import { Button } from '@/components/Button/button';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
import { validateEmail, validatePassword } from '@/utils/validate';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function EnterpriseRegister() {
  const router = useRouter();
  const { user, token, legal } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPassConfirm, setIsShowPassConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const checkValidatePassword = () => {
    const checkValidatePassword = validatePassword(password, 'password');
    setValidate({ ...validate, password: checkValidatePassword });
  };
  const checkValidatePasswordConfirm = () => {
    const checkValidatePasswordConfirm =
      password === passwordConfirm ? '' : 'パスワードが一致しません。';
    setValidate({ ...validate, passwordConfirm: checkValidatePasswordConfirm });
  };
  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
    const validateEmployeeEmail = !user?.email ? validateEmail(email) : '';
    const validateEmployeePassword = validatePassword(password, 'password');
    const validateEmployeePasswordConfirm =
      password === passwordConfirm ? '' : 'パスワードが一致しません。';
    if (!validateEmployeePassword && !validateEmployeePasswordConfirm && !validateEmployeeEmail) {
      setIsLoading(true);
      let response;
      if (email) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/upload-infomation/${user.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              accessToken: token,
            },
            body: JSON.stringify({
              password: password,
              email: email,
            }),
          }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/upload-infomation/${user.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              accessToken: token,
            },
            body: JSON.stringify({
              password: password,
            }),
          }
        );
      }
      const data = await response.json();
      setIsLoading(false);
      if (data.status !== 200 && data.status !== 201) {
        enqueueSnackbar(data.message ? data?.message : data?.error, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        return;
      } else if (data.status === 200 || data.status === 201) {
        enqueueSnackbar('プロフィールの更新が成功しました', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        router.push('/notification/second');
      }
    } else {
      setValidate({
        email: validateEmployeeEmail,
        password: validateEmployeePassword,
        passwordConfirm: validateEmployeePasswordConfirm,
      });
    }
  };

  return (
    <div
      className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}
    >
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          プロフィールの更新
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <Input
            disabled
            name="company"
            type="text"
            value={legal?.enterprise_id?.company_name}
            placeholder="会社名"
          />
          <Input
            disabled
            name="department"
            type="text"
            value={legal?.department_name}
            placeholder="部署名"
          />
          <Input
            disabled
            name="employeeNumber"
            type="text"
            value={legal?.number_of_employee}
            placeholder="社員番号"
          />
          <Input disabled name="mr" type="text" value={user.last_name} placeholder="姓" />
          <Input disabled name="name" type="text" value={user.first_name} placeholder="名" />
          {user.email ? (
            <Input
              disabled
              name="email"
              type="text"
              value={user.email}
              placeholder="メールアドレス"
            />
          ) : (
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
          )}

          <div
            className={cx(
              'w-full relative',
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
          <div
            className={cx(
              'w-full relative mb-[35px]',
              css`
                input {
                  padding-right: calc(6% + 24px);
                }
              `
            )}
          >
            <Input
              name="passwordConfirm"
              type={isShowPassConfirm ? 'text' : 'password'}
              value={passwordConfirm}
              placeholder="パスワード"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              validate={passwordConfirm ? checkValidatePasswordConfirm : () => {}}
              messageError={validate.passwordConfirm}
            />
            {isShowPassConfirm ? (
              <div className={`h-14 xsm:h-16 absolute top-0 right-[4%] flex items-center`}>
                <EyeInvisibleFilled
                  onClick={() => setIsShowPassConfirm(false)}
                  className={`${validate.passwordConfirm ? 'text-error' : 'text-primary'}`}
                />
              </div>
            ) : (
              <div className={`h-14 xsm:h-16 absolute top-0 right-[4%] flex items-center`}>
                <EyeFilled
                  onClick={() => setIsShowPassConfirm(true)}
                  className={`${validate.passwordConfirm ? 'text-error' : 'text-primary'}`}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            <Button
              onClick={handleSubmit}
              classname="bg-primary mt-[12.83px]"
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
