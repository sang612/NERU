'use client';

import { Button } from '@/components/Button/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PaymentModal from '../../components/Payment';

const amount = '1100円';

export default function UploadPage() {
  const user = sessionStorage.getItem('session_user') ? JSON.parse(sessionStorage.getItem('session_user')) : JSON.parse(localStorage.getItem('user'));
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : localStorage.getItem('token');
  const router = useRouter();
  if (!user) router.replace('auth/login');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const getUserDetailtoCheckRecordNumberofUser = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/detail/${user.id}`, {
            method: 'GET',
            headers: {
              accessToken: token,
            },
          });
          const data = await response.json();
          if (data.payload.user.record_number_of_user > 0 && !data.payload.user.isUpload) {
            router.replace('/notification/second');
          }
          if (data.payload.user.record_number_of_user > 0 && data.payload.user.isUpload) {
            router.replace('/survey');
          }
          if (data.payload.user.record_number_of_user > 0 && data.payload.user.isUpload && data.payload.user.isAnswer) {
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
    <div className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <div className="w-full">
          <div className="text-center font-[700] text-2xl text-third md:text-3xl xl:text-4xl my-[50px] sssm:my-[120px]">
            ご利用にあたっては <span className="block">{amount}(税込)</span> をお支払いください。 <br />
            1回録音できます。
          </div>
          <div className="w-full">
            <Button
              onClick={() => {
                router.push('/auth/login');
              }}
              classname="bg-secondary"
            >
              キャンセル
            </Button>
            <section>
              <Button role="button" onClick={() => setIsOpen(true)} classname="bg-primary  mt-[16px]">
                同意
              </Button>
            </section>
          </div>
          <PaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
}
