'use client';

import React, { useEffect, useState } from 'react';
import CardLayout from '@/components/CardLayout';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button/button';
import { validateEmail, validateName, validateNameKatakana, validateTelPhone } from '@/utils/validate';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

export default function EditEmployeePage({ params }) {
  const { id, employeeId } = params;
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [firstNameKatakana, setFirstNameKatakana] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameKatakana, setLastNameKatakana] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    firstName: '',
    firstNameKatakana: '',
    lastName: '',
    lastNameKatakana: '',
    email: '',
    phone: '',
  });
  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, [type]: checkValidateFullName });
  };
  const checkValidateNameKatakana = (name, type) => {
    const checkValidateFullName = validateNameKatakana(name, type);
    setValidate({ ...validate, [`${type}Katakana`]: checkValidateFullName });
  };
  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const checkValidateTel = () => {
    const checkValidateTel = validateTelPhone(phone);
    setValidate({ ...validate, phone: checkValidateTel });
  };
  useEffect(() => {
    const getDetailEmployee = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/user/${employeeId}`, {
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
        setFirstName(data?.payload?.user?.first_name);
        setFirstNameKatakana(data?.payload?.user?.first_name_kana);
        setLastName(data?.payload?.user?.last_name);
        setLastNameKatakana(data?.payload?.user?.last_name_kana);
        setEmail(data?.payload?.user?.email);
        setPhone(data?.payload?.user?.phone);
      }
    };
    getDetailEmployee();
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateUserFirstName = validateName(firstName, 'firstName');
    const validateUserLastName = validateName(lastName, 'lastName');
    const validateUserFirstNameKatakana = validateNameKatakana(firstNameKatakana, 'firstName');
    const validateUserLastNameKatakana = validateNameKatakana(lastNameKatakana, 'lastName');
    const validateUserTel = validateTelPhone(phone);
    const validateUserEmail = validateEmail(email);
    if (
      !validateUserFirstName &&
      !validateUserLastName &&
      !validateUserFirstNameKatakana &&
      !validateUserLastNameKatakana &&
      !validateUserTel &&
      !validateUserEmail
    ) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/user/${employeeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
          body: JSON.stringify({
            first_name: firstName,
            first_name_kana: firstNameKatakana,
            last_name: lastName,
            last_name_kana: lastNameKatakana,
            email: email,
            phone: phone,
            isEnterprise: true,
            enterprise_id: id,
          }),
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.status !== 200 && data.status !== 201) {
          if (data.message.includes('E11000 duplicate key error collection: nerusoku-dbi.users index: email_1 dup key')) {
            enqueueSnackbar('メールはすでに存在します', {
              variant: 'error',
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
            return;
          }
          enqueueSnackbar(data.message ? data?.message : data?.error, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 200 || data.status === 201) {
          enqueueSnackbar('ユーザーの更新が成功しました。', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar('ユーザーの更新に失敗しました。', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate({
        firstName: validateUserFirstName,
        firstNameKatakana: validateUserFirstNameKatakana,
        lastName: validateUserLastName,
        lastNameKatakana: validateUserLastNameKatakana,
        email: validateUserEmail,
        phone: validateUserTel,
      });
    }
  };

  return (
    <CardLayout>
      <div className="mt-2 w-[60%] mx-auto">
        <h1 className="w-full text-center text-xl xsm:text-3xl text-primary mt-2 mb-4 font-bold">ユーザー編集</h1>
        <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">姓</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  validate={lastName ? () => checkValidateName(lastName, 'lastName') : () => {}}
                  messageError={validate.lastName}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">名</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  validate={firstName ? () => checkValidateName(firstName, 'firstName') : () => {}}
                  messageError={validate.firstName}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">姓ふりがな</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="lastNameKatakana"
                  type="text"
                  value={lastNameKatakana}
                  onChange={(e) => {
                    setLastNameKatakana(e.target.value);
                  }}
                  validate={lastNameKatakana ? () => checkValidateNameKatakana(lastNameKatakana, 'lastName') : () => {}}
                  messageError={validate.lastNameKatakana}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">名ふりがな</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="firstNameKatakana"
                  type="text"
                  value={firstNameKatakana}
                  onChange={(e) => {
                    setFirstNameKatakana(e.target.value);
                  }}
                  validate={
                    firstNameKatakana ? () => checkValidateNameKatakana(firstNameKatakana, 'firstName') : () => {}
                  }
                  messageError={validate.firstNameKatakana}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">メールアドレス</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  validate={email ? () => checkValidateEmail(email) : () => {}}
                  messageError={validate.email}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">電話番号</div>
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
