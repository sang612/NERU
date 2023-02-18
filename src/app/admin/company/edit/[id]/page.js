"use client";

import React, { useEffect, useState } from "react";
import CardLayout from "@/components/CardLayout";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button/button";
import {
  validateEmail,
  validateName,
  validateNameKatakana,
  validateTelPhone,
} from "@/utils/validate";
import { useRouter } from "next/navigation";

export default function EditCompanyPage({ params, searchParams }) {
  const id = params?.id;
  const router = useRouter();
  const [telPhone, setTelPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameKatakana, setCompanyNameKatakana] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorSendTelPhone, setErrorSendTelPhone] = useState("");
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState({
    numberphone: "",
    companyName: "",
    companyNameKatakana: "",
    email: "",
  });
  useEffect(() => {
    const getDataDetailCompany = async () => {
      const [res] = await handleApi(getDetailCompany(id));
      if (res) {
        setTelPhone(res.data.phonenumber);
        setCompanyName(res.data.name);
        setCompanyNameKatakana(res.data.nameKana);
        setEmail(res.data.email);
      }
    };
    setTelPhone("123123");
    setCompanyName("tetst");
    setCompanyNameKatakana("tfdsawer");
    setEmail("test@gmail.com");
  }, []);
  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, [type]: checkValidateFullName });
  };

  const checkValidateTelPhone = () => {
    const checkValidateTelPhone = validateTelPhone(telPhone);
    setValidate({ ...validate, numberphone: checkValidateTelPhone });
  };
  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const checkValidateNameKatakana = (name, type) => {
    const checkValidateFullName = validateNameKatakana(name, type);
    setValidate({ ...validate, [`${type}Katakana`]: checkValidateFullName });
  };
  const submit = () => {
    const validateNumberPhone = validateTelPhone(telPhone);
    const validateCompanyName = validateName(companyName, "companyName");
    const validateCompanyNameKatakana = validateNameKatakana(
      companyNameKatakana,
      "companyName"
    );
    const validateCompanyEmail = validateEmail(email);
    if (
      !validateNumberPhone &&
      !validateCompanyName &&
      !validateCompanyNameKatakana &&
      !validateCompanyEmail
    ) {
      setIsLoading(true);
      const callCreateUser = async () => {
        const [res, error] = await handleApi(
          updateCompany({
            id,
            name: companyName,
            nameKana: companyNameKatakana,
            phonenumber: telPhone,
            email: email,
          })
        );
        setIsLoading(false);
        if (res) {
          toast.success("更新しました。");
          setErrorSendTelPhone("");
          navigate("/admin/company");
        } else {
          setErrorSendTelPhone(error.data.message);
        }
      };
      callCreateUser();
    } else {
      setValidate({
        numberphone: validateNumberPhone,
        companyName: validateCompanyName,
        companyNameKatakana: validateCompanyNameKatakana,
        email: validateCompanyEmail,
      });
    }
  };

  return (
    <CardLayout>
      <div className="mt-2 w-[60%] mx-auto">
        <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">
          会員編集
        </h1>
        <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">会社名</div>
            <div className="flex-1 h-24">
              <div className="w-full h-full flex items-start">
                <Input
                  name="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  validate={
                    companyName
                      ? () => checkValidateName(companyName, "companyName")
                      : () => {}
                  }
                  messageError={validate.companyName}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">
              {"会社名(カタカナ)"}
            </div>
            <div className="flex-1 h-24">
              <div className="w-full h-full flex items-start">
                <Input
                  name="companyNameKatakana"
                  type="text"
                  value={companyNameKatakana}
                  onChange={(e) => {
                    setCompanyNameKatakana(e.target.value);
                  }}
                  validate={
                    companyNameKatakana
                      ? () =>
                          checkValidateNameKatakana(
                            companyNameKatakana,
                            "companyName"
                          )
                      : () => {}
                  }
                  messageError={validate.companyNameKatakana}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">電話番号</div>
            <div className="flex-1 h-24">
              <div className="w-full h-full flex items-start">
                <Input
                  name="number_phone"
                  type="text"
                  value={telPhone}
                  onChange={(e) => {
                    setTelPhone(e.target.value);
                  }}
                  validate={telPhone ? checkValidateTelPhone : () => {}}
                  messageError={validate.numberphone}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">
              メールアドレス
            </div>
            <div className="flex-1 h-24">
              <div className="w-full h-full flex items-start">
                <Input
                  name="email"
                  type="text"
                  value={email}
                  label="メールアドレス"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  validate={email ? checkValidateEmail : () => {}}
                  messageError={validate.email}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          {errorSendTelPhone && (
            <div className="w-full text-rose-500 text-sm mb-4 text-center">
              {errorSendTelPhone}
            </div>
          )}
          <div className="w-full flex justify-around">
            <div className="w-5/12">
              <Button
                onClick={submit}
                isLoading={isLoading}
                classname="bg-primary"
              >
                更新
              </Button>
            </div>
            <div className="w-5/12">
              <Button onClick={() => router.back()} classname="bg-secondary">
                戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardLayout>
  );
}
