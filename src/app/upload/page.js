"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/Button/button";
import { UploadItem } from "@/components/Upload/upload-item";

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
        event.target.files[0] && setImage1(event.target.files[0]);
        break;
      case 2:
        event.target.files[0] && setImage2(event.target.files[0]);
        break;
      case 3:
        event.target.files[0] && setImage3(event.target.files[0]);
        break;
      case 4:
        event.target.files[0] && setImage4(event.target.files[0]);
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
  };

  return (
    <div
      className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}
    >
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          横顔画像の登録
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <p className="text-2xl text-third md:text-3xl xl:text-4xl">
            ＊登録前に右側と左側からの横顔画像を撮影しておいてください。
          </p>
          <p className="mt-[20px] text-2xl text-third md:text-3xl xl:text-4xl">
            画像をクリックしてアップロードしてください
          </p>
          <div className="grid grid-cols-2 gap-[48px] my-[36px]">
            <UploadItem
              inputRef={hiddenFileInput}
              handleChange={handleChange}
              handleClick={handleClick}
              item={image1}
              defaultSrc="/upload-tutorial-1.svg"
              alt="image1"
              index={1}
            />
            <UploadItem
              inputRef={hiddenFileInput2}
              handleChange={handleChange}
              handleClick={handleClick}
              item={image2}
              defaultSrc="/upload-tutorial-2.svg"
              alt="image2"
              index={2}
            />
            <UploadItem
              inputRef={hiddenFileInput3}
              handleChange={handleChange}
              handleClick={handleClick}
              item={image3}
              defaultSrc="/upload-tutorial-3.svg"
              alt="image3"
              index={3}
            />
            <UploadItem
              inputRef={hiddenFileInput4}
              handleChange={handleChange}
              handleClick={handleClick}
              item={image4}
              defaultSrc="/upload-tutorial-4.svg"
              alt="image4"
              index={4}
            />
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