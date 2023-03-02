'use client';

import { Button } from '@/components/Button/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PaymentModal from '../../components/Payment';

const amount = '1100円';

export default function UploadPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <div className="w-full">
          <div className="text-center font-[700] text-2xl text-third md:text-3xl xl:text-4xl my-[50px] sssm:my-[120px]">
            ご利用にあたっては <span className="block">{amount}(税込)</span> をお支払いください。 <br />
            3回録音できます。
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
