'use client';

import { Banner } from '@/components/WelcomeDashboardBanner/banner';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  return (
    <div id="root">
      {!user.length ? (
        <Banner />
      ) : user.role === 'User' ? (
        router.replace('/notification')
      ) : (
        router.replace('/admin/company')
      )}
    </div>
  );
}
