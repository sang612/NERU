'use client';

import CardLayout from '@/components/CardLayout';
import { SelectCompany } from '@/components/Select';
import { Role } from '@/utils/constants';
import { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Input } from '@/components/Input';
import Link from 'next/link';
import Table from '@/components/Table';
import Pagination from '@/components/Table/pagination';
import { ArrowLeftOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalDeleted from '@/components/Modal';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export default function Employee({ params }) {
  const id = params?.id;
  const [listEmployee, setListEmployee] = useState([]);
  const [company, setCompany] = useState();
  const [numberPhone, setNumberPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage] = useState(0);
  const [total] = useState(0);
  const [activeItem, setActiveItem] = useState();
  const columns = useMemo(
    () => [
      {
        title: '社員番号',
        index: 'number_of_employee',
        render: (numberOfEmployee) => <div className="w-full text-left">{numberOfEmployee}</div>,
        className: 'max-w-[200px] 3xl:max-w-[240px] 4xl:max-w-[280px]',
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: "携帯電話番号",
        index: "user_id",
        render: (value) => (
          <div className="w-full text-left">{value?.phone}</div>
        ),
        className: "max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]",
      },
      {
        title: "氏名",
        index: "user_id",
        render: (value) => (
          <div className="w-full text-left">{value?.first_name}</div>
        ),
        className: "min-w-[40px]",
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      },
      {
        title: "区分",
        index: "user_id",
        render: (value) => (
          <div className="w-full text-left">{value?.role}</div>
        ),
        className: "max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]",
        sorter: (a, b) => a.role.localeCompare(b.role),
      },

      {
        title: 'アクション',
        index: 'id',
        render: (id, record) => (
          <div className="w-full flex justify-center items-center">
            <Link href={`/admin/company/edit/${id}`}>
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
                    id: record._id,
                    name: record.company_name,
                    data: [
                      {
                        label: '会社名',
                        value: record.company_name,
                      },
                      {
                        label: 'ユーザーの名前',
                        value: record.owner_name,
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/enterprise/${id}`, {
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
        const item = listEmployee.find((d) => d.id === id);
        const index = listEmployee.indexOf(item);
        listEmployee.splice(index, 1);
        enqueueSnackbar('会社を削除します。', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    } catch (error) {
      enqueueSnackbar('会社を削除することは失敗します。', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const getListEmployee = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/enterprise/employee/getall/${id}?page=${currentPage}&limit=${10}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accessToken: token,
            },
          }
        );
        const data = await response.json();
        if (data.status === 'failure') {
          return;
        } else if (data.status === 'success') {
          setListEmployee(data?.payload?.allLegal);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListEmployee();
  }, [currentPage]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);

  return (
    <div className="w-full">
      <div className="w-full h-10 flex justify-center items-center text-3xl mt-4">会社一覧</div>
      <CardLayout>
        <Link href="/admin/company">
          <ArrowLeftOutlined
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
        <div className="flex justify-start mt-8">
          {user.role === Role.admin && (
            <div className="w-1/3 px-6 flex pb-4">
              <div className="mr-6 mb-4 h-12 leading-[48px] w-16">会社名</div>
              <div
                className={css`
                  width: calc(100% - 90px);
                `}
              >
                <SelectCompany value={company} setValue={setCompany} height="h-12" />
              </div>
            </div>
          )}
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
            <Link href="/admin/employee/create">
              <div className="h-12 w-36 bg-primary flex justify-center items-center rounded-md text-white cursor-pointer mr-4">
                会社登録
              </div>
            </Link>
          )}
        </div>
        <Table columns={columns} data={listEmployee} />
        <Pagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} total={total} />
      </CardLayout>
      {activeItem?.id && <ModalDeleted action={handleDelete} activeItem={activeItem} setActiveItem={setActiveItem} />}
    </div>
  );
}
