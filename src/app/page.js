'use client';

import { Banner } from '@/components/WelcomeDashboardBanner/banner';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem('user'));

  return <div id="root">{user && user.record_number_of_user === 0 ? router.replace('/notification') : <Banner />}</div>;
}
