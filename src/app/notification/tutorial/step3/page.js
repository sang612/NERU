'use client';

import { NotifyModal } from '@/components/Modal/NotifyModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TutorialStep1Page() {
  const router = useRouter();
  const firstAction = () => {
    router.push('/notification/tutorial/step2');
  };
  const secondAction = () => {
    router.push('/notification/fourth');
  };
  return (
    <NotifyModal firstAction={firstAction} secondAction={secondAction}>
      <div className="relative w-full h-[100vh] mt-[-43.98px] sm:mb-[60px]">
        <Image src="/tutorial3.svg" fill alt='step3'/>
      </div>
    </NotifyModal>
  );
}
