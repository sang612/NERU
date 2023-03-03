"use client"

import { NotifyModal } from '@/components/Modal/NotifyModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SecondNotification() {
    const router = useRouter()
    const firstAction = () => {
        router.push('/notification')
    }
    const secondAction = () => {
        router.push('/notification/third')
    }
  return (
    <NotifyModal
      content="あなたがいびきをしや
        すい顔型や⼝の構造を
        持っているかを判定す
        るために写真の登録が
        必要です。"
        firstAction={firstAction} secondAction={secondAction}
    >
      <div className="relative w-full h-[66px] mt-[38px]">
        <Image src="/title1_1.svg" fill alt='title1_1'/>
      </div>
      <div className="relative w-full h-[66px] mt-[12px] mb-[-38px]">
        <Image src="/title1_2.svg" fill alt='title1_2'/>
      </div>
    </NotifyModal>
  );
}
