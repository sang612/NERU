'use client';

import { NotifyModal } from '@/components/Modal/NotifyModal';
import { useRouter } from 'next/navigation';

export default function ThirdNotification() {
  const router = useRouter();
  const firstAction = () => {
    router.push('/notification/tutorial/step3');
  };
  const secondAction = () => {
    router.push('/upload');
  };
  return (
    <NotifyModal
      content={
        <>
          一度このアプリを閉じ て、スマホのカメラで ①〜④の(正面、左右、口 の中)写真を撮ってくださ い。<br />
          その後、またこのアプリ を開いてください。
        </>
      }
      firstAction={firstAction}
      secondAction={secondAction}
    ></NotifyModal>
  );
}
