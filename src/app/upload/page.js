"use client";
import {  useRef, useState } from "react";
import { Inter } from "@next/font/google";
import { Button } from "@/components/Button/button";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function UploadPage(params) {
  const hiddenFileInput = useRef(null);
  const hiddenFileInput2 = useRef(null);
  const hiddenFileInput3 = useRef(null);
  const hiddenFileInput4 = useRef(null);
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const handleClick = (inputRef) => {
    inputRef.current.click();
  };
  const handleChange = (event, value) => {
    switch (value) {
      case 1:
        setImage1(event.target.files[0]);
        break;
      case 2:
        setImage2(event.target.files[0]);
        break;
      case 3:
        setImage3(event.target.files[0]);
        break;
      case 4:
        setImage4(event.target.files[0]);
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("files", image1);
    formData.append("files", image2);
    formData.append("files", image3);
    formData.append("files", image4);
    for (const value of formData.values()) {
      console.log(value);
    }
  };

  return (
    <div
      className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}
    >
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          横顔画像の登録
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <p className="text-2xl text-third md:text-3xl xl:text-4xl">
            ＊登録前に右側と左側からの横顔画像を撮影しておいてください。
          </p>
          <p className="mt-[20px] text-2xl text-third md:text-3xl xl:text-4xl">画像をクリックしてアップロードしてください</p>
          <div className="grid grid-cols-2 gap-[48px] my-[36px]">
            <div className="h-[200px] w-half relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={hiddenFileInput}
                onChange={(e) => handleChange(e, 1)}
                max="4"
              />
              <Image
                onClick={() => handleClick(hiddenFileInput)}
                src={
                  image1
                    ? URL.createObjectURL(image1)
                    : `/upload-tutorial-1.svg`
                }
                fill
                alt="desc-img"
              />
            </div>
            <div className="h-[200px] w-half relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={hiddenFileInput2}
                onChange={(e) => handleChange(e, 2)}
                max="4"
              />
              <Image
                onClick={() => handleClick(hiddenFileInput2)}
                src={
                  image2
                    ? URL.createObjectURL(image2)
                    : `/upload-tutorial-2.svg`
                }
                fill
                alt="desc-img"
              />
            </div>
            <div className="h-[200px] w-half relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={hiddenFileInput3}
                onChange={(e) => handleChange(e, 3)}
                max="4"
              />
              <Image
                onClick={() => handleClick(hiddenFileInput3)}
                src={
                  image3
                    ? URL.createObjectURL(image3)
                    : `/upload-tutorial-3.svg`
                }
                fill
                alt="desc-img"
              />
            </div>
            <div className="h-[200px] w-half relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={hiddenFileInput4}
                onChange={(e) => handleChange(e, 4)}
                max="4"
              />
              <Image
                onClick={() => handleClick(hiddenFileInput4)}
                src={
                  image4
                    ? URL.createObjectURL(image4)
                    : `/upload-tutorial-4.svg`
                }
                fill
                alt="desc-img"
              />
            </div>
          </div>
          <Button classname="bg-secondary">戻　る</Button>
          <Button onClick={handleSubmit} classname="bg-primary mt-[10.14px]">
            登録する
          </Button>
        </div>
      </div>
    </div>
  );
}
