"use client";

import { Button } from "@/components/Button/button";
import CardLayout from "@/components/CardLayout";
import { Input } from "@/components/Input";
import {
  validateEmail,
  validateGender,
  validateName,
  validatePassword,
  validateTelPhone,
} from "@/utils/validate";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack/dist";
import { useSelector } from "react-redux";
import { number } from "prop-types";

export default function CreateCompanyPage(params) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [gender, setGender] = useState("");
  const [enterpriseId, setEnterpriseId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    name: "",
    phone: "",
    gender: "",
  });

  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, name: checkValidateFullName });
  };
  const checkValidateTel = () => {
    const checkValidateTel = validateTelPhone(phone);
    setValidate({ ...validate, tel: checkValidateTel });
  };
  const checkValidateGender = () => {
    const checkValidateGender = validateGender(gender);
    setValidate({ ...validate, gender: checkValidateGender });
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateEmployeeName = validateName(name, "firstName");
    const validateEmployeeTel = validateTelPhone(phone);
    const validateEmployeeGender = validateGender(gender);
    console.log(validateEmployeeTel);
    if (
      !validateEmployeeName &&
      !validateEmployeeTel &&
      !validateEmployeeGender
    ) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/enterprise/employee/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accessToken: token,
            },
            body: JSON.stringify({
              name: name,
              phone: phone,
              number_of_employee: numberOfEmployees,
              gender: gender,
              enterprise_id: enterpriseId,
              password: password
            }),
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (data.status === "failure") {
          enqueueSnackbar(data.message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          return;
        } else if (data.status === "success") {
          enqueueSnackbar("Create company successful", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar("Create company failed", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        throw error;
      }
    } else {
      setValidate({
        name: validateEmployeeName,
        phone: validateEmployeeTel,
        gender: validateEmployeeGender,
      });
    }
  };
  const router = useRouter();
  const { token } = useSelector((state) => state.user);

  return (
    <CardLayout>
      <div className="mt-2 w-[60%] mx-auto">
        <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">
          会社登録
        </h1>
        <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">名</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="name"
                  type="text"
                  value={name}
                  label="メールアドレス"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  validate={name ? () => checkValidateName(name, "firstName") : () => {}}
                  messageError={validate.name}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">携帯電話番号</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  validate={phone ? () => checkValidateTel(phone) : () => {}}
                  messageError={validate.phone}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">
              Number of employee
            </div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="numberOfEmployees"
                  type="text"
                  value={numberOfEmployees}
                  onChange={(e) => {
                    setNumberOfEmployees(e.target.value);
                  }}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">性 別</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="gender"
                  type="text"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  validate={gender ? () => checkValidateGender(gender) : () => {}}
                  messageError={validate.gender}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">
              Enterprise Id
            </div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="enterpriseId"
                  type="text"
                  value={enterpriseId}
                  onChange={(e) => {
                    setEnterpriseId(e.target.value);
                  }}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">暗証番号</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="password"
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  messageError={validate.password}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-around">
            <div className="w-5/12">
              <Button
                onClick={handleSubmit}
                classname="bg-primary"
                isLoading={isLoading}
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
