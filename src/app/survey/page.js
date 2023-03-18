'use client';
import { SurveyInput } from '@/components/Input';
import { Button } from '@/components/Button/button';

import { Inter } from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
const inter = Inter({ subsets: ['latin'] });
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { useEffect, useState } from 'react';
import { InputRadioSurvey } from '@/components/InputRadio/InputRadioSurvey';
import { useSnackbar } from 'notistack';
export default function SurveyPage() {
  const router = useRouter();
  const user = sessionStorage.getItem('session_user')
    ? JSON.parse(sessionStorage.getItem('session_user'))
    : JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!user) router.replace('auth/login');
  }, []);
  const date = new Date();
  const newDate = `${date.getFullYear()}-${
    date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
  }-${date.getDate()}`;
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : localStorage.getItem('token');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const [listSurvey, setListSurvey] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({
    9: null,
    24: null,
    25: null,
    32: null,
    33: null,
  });

  const titleToContentMap = {
    14: '就寝中',
    17: '起床',
    19: '日中',
    20: '健康状態について',
  };

  const titleMap = {
    5: { text: '時間' },
    2: { text: 'センチ' },
    3: { text: 'キログラム' },
    7: { text: '日' },
    8: { text: '合' },
    10: { text: '年 間' },
    11: { text: '本' },
    22: { text: 'kg' },
    27: { text: '年 間' },
  };

  const handleChange = (answer, numberQuestion) => {
    setAnswers((prevState) => ({
      ...prevState,
      [numberQuestion]: answer,
    }));
  };
  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData('text'));
    if (pastedData < 0) {
      e.preventDefault();
    }
  };
  const preventMinus = (e) => {
    if (e.code === 'Minus') {
      e.preventDefault();
    }
  };

  const onSubmit = async (datas) => {
    setIsLoading(true);

    try {
      const result = listSurvey.reduce(
        (acc, item) => {
          const newObj = {};
          newObj['question_id'] = item.question_id;
          Object.keys(datas).forEach((key) => {
            if (item.question_title === key.substring(1)) {
              newObj['answer'] = datas[key];
            }
          });
          acc.answer.push(newObj);
          return acc;
        },
        { user: user.id, answer: [] }
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/answer-question`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
          body: JSON.stringify(result),
        }
      );
      const data = await response.json();
      setIsLoading(false);
      if (data.status !== 200 && data.status !== 201) {
        enqueueSnackbar(data.message ? data?.message : data?.error, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        return;
      } else if (data.status === 200 || data.status === 201) {
        enqueueSnackbar('質問の回答が完了しました。', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        router.push('/app-download');
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar('答えを伝えるのは失敗します。', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      throw error;
    }
  };
  const render = (item) => {
    return Object.entries(titleToContentMap).map(([title, content]) => {
      if (item.question_title === title) {
        return (
          <>
            <div
              className="w-full text-center text-2xl border-t-primary border-t-[3px] py-4 mt-4"
              key={title}
            >
              {content}
            </div>
          </>
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    const getDataDetailCompany = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/answer-question/${user?.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setListSurvey(data?.payload?.result);

        if (data?.payload?.result) {
          const serverAnswers = {};
          data.payload.result.forEach((item) => {
            serverAnswers[item.question_title] = item.answer_by_user[0]?.answer;
          });
          setAnswers((prevState) => ({
            ...prevState,
            ...serverAnswers,
          }));
        }
        return;
      }
      return;
    };
    getDataDetailCompany();
  }, [token, user?.id]);

  return (
    <div className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <form
        autoComplete="off"
        encType="multipart/form-data"
        className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full"
      >
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          オクチィ
          <span className="align-middle text-6xl md:text-6xl xl:text-7xl font-bold">Q</span>
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <p className="text-2xl text-third md:text-3xl xl:text-4xl">普段の生活習慣</p>
          <div className="mt-[26.8px] text-left text-xl md:text-2xl xl:text-3xl">
            {listSurvey
              ?.sort(function (a, b) {
                return (
                  parseInt(a.question_title.replace('Q.', '')) -
                  parseInt(b.question_title.replace('Q.', ''))
                );
              })
              .map((item) => (
                <>
                  {render(item)}
                  <div key={item.question_id} className="mt-[40px]">
                    <label
                      className={`ml-3 ${
                        errors['Q' + item.question_title]?.message ? 'text-error' : ''
                      }`}
                    >
                      {item.question_content}
                    </label>
                    {item.question_type !== 'option' && (
                      <div className="relative mt-[12px]">
                        <SurveyInput
                          name={item.question_id}
                          key={item.question_id}
                          className={`${item.question_type === 'number' ? 'pr-[40%]' : ''}`}
                          type={item.question_type}
                          max={item.question_type === 'date' && newDate}
                          register={register}
                          min={item.question_type === 'number' ? 0 : ''}
                          defaultValue={item?.answer_by_user[0]?.answer || ''}
                          id={'Q' + item.question_title}
                          onKeyPress={preventMinus}
                          onPaste={preventPasteNegative}
                          disabled={
                            (item.question_title === '10' && answers['9'] === 'はい') ||
                            (item.question_title === '11' && answers['9'] === 'いいえ') ||
                            (item.question_title === '26' && answers['24'] === 'いいえ') ||
                            (item.question_title === '26' && answers['25'] === 'いいえ')
                          }
                          validationMessage={errors['Q' + item.question_title]?.message}
                        >
                          {errors['Q' + item.question_title]?.message}
                        </SurveyInput>
                        {titleMap[item.question_title] && (
                          <div className="absolute right-[32px] top-1/2 -translate-y-1/2">
                            {titleMap[item.question_title].text}
                          </div>
                        )}
                      </div>
                    )}
                    {item.question_type === 'option' && (
                      <div className="mt-[12px]">
                        {item?.question_answer?.map((option) => (
                          <InputRadioSurvey
                            text={option?.content}
                            name={item.question_id}
                            value={option.content}
                            key={option.id}
                            id={'Q' + item.question_title}
                            register={register}
                            defaultChecked={option.content === item.answer_by_user[0]?.answer}
                            onChange={() => handleChange(option.content, item.question_title)}
                            disabled={
                              (item.question_title === '33' && answers['32'] === 'はい') ||
                              (item.question_title === '25' && answers['24'] === 'いいえ')
                            }
                          />
                        ))}
                        <span className="text-error font-normal text-sm">
                          {errors['Q' + item.question_title]?.message}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="flex mt-[40px]">
          <Button onClick={() => router.push('/upload')} classname="bg-secondary mr-[20px]">
            戻る
          </Button>
          <Button onClick={handleSubmit(onSubmit)} classname="bg-primary" isLoading={isLoading}>
            次へ
          </Button>
        </div>
      </form>
    </div>
  );
}
