'use client';

import { Banner } from '@/components/WelcomeDashboardBanner/banner';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem('user'));
  const rememberMe = localStorage.getItem('rememberMe');

  return (
    <div id="root">{rememberMe && user.record_number_of_user === 0 ? router.replace('/notification') : <Banner />}</div>
  );
}
