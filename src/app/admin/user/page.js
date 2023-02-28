'use client';

import CardLayout from '@/components/CardLayout';
import { Role } from '@/utils/constants';
import { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Input } from '@/components/Input';
import Link from 'next/link';
import Table from '@/components/Table';
import Pagination from '@/components/Table/pagination';
import { DeleteFilled, EditFilled} from '@ant-design/icons';
import ModalDeleted from '@/components/Modal';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { validateEmail, validateName, validateTelPhone, validateNameKatakana } from '@/utils/validate';
import { ModalCreateUser } from '@/components/Modal/CreateUser';

export default function CompanyPage() {
  const [listUser, setListUser] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [modalCreate, setModalCreate] = useState(false);
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameKatakana, setFirstNameKatakana] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameKatakana, setLastNameKatakana] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    affiliationName: '',
    firstName: '',
    firstNameKatakana: '',
    lastName: '',
    lastNameKatakana: '',
    email: '',
    phone: '',
    numberOfEmployees: '',
  });
  const [numberPhone, setNumberPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage] = useState(0);
  const [total] = useState(0);
  const [activeItem, setActiveItem] = useState();
  const columns = useMemo(
    () => [
      {
        title: '会社番号',
        index: 'id',
        render: (id) => <div className="w-full text-left">{id}</div>,
        className: 'min-w-[40px]',
        sorter: (a, b) => a - b,
      },
      {
        title: '名',
        index: 'first_name',
        render: (name) => <div className="w-full text-left">{name}</div>,
        className: 'max-w-[200px] 3xl:max-w-[240px] 4xl:max-w-[280px]',
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: 'メールアドレス',
        index: 'email',
        render: (value) => <div className="w-full text-left">{value}</div>,
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: 'アクション',
        index: 'id',
        render: (id, record) => (
          <div className="w-full flex justify-center items-center">
            <Link href={`/admin/user/edit/${id}`}>
              <EditFilled
                className={cx(
                  'w-6 h-6 mx-2 text-primary',
                  css`
                    svg {
                      width: 100%;
                      height: 100%;
                    }
                  `
                )}
              />
            </Link>
            {user.role === Role.admin && (
              <DeleteFilled
                className={cx(
                  'w-6 h-6 mx-2 text-error',
                  css`
                    svg {
                      width: 100%;
                      height: 100%;
                    }
                  `
                )}
                onClick={() =>
                  setActiveItem({
                    id: record.id,
                    name: record.company_name,
                    data: [
                      {
                        label: '名',
                        value: record.first_name,
                      },
                      {
                        label: 'メールアドレス',
                        value: record.email,
                      },
                    ],
                  })
                }
              />
            )}
          </div>
        ),
        className: 'w-[8%]',
      },
    ],
    []
  );
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          accessToken: token,
        },
      });
      const data = await response.json();
      if (data.status === 'failure') {
        enqueueSnackbar(data.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        return;
      } else if (data.status === 'success') {
        setActiveItem();
        const item = listUser.find((d) => d.id === id);
        const index = listUser.indexOf(item);
        listUser.splice(index, 1);
        enqueueSnackbar('ユーザーの削除が成功しました。', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    } catch (error) {
      enqueueSnackbar('ユーザーの削除に失敗しました。', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      console.log(error);
    }
  };
  useEffect(() => {
    const getlistUser = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/individual/?page=${currentPage}&limit=${10}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
        }
      );
      const data = await response.json();
      if (data.status === 'failure') {
        return;
      } else if (data.status === 'success') {
        setListUser(data?.payload?.userAll);
      }
    };
    getlistUser();
  }, [currentPage, modalCreate]);
  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, [type]: checkValidateFullName });
  };
  const checkValidateNameKatakana = (name, type) => {
    const checkValidateFullName = validateNameKatakana(name, type);
    setValidate({ ...validate, [`${type}Katakana`]: checkValidateFullName });
  };
  const checkValidateTel = () => {
    const checkValidateTel = validateTelPhone(phone);
    setValidate({ ...validate, phone: checkValidateTel });
  };
  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateEmployeeFirstName = validateName(firstName, 'firstName');
    const validateEmployeeLastName = validateName(lastName, 'lastName');
    const validateEmployeeFirstNameKatakana = validateNameKatakana(firstNameKatakana, 'firstName');
    const validateEmployeeLastNameKatakana = validateNameKatakana(lastNameKatakana, 'lastName');
    const validateEmployeeTel = validateTelPhone(phone);
    const validateEmplyeeEmail = validateEmail(email);
    if (
      !validateEmployeeFirstName &&
      !validateEmployeeLastName &&
      !validateEmployeeFirstNameKatakana &&
      !validateEmployeeLastNameKatakana &&
      !validateEmployeeTel &&
      !validateEmplyeeEmail
    ) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/user`, {
          method: 'POST',
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
            isEnterprise: false,
            phone: phone,
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
          enqueueSnackbar('ユーザーを作成することは成功します。', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar('ユーザーを作成することは失敗します。', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        throw error;
      }
    } else {
      setValidate({
        firstName: validateEmployeeFirstName,
        firstNameKatakana: validateEmployeeFirstNameKatakana,
        lastName: validateEmployeeLastName,
        lastNameKatakana: validateEmployeeLastNameKatakana,
        email: validateEmplyeeEmail,
        phone: validateEmployeeTel,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-10 flex justify-center items-center text-3xl mt-4">会社一覧</div>
      {modalCreate && (
        <ModalCreateUser
          validate={validate}
          phone={phone}
          setPhone={setPhone}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          firstNameKatakana={firstNameKatakana}
          setFirstNameKatakana={setFirstNameKatakana}
          lastNameKatakana={lastNameKatakana}
          setLastNameKatakana={setLastNameKatakana}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          setModalCreate={setModalCreate}
          checkValidateName={checkValidateName}
          checkValidateTel={checkValidateTel}
          checkValidateEmail={checkValidateEmail}
          checkValidateNameKatakana={checkValidateNameKatakana}
        />
      )}
      {!modalCreate && (
        <CardLayout>
          <div className="flex justify-start mt-8">
            <div className="w-1/3 flex justify-start items-start px-6">
              <div className="mr-6 mb-4 h-12 flex items-center w-16">電話番号</div>
              <div className="flex-1 h-20">
                <div className="w-full h-full flex items-start">
                  <Input
                    name="number_phone"
                    type="text"
                    value={numberPhone}
                    onChange={(e) => {
                      setNumberPhone(e.target.value);
                    }}
                    height="h-12"
                    border="border-[1px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start px-6 pb-6">
            <div className="h-12 w-36 bg-primary flex justify-center items-center rounded-md text-white cursor-pointer mr-4">
              検索
            </div>
            {user.role === Role.admin && (
              <div onClick={() => setModalCreate(true)}>
                <div className="h-12 w-36 bg-primary flex justify-center items-center rounded-md text-white cursor-pointer mr-4">
                  会社登録
                </div>
              </div>
            )}
          </div>
          <Table columns={columns} data={listUser} />
          <Pagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} total={total} />
        </CardLayout>
      )}
      {activeItem?.id && <ModalDeleted action={handleDelete} activeItem={activeItem} setActiveItem={setActiveItem} />}
    </div>
  );
}