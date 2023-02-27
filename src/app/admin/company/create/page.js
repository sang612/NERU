'use client';

import { Button } from '@/components/Button/button';
import CardLayout from '@/components/CardLayout';
import { Input } from '@/components/Input';
import { validateEmail, validateName, validatePassword } from '@/utils/validate';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack/dist';
import { useSelector } from 'react-redux';

export default function CreateCompanyPage() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [numberEmployees, setNumberEmployees] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    password: '',
    companyName: '',
    email: '',
  });

  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, [type]: checkValidateFullName });
  };

  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const checkValidatePassword = () => {
    const checkValidatePassword = validatePassword(password, 'password');
    setValidate({ ...validate, password: checkValidatePassword });
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateCompanyName = validateName(companyName, 'companyName');
    const validateCompanyEmail = validateEmail(email);
    const validateCompanyPassword = validatePassword(password, 'password');
    if (!validateCompanyName && !validateCompanyEmail && !validateCompanyPassword) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/enterprise`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
          body: JSON.stringify({
            email: email,
            company_name: companyName,
            owner_name: ownerName,
            number_employees: numberEmployees,
            tax_code: taxCode,
            password: password,
          }),
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.status === 'failure') {
          enqueueSnackbar(data.message, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 'success') {
          enqueueSnackbar('Create company successful', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar('Create company failed', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate({
        companyName: validateCompanyName,
        email: validateCompanyEmail,
        password: validateCompanyPassword,
      });
    }
  };
  const router = useRouter();
  const { token } = useSelector((state) => state.user);

  return (
    <CardLayout>
      <div className="mt-2 w-[60%] mx-auto">
        <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">会社登録</h1>
        <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">メールアドレス</div>
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
                  validate={companyName ? () => checkValidateName(companyName, 'companyName') : () => {}}
                  messageError={validate.companyName}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">ユーザーの名前</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="ownerName"
                  type="text"
                  value={ownerName}
                  onChange={(e) => {
                    setOwnerName(e.target.value);
                  }}
                  validate={ownerName ? () => checkValidateName(ownerName, 'companyName') : () => {}}
                  messageError={validate.ownerName}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">従業員数</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="numberEmployees"
                  type="number"
                  value={numberEmployees}
                  onChange={(e) => {
                    setNumberEmployees(e.target.value);
                  }}
                  height="h-14"
                  border="border-[1px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start items-start w-full my-2">
            <div className="mb-4 h-14 flex items-center w-36">税法</div>
            <div className="flex-1 h-20">
              <div className="w-full h-full flex items-start">
                <Input
                  name="taxCode"
                  type="text"
                  value={taxCode}
                  onChange={(e) => {
                    setTaxCode(e.target.value);
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
                  validate={password ? checkValidatePassword : () => {}}
                  messageError={validate.password}
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
