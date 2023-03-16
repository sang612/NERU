'use client';

import CardLayout from '@/components/CardLayout';
import { Role } from '@/utils/constants';
import { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import Link from 'next/link';
import Table from '@/components/Table';
import Pagination from '@/components/Table/pagination';
import { DeleteFilled, DollarOutlined, EditFilled } from '@ant-design/icons';
import ModalDeleted from '@/components/Modal';
import { useSnackbar } from 'notistack';
import {
  validateEmail,
  validateName,
  validateTelPhone,
  validateNameKatakana,
} from '@/utils/validate';
import { ModalCreateUser } from '@/components/Modal/CreateUser';

export default function CompanyPage() {
  const [listUser, setListUser] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('token');

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
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [activeItem, setActiveItem] = useState();
  const columns = useMemo(
    () => [
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
        title: '電話番号',
        index: 'phone',
        render: (value) => <div className="w-full text-left">{value}</div>,
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: '性別',
        index: 'gender',
        render: (value) => (
          <div className="w-full text-left">{value === 'Male' ? '男性' : '女性'}</div>
        ),
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: 'アクション',
        index: 'id',
        render: (id, record) => (
          <div className="w-full flex justify-center items-center">
            <Link href={`/admin/user/transaction/${id}`}>
              <DollarOutlined
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
      if (data.status !== 200 && data.status !== 201) {
        enqueueSnackbar(data.message ? data?.message : data?.error, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        return;
      } else if (data.status === 200 || data.status === 201) {
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
      if (data.status !== 200 && data.status !== 201) {
        return;
      } else if (data.status === 200 || data.status === 201) {
        setListUser(data?.payload?.userAll);
        setLastPage(data?.payload?._totalPage);
        setTotal(data?.payload?._max);
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
            isEnterprise: 'false',
            phone: phone,
          }),
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.status !== 200 && data.status !== 201) {
          enqueueSnackbar(data.message ? data?.message : data?.error, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          return;
        } else if (data.status === 200 || data.status === 201) {
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
    <div className="w-full font-bold">
      <div className="w-full h-10 flex justify-center items-center text-3xl mt-4 font-bold">
        ユーザー一覧
      </div>
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
          <div className="hidden justify-start px-6 pb-6">
            {user.role === Role.admin && (
              <div onClick={() => setModalCreate(true)}>
                <div className="h-12 w-36 bg-primary flex justify-center items-center rounded-md text-white cursor-pointer mr-4">
                  ユーザー登録
                </div>
              </div>
            )}
          </div>
          <Table columns={columns} data={listUser} />
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            total={total}
          />
        </CardLayout>
      )}
      {activeItem?.id && (
        <ModalDeleted action={handleDelete} activeItem={activeItem} setActiveItem={setActiveItem} />
      )}
    </div>
  );
}
