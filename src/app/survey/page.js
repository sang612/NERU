"use client";
import { Input } from "@/components/Input";
import { InputRadio } from "@/components/InputRadio";
import { Button } from "@/components/Button/button";
import { useState } from "react";

export default function SurveyPage() {
  const [q01, setQ01] = useState(null);
  const [q02, setQ02] = useState(true);
  const handleChangeInput = (e) => {
    setQ01(e.target.value);
  };
  const handleChangeRadioInput = (e) => {
    setQ02(e.target.value === "true");
  };
  const handleSubmit = () => {};

  return (
    <div className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          オクチィ
          <span className="align-middle text-6xl md:text-6xl xl:text-7xl font-bold">
            Q
          </span>
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <p className="text-2xl text-third md:text-3xl xl:text-4xl">
            普段の生活習慣
          </p>
          <div className="mt-[26.8px] text-left text-xl md:text-2xl xl:text-3xl">
            <div>
              <label>
                Q.01睡眠時間は何時間ですか？（不規則で一定でない場合には空欄で結構です）
              </label>
              <div className="relative mt-[12px]">
                <Input
                  className="pr-[72px]"
                  type={"number"}
                  onChange={handleChangeInput}
                />
                <div className="absolute right-[32px] top-1/2 -translate-y-1/2">
                  時間
                </div>
              </div>
            </div>
            <div className="mt-[40px]">
              <label>Q.02夜勤などの不規則な勤務はありますか？</label>
              <div className="mt-[12px]">
                <InputRadio
                  text="あり"
                  name="theme"
                  checked
                  value={true}
                  onChange={handleChangeRadioInput}
                />
                <InputRadio
                  className="mt-[10.14px]"
                  text="なし"
                  name="theme"
                  value={false}
                  onChange={handleChangeRadioInput}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-[20px] mt-[40px]">
            <Button classname="bg-secondary">戻る</Button>
            <Button onClick={handleSubmit} classname="bg-primary">
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
