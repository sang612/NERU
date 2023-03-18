import { logOut } from '@/slices/userSlice';
import { Role } from '@/utils/constants';
import { ContainerFilled, UserOutlined, TeamOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { css, cx } from '@emotion/css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

export const Sidebar = () => {
  const user = sessionStorage.getItem('session_user') ? JSON.parse(sessionStorage.getItem('session_user')) : JSON.parse(localStorage.getItem('user'));
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('session_user')
    sessionStorage.removeItem('token')
    router.push('/auth/login');
    dispatch(logOut());
  };

  return (
    <div className="fixed bg-[#d0eaeb] text-primary overflow-hidden top-0 left-0 h-screen w-56 xl:w-64 pt-12 z-50 text-lg xl:text-xl">
      <div className="w-full h-14 flex justify-start items-center pl-4 xl:pl-6 py-10">
        <UserOutlined
          className={cx(
            'w-9 h-9 mr-2',
            css`
              svg {
                width: 100%;
                height: 100%;
              }
            `
          )}
        />
        <div className="text-xl xl:text-2xl font-bold">Nerusoku Admin</div>
      </div>
      <div className="h-[2px] w-full bg-white" />

      {user.role === Role.admin && (
        <>
          <Link
            href="/admin/company"
            className={`w-full h-[60px] flex items-center justify-start font-bold ${
              pathname == '/admin/company' ? 'border-l-4 pl-3 xl:pl-5 border-solid border-primary' : 'pl-4 xl:pl-6'
            }`}
          >
            <ContainerFilled
              className={cx(
                'w-7 h-7 mr-2',
                css`
                  svg {
                    width: 100%;
                    height: 100%;
                  }
                `
              )}
            />
            会社一覧
          </Link>
          <div className="h-[2px] w-full bg-white" />
        </>
      )}

      <Link
        href="/admin/user"
        className={`w-full h-[60px] flex items-center justify-start font-bold ${
          pathname == '/admin/user' ? 'border-l-4 pl-3 xl:pl-5 border-solid border-primary' : 'pl-4 xl:pl-6'
        }`}
      >
        <TeamOutlined
          className={cx(
            'w-7 h-7 mr-2',
            css`
              svg {
                width: 100%;
                height: 100%;
              }
            `
          )}
        />
        ユーザー一覧
      </Link>
      <div className="h-[2px] w-full bg-white" />
      <button onClick={handleLogOut} className="w-full h-[60px] flex items-center justify-start font-bold pl-4 xl:pl-6">
        <ArrowRightOutlined
          className={cx(
            'w-7 h-7 mr-2',
            css`
              svg {
                width: 100%;
                height: 100%;
              }
            `
          )}
        />
        ログアウトする
      </button>
      <div className="h-[2px] w-full bg-white" />
    </div>
  );
};
