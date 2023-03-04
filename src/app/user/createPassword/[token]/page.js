'use client';

import { Button } from '@/components/Button/button';
import { Input } from '@/components/Input';
import { validatePassword } from '@/utils/validate';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { cx, css } from '@emotion/css';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function CreatePasswordPage({ params }) {
  const token = params?.token;
  const { enqueueSnackbar } = useSnackbar();
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    password: '',
  });
  const checkValidatePassword = () => {
    const checkValidatePassword = validatePassword(password, 'password');
    setValidate({ ...validate, password: checkValidatePassword });
  };
  const handleSubmit = async () => {
    const checkNewPassword = validatePassword(password, 'password');
    if (!checkNewPassword) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/create-password/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
          enqueueSnackbar('パスワード更新成功', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar('パスワードの更新に失敗しました', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate({
        password: checkNewPassword,
      });
    }
  };

  return (
    <div className={` mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">新しいパスワード</h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
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
          <Button classname="bg-primary mt-[20px] ssm:mt-[60px]" onClick={handleSubmit} isLoading={isLoading}>
            パスワードの更新
          </Button>
        </div>
      </div>
    </div>
  );
}
