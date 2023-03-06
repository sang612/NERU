'use client';

import React, { useEffect, useState } from "react";
import CardLayout from "@/components/CardLayout";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button/button";
import {
  validateEmail,
  validateName,
} from "@/utils/validate";
import { useRouter } from "next/navigation";
import { useSnackbar } from 'notistack';

export default function EditCompanyPage({ params }) {
  const id = params?.id;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    companyName: "",
    email: "",
  });
  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, [type]: checkValidateFullName });
  };

  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  useEffect(() => {
    const getDataDetailCompany = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/enterprise/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accessToken: token,
        },
      });
      const data = await response.json();
      if (data.status !== 200 && data.status !== 201) {
        return;
      } else if (data.status === 200 || data.status === 201) {
        setEmail(data?.payload.enterprise.email);
        setCompanyName(data?.payload.enterprise.company_name);
      }
    };
    getDataDetailCompany();
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateCompanyName = validateName(companyName, 'companyName');
    const validateCompanyEmail = validateEmail(email);
    if (!validateCompanyName && !validateCompanyEmail) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/enterprise/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              accessToken: token,
            },
            body: JSON.stringify({
              email: email,
              company_name: companyName,
            }),
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (data.status !== 200 && data.status !== 201) {
          enqueueSnackbar(data.message ? data?.message : data?.error, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 200 || data.status === 201) {
          enqueueSnackbar('会社を更新します。', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar('会社を更新することは失敗します。', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate({
        companyName: validateCompanyName,
        email: validateCompanyEmail,
      });
    }
  };

  return (
    <CardLayout>
      <div className="mt-2 w-[60%] mx-auto">
        <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">会社登録</h1>
        <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">会社名</div>
            <div className="flex-1 h-20">
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
              メールアドレス
            </div>
            <div className="flex-1 h-20">
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
          <div className="w-full flex justify-around">
            <div className="w-5/12">
              <Button onClick={handleSubmit} classname="bg-primary" isLoading={isLoading}>
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
