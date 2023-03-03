'use client';

import CardLayout from '@/components/CardLayout';
import { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import Link from 'next/link';
import Table from '@/components/Table';
import Pagination from '@/components/Table/pagination';
import { ArrowLeftOutlined, EditFilled } from '@ant-design/icons';
import ModalDeleted from '@/components/Modal';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export default function Employee({ params }) {
  const id = params?.id;
  const [listEmployee, setListEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
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
        title: '携帯電話番号',
        index: 'user_id',
        render: (value) => <div className="w-full text-left">{value?.phone}</div>,
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
      },
      {
        title: '氏名',
        index: 'user_id',
        render: (value) => <div className="w-full text-left">{value?.first_name}</div>,
        className: 'min-w-[40px]',
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      },
      {
        title: '区分',
        index: 'user_id',
        render: (value) => <div className="w-full text-left">{value?.role}</div>,
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
        sorter: (a, b) => a.role.localeCompare(b.role),
      },

      {
        title: 'アクション',
        index: 'id',
        render: (id, record) => (
          <div className="w-full flex justify-center items-center">
            <Link href={`/admin/company/employee/${record?.enterprise_id}/edit/${record?.user_id?.id}`}>
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
        const item = listEmployee.find((d) => d?.user_id?.id === id);
        const index = listEmployee.indexOf(item);
        listEmployee.splice(index, 1);
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
    const getListEmployee = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/enterprise/employee/getall/${id}?page=${currentPage}&limit=${10}`,
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
          setListEmployee(data?.payload?.allLegal);
          setLastPage(data?.payload?._totalPage);
          setTotal(data?.payload?._max);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListEmployee();
  }, [currentPage]);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);

  return (
    <div className="w-full">
      <div className="w-full h-10 flex justify-center items-center text-3xl mt-4">会社一覧</div>
      <CardLayout>
        <div className="flex justify-start px-6 pb-6">
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
        </div>
        <Table columns={columns} data={listEmployee} />
        <Pagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} total={total} />
      </CardLayout>
      {activeItem?.id && <ModalDeleted action={handleDelete} activeItem={activeItem} setActiveItem={setActiveItem} />}
    </div>
  );
}
