"use client";
import { Input } from "@/components/Input";
import Link from "next/link";
import { css, cx } from "@emotion/css";
import { useState } from "react";
import { Inter } from "@next/font/google";
import { RememberPasswordIcon } from "@/assets/icons";
import { Button } from "@/components/Button/button";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import { validatePassword, validateTelPhone } from "@/utils/validate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function LoginPage(params) {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [rememberLogin, setRememberLogin] = useState(true);
  const [isShowPass, setIsShowPass] = useState(false);
  const [errorLogin, setErrorLogin] = useState();
  const [validate, setValidate] = useState({
    tel: "",
    password: "",
  });
  const checkValidateTel = () => {
    const checkValidateTel = validateTelPhone(tel);
    setValidate({ ...validate, tel: checkValidateTel });
  };
  const checkValidatePassword = () => {
    const checkValidatePassword = validatePassword(password, "password");
    setValidate({ ...validate, password: checkValidatePassword });
  };

  return (
    <div
      className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}
    >
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          サインイン
        </h1>
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
              "w-full relative",
              css`
                input {
                  padding-right: calc(6% + 24px);
                }
              `
            )}
          >
            <Input
              name="password"
              type={isShowPass ? "text" : "password"}
              value={password}
              placeholder="パスワード"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              validate={password ? checkValidatePassword : () => {}}
              messageError={validate.password}
            />
            {isShowPass ? (
              <div
                className={`h-14 xsm:h-16 absolute top-0 right-[4%] flex items-center`}
              >
                <EyeInvisibleFilled
                  onClick={() => setIsShowPass(false)}
                  className={`${
                    validate.password ? "text-error" : "text-primary"
                  }`}
                />
              </div>
            ) : (
              <div
                className={`h-14 xsm:h-16 absolute top-0 right-[4%] flex items-center`}
              >
                <EyeFilled
                  onClick={() => setIsShowPass(true)}
                  className={`${
                    validate.password ? "text-error" : "text-primary"
                  }`}
                />
              </div>
            )}
          </div>
          <div className="w-full mb-2 flex justify-start items-end">
            <div
              className="w-7 h-7 outline-none border-2 border-primary border-solid rounded-md flex justify-center items-center text-[#000000]
                cursor-pointer"
              onClick={() => setRememberLogin((prev) => !prev)}
            >
              {rememberLogin && <RememberPasswordIcon />}
            </div>
            <div className="ml-2 text-base text-primary">
              次回から自動でログイン
            </div>
          </div>
          <div className="w-full mb-4 flex justify-end">
            <Link
              href="/auth/forgot-password-step1"
              className="text-base text-primary"
            >
              パスワードをお忘れの場合
            </Link>
          </div>
          {errorLogin && (
            <div className="w-full text-error text-sm mb-4 text-center">
              {errorLogin}
            </div>
          )}
          <Button classname="bg-primary mt-[27.93px]">サインイン</Button>
        </div>
      </div>
    </div>
  );
}