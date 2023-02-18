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
  validateTelPhone,
  validateGender,
  validateRegister,
} from "@/utils/validate";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function PersonalRegister(params) {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [errorRegister, setErrorRegister] = useState("");
  const [validate, setValidate] = useState({
    tel: "",
    password: "",
    gender: "",
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
    const checkValidate = validateRegister(name, email, gender, tel, password);
    if (
      !checkValidate.name &&
      !checkValidate.email &&
      !checkValidate.gender &&
      !checkValidate.tel &&
      !checkValidate.password
    ) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              phone: tel,
              gender: gender,
              email: email,
              password: password,
            }),
          }
        );
        const data = await response.json();
        if (data.status === "failure") {
          enqueueSnackbar(data.message, { variant: "error" });
          return;
        } else if (data.status === "success") {
          enqueueSnackbar("Registration successful", { variant: "success" });
          router.push("/auth/login");
        }
      } catch (error) {
        enqueueSnackbar("Registration failed", { variant: "error" });
        throw error;
      }
    } else {
      setValidate(checkValidate);
    }
  };

  return (
    <div
      className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}
    >
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          サインアップ
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <Input
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
              "w-full relative mb-[24px]",
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

          <div className="left-0 w-full">
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
            <Button
              classname="bg-primary mt-[20px] ssm:mt-[60px]"
              onClick={handleSubmit}
            >
              サインアップ
            </Button>
          </div>

          {errorRegister && (
            <div className="w-full text-error text-sm mb-4 text-center">
              {errorRegister}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
