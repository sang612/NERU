"use client";

import { WelcomeImage, WelcomeImage3 } from "@/assets/icons";
import { Button } from "../Button/button";
import Link from "next/link";

export const Banner = () => {

  return (
    <div className="mx-auto h-full xsm:w-[540px] min-h-screen bg-[#d0eaeb]">
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <div className="mx-auto">
          <WelcomeImage3 width="100%" height="auto" />
        </div>
        <div className="flex flex-row justify-center my-[9px]">
          <WelcomeImage width={250} height={250} />
        </div>
        <div className="mt-[32px] w-full">
          <Link href="/auth/register/personal">
            <Button
              classname="bg-primary font-[700] "
            >
              個人でご利用のお客様
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button classname="bg-secondary font-[700] mt-[16px]">
              法人でご利用のお客様
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
