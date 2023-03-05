'use client';
import { Input } from '@/components/Input';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { RememberPasswordIcon } from '@/assets/icons';
import { Button } from '@/components/Button/button';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
import { validateEmail, validateLogin, validatePassword, validateTelPhone } from '@/utils/validate';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { Role } from '@/utils/constants';
import { ModalForgetPassword } from '@/components/Modal/ForgetPassword';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const rememberMe = localStorage.getItem('rememberMe');
  const [activeItem, setActiveItem] = useState();
  const [emailForgetPassword, setEmailForgetPassword] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(rememberMe);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    tel: '',
    password: '',
  });
  const checkValidateTel = () => {
    const checkValidateTel = validateTelPhone(tel);
    setValidate({ ...validate, tel: checkValidateTel });
  };
  const checkValidatePassword = () => {
    const checkValidatePassword = validatePassword(password, 'password');
    setValidate({ ...validate, password: checkValidatePassword });
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkValidate = validateLogin(tel, password);
    if (!checkValidate.tel && !checkValidate.password) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: tel,
            password: password,
          }),
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.status === 500) {
          enqueueSnackbar(data.message, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 200) {
          if (rememberMe) {
            localStorage.setItem(
              'user',
              JSON.stringify({
                id: data.payload.user.id,
                role: data.payload.user.role,
                isEnterprise: data.payload.user.isEnterprise,
                record_number_of_user: data.payload.user.record_number_of_user,
              })
            );
          }
          localStorage.setItem('token', data.payload.token);
          enqueueSnackbar('ロギングすることは成功します。', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          if (data.payload.user.role === Role.admin) router.push('/admin/company');
          else router.push('/notification');
        }
      } catch (error) {
        enqueueSnackbar('ロギングすることは失敗します。', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate(checkValidate);
    }
  };

  const handleSendMail = async () => {
    const checkValidateEmail = validateEmail(emailForgetPassword);
    if (!checkValidateEmail) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/forget-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailForgetPassword,
          }),
        });
        const data = await response.json();
        if (data.status === 500) {
          enqueueSnackbar(data.message, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 200) {
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

  useEffect(() => {
    if (rememberLogin) {
      localStorage.setItem('rememberMe', true);
    } else {
      localStorage.removeItem('rememberMe');
    }
  }, [rememberLogin]);
  useEffect(() => {
    if (rememberMe) {
      router.replace('/notification');
    }
  }, [rememberMe, router]);

  return (
    <div className={` mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">サインイン</h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <Input
            name="tel"
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
          <div className="w-full mb-2 flex justify-start items-end">
            <div
              className="w-7 h-7 outline-none border-2 border-primary border-solid rounded-md flex justify-center items-center text-[#000000]
                cursor-pointer"
              onClick={() => {
                setRememberLogin((prev) => !prev);
              }}
            >
              {rememberLogin && <RememberPasswordIcon width={25} height={19} />}
            </div>
            <div className="ml-2 text-base text-primary">次回から自動でログイン</div>
          </div>
          <div className="w-full mb-4 flex justify-between">
            <div
              onClick={() => router.push('/auth/register/personal')}
              className="text-base text-third hover:cursor-pointer"
            >
              応募
            </div>
            <div onClick={() => setActiveItem(true)} className="text-base text-third hover:cursor-pointer">
              パスワードをお忘れの場合
            </div>
          </div>
          <Button isLoading={isLoading} onClick={handleSubmit} classname="bg-primary mt-[27.93px]">
            サインイン
          </Button>
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
