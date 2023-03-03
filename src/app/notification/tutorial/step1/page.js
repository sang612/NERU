'use client';

import { NotifyModal } from '@/components/Modal/NotifyModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TutorialStep1Page() {
  const router = useRouter();
  const firstAction = () => {
    router.push('/notification/third');
  };
  const secondAction = () => {
    router.push('/notification/tutorial/step2');
  };
  return (
    <NotifyModal firstAction={firstAction} secondAction={secondAction}>
      <div className="relative w-full h-[70vh]">
        <Image src='/tutorial1.svg' fill alt='step1'/>
      </div>
    </NotifyModal>
  );
}
