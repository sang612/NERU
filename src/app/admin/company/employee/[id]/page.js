'use client';

import CardLayout from '@/components/CardLayout';
import { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import Link from 'next/link';
import Table from '@/components/Table';
import Pagination from '@/components/Table/pagination';
import { ArrowLeftOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalDeleted from '@/components/Modal';
import { useSnackbar } from 'notistack';
import SearchInput from '@/components/Search';
import Image from 'next/image';
import ModalConfirm from '@/components/Modal/ModalConfirm';

export default function Employee({ params }) {
  const id = params?.id;
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : localStorage.getItem('token');
  const [type, setType] = useState('name');
  const [inputSearch, setInputSearch] = useState('');
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [idClicked, setIdClicked] = useState('');

  const [total, setTotal] = useState(0);
  const [activeItem, setActiveItem] = useState();
  const { enqueueSnackbar } = useSnackbar();

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
        title: '電話番号',
        index: 'user_id',
        render: (value) => <div className="w-full text-left">{value?.phone}</div>,
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
      },
      {
        title: '姓名',
        index: 'user_id',
        render: (value) => (
          <div className="w-full text-left">{value?.last_name + ' ' + value?.first_name}</div>
        ),
        className: 'min-w-[40px]',
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      },
      {
        title: 'メールアドレス',
        index: 'user_id',
        render: (value) => <div className="w-full text-left">{value?.email}</div>,
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
        sorter: (a, b) => a.user_id.localeCompare(b.user_id),
      },
      {
        title: 'アクション',
        index: 'id',
        render: (id, record) => (
          <div className="w-full flex justify-between items-center">
            <Link
              href={`/admin/company/employee/${record?.enterprise_id}/edit/${record?.user_id?.id}`}
            >
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
            <DeleteFilled
              onClick={() =>
                setActiveItem({
                  id: record.user_id?.id,
                  name: record.user_id?.first_name,
                  data: [
                    {
                      label: '姓名',
                      value: record.user_id?.first_name,
                    },
                    {
                      label: '電話番号',
                      value: record.user_id?.phone,
                    },
                  ],
                })
              }
              className={cx(
                'w-6 h-6 mx-2 text-error',
                css`
                  svg {
                    width: 100%;
                    height: 100%;
                  }
                `
              )}
            />
            <div
              className="w-6 h-6 mx-2 cursor-pointer"
              onClick={() => {
                setIdClicked(record?.user_id?.id);
                setIsOpen(true);
              }}
            >
              <Image alt="icon" width={50} height={50} src="/iconoir_mic-add.svg" />
            </div>
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
        setIsDeleteSuccess(true);
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

  const handleAddRecordNumber = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/user/${idClicked}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
        }
      );
      const data = await response.json();
      if (data.status === 200 || data.status === 201) {
        enqueueSnackbar('更新は成功しました。', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const getListEmployee = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/enterprise/search/employee/${id}?name=${
            type === 'name' ? search : ''
          }&email=${type === 'email' ? search : ''}&phone=${
            type === 'phone' ? search : ''
          }&page=${currentPage}&limit=${10}`,
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
          setListEmployee([]);
          setLastPage(null);
          setTotal(null);
          return;
        } else if (data.status === 200 || data.status === 201) {
          setLastPage(data?.payload?._totalPage);
          setTotal(data?.payload?._max);
          setIsDeleteSuccess(false);
          if (data?.payload?.filteredLegal?.length === undefined) {
            setListEmployee([data?.payload?.filteredLegal]);
          } else {
            setListEmployee(data?.payload?.filteredLegal);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListEmployee();
  }, [currentPage, id, search, token, type, isDeleteSuccess]);

  const menuItem = [
    { value: 'name', name: '姓名' },
    { value: 'email', name: 'メール' },
    { value: 'phone', name: '電話番号' },
  ];
  return (
    <div className="w-full font-bold">
      <div className="w-full h-10 flex justify-center items-center text-3xl mt-4 font-bold">
        会社一覧
      </div>
      <CardLayout>
        <div className="w-full flex justify-between items-center">
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
          <SearchInput
            label="会社名"
            inputSearch={inputSearch}
            menuItem={menuItem}
            placeholder="社員を探してください。..."
            setCurrentPage={setCurrentPage}
            setInputSearch={setInputSearch}
            setSearch={setSearch}
            setType={setType}
            type={type}
          />
        </div>
        <Table columns={columns} data={listEmployee} />
        <Pagination
          currentPage={currentPage}
          lastPage={listEmployee.length === 0 ? 0 : lastPage}
          setCurrentPage={setCurrentPage}
          total={total}
        />
      </CardLayout>
      {activeItem?.id && (
        <ModalDeleted action={handleDelete} activeItem={activeItem} setActiveItem={setActiveItem} />
      )}

      {isOpen && (
        <ModalConfirm
          title="記録回を更新する"
          handleOk={handleAddRecordNumber}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="もう1 回の記録をこのアカウントに追加してもよろしいですか?"
        />
      )}
    </div>
  );
}
