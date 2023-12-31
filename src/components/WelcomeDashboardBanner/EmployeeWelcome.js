import Link from 'next/link';
import { Button } from '../Button/button';

export const EmployeeWelcome = ({ setEmployeeWelcome, userType }) => (
  <div className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}>
    <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[20px] w-full h-full">
      <h1 className="w-full text-center text-6xl text-third">Welcome</h1>
      <div className="w-full">
        <div className="mx-auto text-left max-w-[220px] md:max-w-full font-[700] text-2xl text-third md:text-3xl xl:text-4xl mt-[70px] mb-[20px] sssm:my-[70px]">
          『寝るソク』は、顔 と口の写真登録、健 康状態について答え て、就寝中の呼吸音 (いびきなど)を録
          音することで、呼吸 の異常を発見しま す。
        </div>
      </div>
    </div>
    <div className="w-full flex flex-row px-[26px]">
      <div className="w-1/2 mr-[20px]">
        <Button classname="bg-secondary" onClick={() => setEmployeeWelcome(false)}>
          戻る
        </Button>
      </div>
      <Link href={`${userType === 'employee' ? '/auth/login/employee' : '/auth/register/personal'} `} className="w-1/2">
        <Button type="submit" classname="bg-primary">
          次へ
        </Button>
      </Link>
    </div>
  </div>
);
