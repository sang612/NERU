'use client';

import { NotifyModal } from '@/components/Modal/NotifyModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TutorialStep1Page() {
  const router = useRouter();
  const firstAction = () => {
    router.push('/notification/tutorial/step1');
  };
  const secondAction = () => {
    router.push('/notification/tutorial/step3');
  };
  return (
    <NotifyModal firstAction={firstAction} secondAction={secondAction}>
      <div className="relative w-full h-[90vh] mt-[-43.98px]">
        <Image src="/tutorial2.svg" fill alt='step2'/>
      </div>
    </NotifyModal>
  );
}
