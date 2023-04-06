'use client';

import { NotifyModal } from '@/components/Modal/NotifyModal';
import { useRouter } from 'next/navigation';

export default function ThirdNotification() {
  const router = useRouter();
  const firstAction = () => {
    router.push('/notification/second');
  };
  const secondAction = () => {
    router.push('/notification/tutorial/step1');
  };

  return (
    <NotifyModal
      content="一度このアプリを閉じ
      て、スマホのカメラで次
      のページの1〜4の(正
      面、左右、口の中)写真を
      撮ってください。"
      firstAction={firstAction}
      secondAction={secondAction}
    ></NotifyModal>
  );
}
