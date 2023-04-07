"use client"

import { NotifyModal } from '@/components/Modal/NotifyModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SecondNotification() {
  const router = useRouter();
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : localStorage.getItem('token');
  const secondAction = () => {
    router.push('/notification/third');
  };
  const user = sessionStorage.getItem('session_user')
    ? JSON.parse(sessionStorage.getItem('session_user'))
    : JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/payment/payment-intent-completed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: token,
      },
      body: JSON.stringify({
        payment_intent: searchParams.get('payment_intent'),
        payment_intent_client_secret: searchParams.get('payment_intent_client_secret'),
        redirect_status: searchParams.get('redirect_status'),
      }),
    });
  }, []);

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
          if (data.payload.user.record_number_of_user > 0 && !data.payload.user.isUpload) {
            router.replace('/notification/second');
          }
          if (data.payload.user.record_number_of_user > 0 && data.payload.user.isUpload) {
            router.replace('/survey');
          }
          if (
            (data.payload.user.record_number_of_user === 0 && data.payload.user.isEnterprise) ||
            (data.payload.user.record_number_of_user > 0 &&
              data.payload.user.isUpload &&
              data.payload.user.isAnswer)
          ) {
            router.replace('/app-download');
          }
        } catch (e) {
          console.log(e);
        }
      };
      getUserDetailtoCheckRecordNumberofUser();
    }
  }, [router, token, user]);
  return (
    <NotifyModal
      content="あなたがいびきをしや
        すい顔型や⼝の構造を
        持っているかを判定す
        るために写真の登録が
        必要です。"
      secondAction={secondAction}
    >
      <div className="relative w-full h-[66px] mt-[38px]">
        <Image src="/title1_1.svg" fill alt="title1_1" />
      </div>
      <div className="relative w-full h-[66px] mt-[12px] mb-[-38px]">
        <Image src="/title1_2.svg" fill alt="title1_2" />
      </div>
    </NotifyModal>
  );
}
