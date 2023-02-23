"use client";
import { Input } from "@/components/Input";
import Link from "next/link";
import { css, cx } from "@emotion/css";
import { useState } from "react";
import { Inter } from "@next/font/google";
import { RememberPasswordIcon } from "@/assets/icons";
import { Button } from "@/components/Button/button";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import {
  validatePassword,
  validateName,
  validateEmail,
} from "@/utils/validate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function EnterpriseRegister() {
  const [company, setCompany] = useState();
  const [department, setDepartment] = useState();
  const [employeeNumber, setEmployeeNumber] = useState();
  const [mr, setMr] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [validate, setValidate] = useState({
    tel: "",
    password: "",
    email: "",
  });
  const checkValidateName = () => {
    const checkValidateName = validateName(name);
    setValidate({ ...validate, name: checkValidateName });
  };
  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const checkValidatePassword = () => {
    const checkValidatePassword = validatePassword(password, "password");
    setValidate({ ...validate, password: checkValidatePassword });
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
            value={company}
            placeholder="会社名"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            messageError={validate.company}
          />
          <Input
            disabled
            name="department"
            type="text"
            value={department}
            placeholder="所属名"
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
            messageError={validate.department}
          />
          <Input
            disabled
            name="employeeNumber"
            type="number"
            value={employeeNumber}
            placeholder="社員番号"
            onChange={(e) => {
              setEmployeeNumber(e.target.value);
            }}
            messageError={validate.employeeNumber}
          />
          <Input
            disabled
            name="mr"
            type="text"
            value={mr}
            placeholder="氏"
            onChange={(e) => {
              setMr(e.target.value);
            }}
            messageError={validate.mr}
          />
          <Input
            disabled
            name="name"
            type="text"
            value={name}
            placeholder="名"
            onChange={(e) => {
              setName(e.target.value);
            }}
            validate={name ? checkValidateName : () => {}}
            messageError={validate.name}
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
          <div
            className={cx(
              "w-full relative mb-[35px]",
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
          <div className="w-full">
            <div className="w-full mb-4 flex justify-end">
              <Link
                href="/auth/forgot-password-step1"
                className="text-base text-primary"
              >
                パスワードをお忘れの場合
              </Link>
            </div>
            <div className="w-full mb-2 flex flex-col justify-center items-center">
              <div className="w-full text-base text-third flex justify-end">
                利用規約とプライバシーポリシーに同意
              </div>
              <div
                className="mt-[5px] w-7 h-7 outline-none border-2 border-primary border-solid rounded-md flex justify-center items-center text-third
                cursor-pointer"
                onClick={() => setAcceptPolicy((prev) => !prev)}
              >
                {acceptPolicy && <RememberPasswordIcon />}
              </div>
            </div>
            <Button classname="bg-primary mt-[6.83px]">サインアップ</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
