'use client';

import { Banner } from '@/components/WelcomeDashboardBanner/banner';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const user = sessionStorage.getItem('session_user')
    ? JSON.parse(sessionStorage.getItem('session_user'))
    : JSON.parse(localStorage.getItem('user'));

  return (
    <div id="root">
      {user ? (
        user.role === 'Admin' ? (
          router.replace('/admin/company')
        ) : (
          router.replace('/notification')
        )
      ) : (
        <Banner />
      )}
    </div>
  );
}
