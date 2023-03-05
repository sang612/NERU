'use client';

import { NotFound } from '@/assets/icons';
import { Sidebar } from '@/components/AdminSidebar/Sidebar';
import { Role } from '@/utils/constants';
import { SnackbarProvider } from 'notistack/dist';


export default function AdminLayout({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <SnackbarProvider>
      <div className="min-h-screen w-full">
        {user.role === Role.admin ? (
          <>
            <Sidebar />
            <div className="ml-56 2xl:ml-64 min-h-screen min-w-[1024px] overflow-auto">
              <div className="w-full mt-14">
                <div className="fixed pl-56 2xl:pl-64 bg-white top-0 left-0 right-0 h-14 flex justify-center items-center text-5xl text-skyBlue-300 z-40">
                  {user.role === Role.admin ? 'Nerusoku' : ''}
                </div>
                {children}
              </div>
            </div>
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </SnackbarProvider>
  );
}
