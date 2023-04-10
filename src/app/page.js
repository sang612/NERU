'use client';

import { Banner } from '@/components/WelcomeDashboardBanner/banner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [numberOfRecord, setNumberOfRecord] = useState();
  const user = sessionStorage.getItem('session_user')
    ? JSON.parse(sessionStorage.getItem('session_user'))
    : JSON.parse(localStorage.getItem('user'));
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (user) {
      const getUserDetail = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/detail/${user.id}`,
            {
              method: 'GET',
              headers: {
                accessToken: token,
              },
            }
          );
          const data = await response.json();
          setNumberOfRecord(data.payload.user.record_number_of_user);
          if (data.payload.user.record_number_of_user === 0 && data.payload.user.isEnterprise) {
            router.replace('/app-download');
          }
        } catch (e) {
          console.log(e);
        }
      };
      getUserDetail();
    }
  }, [router, token, user]);
  return (
    <div id="root">
      {user ? (
        user.role === 'Admin' ? (
          router.replace('admin/company')
        ) : user?.isEnterprise && numberOfRecord === 0 ? (
          router.replace('/app-download')
        ) : numberOfRecord === 1 && !user?.isEnterprise ? (
          router.replace('/notification/second')
        ) : (
          router.replace('/notification')
        )
      ) : (
        <Banner />
      )}
    </div>
  );
}
