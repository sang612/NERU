"use client";

import { Input } from "@/components/Input";
import Link from "next/link";
import { css, cx } from "@emotion/css";
import { useState } from "react";
import { RememberPasswordIcon } from "@/assets/icons";
import { Button } from "@/components/Button/button";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import {
  validatePassword,
  validateName,
  validateEmail,
  validateTelPhone,
  validatesurname,
  validateRegister,
} from "@/utils/validate";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addNew, addToken } from "@/slices/userSlice";

export default function PersonalRegister(params) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [surname, setSurname] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [errorRegister, setErrorRegister] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    surname: "",
    name: "",
    email: "",
    tel: "",
    password: "",
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
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateEmployeeSurname = validateName(surname, "lastName");
    const validateEmployeeName = validateName(name, "lastName");
    const validateEmployeeEmail = validateEmail(email);
    const validateEmployeeTel = validateTelPhone(tel);
    const validateEmployeePassword = validatePassword(password, "password");
    if (
      !validateEmployeeSurname &&
      !validateEmployeeName &&
      !validateEmployeeEmail &&
      !validateEmployeeTel &&
      !validateEmployeePassword
    ) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: tel,
              password: password,
            }),
          }
        );
        const data = await response.json();
        if (data.status === "failure") {
          setIsLoading(false);
          enqueueSnackbar(data.message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          return;
        } else if (data.status === "success") {
          enqueueSnackbar("Login successful", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          if (data?.payload?.user?.isEnterprise) {
            dispatch(addNew(data.payload.user));
            dispatch(addToken(data.payload.token));
            router.push("/user/updateProfileEmployee");
          } else router.push("/auth/login");
        }
      } catch (error) {
        enqueueSnackbar("Login failed", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        throw error;
      }
    } else {
      setValidate({
        surname: validateEmployeeSurname,
        name: validateEmployeeName,
        email: validateEmployeeEmail,
        tel: validateEmployeeTel,
        password: validateEmployeePassword,
      });
    }
  };

  return (
    <div
      className={` mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}
    >
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          サインアップ
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <Input
            name="surname"
            type="text"
            value={surname}
            placeholder="姓"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            validate={surname ? checkValidateName : () => {}}
            messageError={validate.surname}
          />
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
              isLoading={isLoading}
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
