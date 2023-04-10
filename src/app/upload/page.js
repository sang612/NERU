'use client';
import { useRef, useState } from 'react';
import { Button } from '@/components/Button/button';
import { UploadItem } from '@/components/Upload/upload-item';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '@/slices/userSlice';
import { useEffect } from 'react';

export default function UploadPage() {
  const { imageList } = useSelector((state) => state.user);
  const router = useRouter();
  const hiddenFileInput = useRef(null);
  const hiddenFileInput2 = useRef(null);
  const hiddenFileInput3 = useRef(null);
  const hiddenFileInput4 = useRef(null);
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [isUpload, setIsUpload] = useState(false);
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : localStorage.getItem('token');
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const user = sessionStorage.getItem('session_user')
    ? JSON.parse(sessionStorage.getItem('session_user'))
    : JSON.parse(localStorage.getItem('user'));

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
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (imageList.length === 4 && imageList[0].name) {
      router.push('/survey');
      return;
    }
    if (!image1 || !image2 || !image3 || !image4) {
      enqueueSnackbar('全ての画像をアップロードしてください。', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('right', image1);
    formData.append('left', image2);
    formData.append('top', image3);
    formData.append('bottom', image4);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/upload-image/`,
        {
          method: 'POST',
          headers: {
            accessToken: token,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === 200 || data.status === 201) {
        const imageArr = [image1, image2, image3, image4];
        dispatch(addImage(imageArr));
        setIsLoading(false);
        enqueueSnackbar('画像のアップロードが成功しました', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        router.push('/survey');
      } else {
        setIsLoading(false);
        enqueueSnackbar(data.message ? data?.message : data?.error, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        return;
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar('画像をアップロードすることは失敗します。', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/detail/${user.id}`,
          {
            method: 'GET',
            headers: {
              accessToken: token,
            },
          }
        );
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setIsUpload(data.payload.user.isUpload);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetailUser();
  }, []);
  const handleSkipUpload = () => {
    router.push('/survey');
  };

  if (!user) router.replace('auth/login');

  return (
    <div className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-3xl text-center md:text-4xl xl:text-5xl text-primary">
          横顔画像の登録
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <p className="mt-[20px] text-2xl text-third md:text-3xl xl:text-4xl">
            画像をクリックしてアップロードしてください
          </p>
          <div className="grid grid-cols-2 gap-y-[48px] gap-x-[8px] mt-[36px] mb-[78px]">
            <UploadItem
              inputRef={hiddenFileInput}
              handleChange={handleChange}
              handleClick={handleClick}
              item={imageList[0]?.name ? imageList[0] : image1}
              defaultSrc="/upload-tutorial-1.svg"
              alt="image1"
              index={1}
              title="顔写真正面"
              desc="頭の先から鎖骨の上まで入るように"
            />
            <UploadItem
              inputRef={hiddenFileInput2}
              handleChange={handleChange}
              handleClick={handleClick}
              item={imageList[1]?.name ? imageList[1] : image2}
              defaultSrc="/upload-tutorial-2.svg"
              alt="image2"
              index={2}
              title="横顔(右)"
              desc="鼻先から後頭部まで全て入るように"
            />
            <UploadItem
              inputRef={hiddenFileInput3}
              handleChange={handleChange}
              handleClick={handleClick}
              item={imageList[2]?.name ? imageList[2] : image3}
              defaultSrc="/upload-tutorial-3.svg"
              alt="image3"
              index={3}
              title="横顔(左)"
              desc="鼻先から後頭部まで全て入るように"
            />
            <UploadItem
              inputRef={hiddenFileInput4}
              handleChange={handleChange}
              handleClick={handleClick}
              item={imageList[3]?.name ? imageList[3] : image4}
              defaultSrc="/upload-tutorial-4.svg"
              alt="image4"
              index={4}
              title="口内"
            />
          </div>
          {isUpload && (
            <Button onClick={handleSkipUpload} classname="bg-primary">
              スキップ
            </Button>
          )}
          <Button
            onClick={() => router.push('/notification/fourth')}
            classname="bg-secondary mt-[10.14px]"
          >
            戻 る
          </Button>
          <Button onClick={handleSubmit} classname="bg-primary mt-[10.14px]" isLoading={isLoading}>
            登録する
          </Button>
        </div>
      </div>
    </div>
  );
}
