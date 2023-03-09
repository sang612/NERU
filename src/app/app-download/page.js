'use client';

import { Button } from '@/components/Button/button';
import { DownloadIcon, MeasureYourSleepIcon } from '@/assets/icons';

export default function AppDownloadPage() {
  return (
    <div className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <div className="w-full text-primary">
          <MeasureYourSleepIcon width="100%" height={68} />
        </div>
        <div className="w-full max-w-[260px] mx-auto">
          <p className="text-center font-[700] text-2xl text-third md:text-3xl xl:text-4xl mt-[50px] sssm:mt-[120px]">
            登録完了 <br />
            いたしました。
          </p>
          <div className="flex justify-center w-full my-[30px]">
            <DownloadIcon width={48} height={48} />
          </div>
          <Button
            onClick={() => {
              document.location = process.env.NEXT_PUBLIC_IOS_APP_URL;
            }}
            classname="bg-[#A6D4E3] border-[#50C3C5] border-[3px] h-[88px] w-[260px] rounded-[24px] font-bold text-xl mb-8"
          >
            録音のAPPへ(IOS)
          </Button>
          <Button
            onClick={() => {
              document.location = process.env.NEXT_PUBLIC_ANDROID_APP_URL;
            }}
            classname="bg-[#A6D4E3] border-[#50C3C5] border-[3px] h-[88px] w-[260px] rounded-[24px] font-bold text-xl"
          >
            録音のAPPへ(Android)
          </Button>
        </div>
      </div>
    </div>
  );
}
