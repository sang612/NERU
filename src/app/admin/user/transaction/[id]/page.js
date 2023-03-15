'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CardLayout from '@/components/CardLayout';
import Table from '@/components/Table';
import Pagination from '@/components/Table/pagination';
import { ArrowLeftOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import Link from 'next/link';
import { css, cx } from '@emotion/css';

export default function TransactionDetailPage({ params }) {
  const id = params?.id;
  const token = localStorage.getItem('token');
  const [listTransaction, setListTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const columns = useMemo(
    () => [
      {
        title: '金額',
        index: 'amount',
        render: (amount, record) => (
          <div className="w-full flex text-left">
            {amount}
            <span className="ml-2 text-secondary uppercase">{record?.currency}</span>
            <span className="ml-2 text-secondary">
              <div className="flex items-center">
                {record?.status === 'succeeded' ? (
                  <>
                    成功
                    <CheckOutlined className="text-primary ml-2" />
                  </>
                ) : record?.status === 'incomplete' ? (
                  <>
                    未完了
                    <ClockCircleOutlined className="text-secondary ml-2" />
                  </>
                ) : (
                  ''
                )}
              </div>
            </span>
          </div>
        ),
        className: 'max-w-[200px] 3xl:max-w-[240px] 4xl:max-w-[280px]',
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: '顧客',
        index: 'payment_email',
        render: (value) => {
          return <div className="w-full text-left">{value}</div>;
        },
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: '日付',
        index: 'updatedAt',
        render: (value) => {
          return (
            <div className="w-full text-left">{moment(value).format('MM/DD/YYYY hh:mm:ss A')}</div>
          );
        },
        className: 'max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]',
        sorter: (a, b) => a.localeCompare(b),
      },
    ],
    []
  );
  useEffect(() => {
    const getDetailTransaction = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/transaction/${id}`,
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
        setListTransaction(data?.payload?.transactionAll);
        setLastPage(data?.payload?._totalPage);
        setTotal(data?.payload?._max);
      }
    };
    getDetailTransaction();
  }, []);

  return (
    <CardLayout>
      <div className="flex justify-start px-6 pb-6">
        <Link href="/admin/user">
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
      <Table columns={columns} data={listTransaction} />
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </CardLayout>
  );
}
