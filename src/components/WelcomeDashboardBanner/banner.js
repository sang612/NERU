'use client';

import { WelcomeImage, WelcomeImage3 } from '@/assets/icons';
import { Button } from '../Button/button';
import { useState } from 'react';
import { EmployeeWelcome } from './EmployeeWelcome';
export const Banner = () => {
  const [modalEmployeeWelcome, setEmployeeWelcome] = useState(false);
  const [userType, setUserType] = useState('');

  return (
    <>
      {!modalEmployeeWelcome && (
        <div className="mx-auto h-full xsm:w-[540px] min-h-screen bg-[#d0eaeb]">
          <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
            <div className="mx-auto">
              <WelcomeImage3 width="100%" height="auto" />
            </div>
            <div className="flex flex-row justify-center my-[9px]">
              <WelcomeImage width={250} height={250} />
            </div>
            <div className="mt-[32px] w-full">
              <Button
                onClick={() => {
                  setEmployeeWelcome(true);
                  setUserType('individual');
                }}
                classname="bg-primary font-[700] "
              >
                個人でご利用のお客様
              </Button>
              <Button
                onClick={() => {
                  setEmployeeWelcome(true);
                  setUserType('employee');
                }}
                classname="bg-secondary font-[700] mt-[16px]"
              >
                法人でご利用のお客様
              </Button>
            </div>
          </div>
        </div>
      )}
      {modalEmployeeWelcome && <EmployeeWelcome setEmployeeWelcome={setEmployeeWelcome} userType={userType} />}
    </>
  );
};
