'use client';

import { Banner } from '@/components/WelcomeDashboardBanner/banner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const user = sessionStorage.getItem('session_user')
    ? JSON.parse(sessionStorage.getItem('session_user'))
    : JSON.parse(localStorage.getItem('user'));
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    if (user) {
      const getUserDetailtoCheckRecordNumberofUser = async () => {
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
          if (
            (data.payload.user.isEnterprise && data.payload.user.record_number_of_user === 0) ||
            (!data.payload.user.isEnterprise && data.payload.user.record_number_of_user > 1)
          ) {
            router.replace('/app-download', undefined, { shallow: true });
          } else {
            if (data.payload.user.record_number_of_user === 0 && !data.payload.user.isEnterprise) {
              router.replace('/notification', undefined, { shallow: true });
            }
          }
        } catch (e) {
          console.log(e);
        }
      };
      getUserDetailtoCheckRecordNumberofUser();
    }
  }, []);
  return (
    <div id="root">
      {user ? (
        user.role === 'Admin' ? (
          router.replace('admin/company')
        ) : user.isEnterprise ? (
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
