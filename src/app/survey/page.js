'use client';
import { Button } from '@/components/Button/button';
import { Input, SurveyInput } from '@/components/Input';
import { InputRadioSurvey } from '@/components/InputRadio/InputRadioSurvey';
import { yupResolver } from '@hookform/resolvers/yup';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
const inter = Inter({ subsets: ['latin'] });

export default function SurveyPage() {
  const router = useRouter();
  const user = sessionStorage.getItem('session_user')
    ? JSON.parse(sessionStorage.getItem('session_user'))
    : JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!user) router.replace('auth/login');
  }, [router, user]);
  const date = new Date();
  const newDate = `${date.getFullYear()}-${
    date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
  }-${date.getDate()}`;
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : localStorage.getItem('token');
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const allValues = getValues();
  const { enqueueSnackbar } = useSnackbar();

  const [listSurvey, setListSurvey] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answerElevent, setAnswerElevent] = useState([]);
  const [yearState, setYearState] = useState();
  const [monthState, setMonthState] = useState();
  const [dateState, setDateState] = useState();
  const [stateQ, setStateQ] = useState(true);
  const [answers, setAnswers] = useState({
    12: null,
  });

  const titleMap = {
    2: { text: 'cm' },
    3: { text: 'kg' },
  };
  const handleChangeYear = (e) => {
    const year = parseInt(e.target.value);
    if (year <= 0) {
      return setYearState(1900);
    }
    const yearNow = new Date().getFullYear();
    if (year >= yearNow) {
      return setYearState(yearNow);
    }
    setYearState(year);
  };
  const handleChangeMonth = (e) => {
    const month = parseInt(e.target.value);
    if (month <= 0) {
      return setMonthState(1);
    }

    if (month >= 12) {
      return setMonthState(12);
    }
    setMonthState(e.target.value);
  };
  const handleChangeDays = (e) => {
    const day = parseInt(e.target.value);
    if (day <= 0) {
      return setDateState(1);
    }

    const date = new Date(yearState, monthState - 1, 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    if (day >= lastDayOfMonth) {
      return setDateState(lastDayOfMonth);
    }
    if (day >= 31) {
      return setDateState(31);
    }
    setDateState(e.target.value);
  };
  const handleChange = (answer, numberQuestion) => {
    setAnswers((prevState) => ({
      ...prevState,
      [numberQuestion]: answer,
    }));
    if (parseInt(numberQuestion) === 11) {
      if (answer === 'なし') {
        setValue('Q11', ['なし']);
        setAnswerElevent(['なし']);
      } else {
        const find = answerElevent.find((item) => item === answer);
        if (find) {
          setAnswerElevent(answerElevent.filter((finds) => finds !== find));
        } else {
          setAnswerElevent((pre) => [...pre.filter((item) => item !== 'なし'), answer]);
        }
      }
    }
  };
  useEffect(() => {
    allValues.Q11 === '高血圧 (上130以上)' && setAnswerElevent(['高血圧 (上130以上)']);
  }, [allValues.Q11]);

  useEffect(() => {
    answerElevent?.length > 0 && setValue('Q11', answerElevent);
    if (allValues.Q12 === 'いいえ') {
      setAnswers((prevState) => ({
        ...prevState,
        [12]: 'いいえ',
      }));
    }
  }, [allValues.Q12, answerElevent, listSurvey, setValue]);
  useEffect(() => {
    if (yearState && monthState && dateState) {
      setValue('Q1', `${yearState}/${monthState}/${dateState}`);
    } else {
      setValue('Q1', '');
    }
  }, [dateState, monthState, setValue, yearState]);
  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.Clipboard;
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

  function formatDescription(description) {
    if (description.includes('break')) {
      return description.replaceAll('break', '<br/>');
    }
    return description;
  }
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
  useEffect(() => {
    const questionOne = listSurvey?.filter((sp) => sp.question_title === '1');
    const valueOne = questionOne[0]?.answer_by_user[0]?.answer[0];
    if (valueOne) {
      setValue('Q1', valueOne);
      setYearState(valueOne.split('/')[0]);
      setMonthState(valueOne.split('/')[1]);
      setDateState(valueOne.split('/')[2]);
    }
  }, [listSurvey, setValue]);
  useEffect(() => {
    if (allValues.Q12 === 'いいえ') {
      setValue('Q13', '');
      clearErrors('Q13');
    }
    if (dateState && monthState && yearState) {
      clearErrors('Q1');
    }
  }, [allValues.Q12, clearErrors, dateState, monthState, setValue, yearState]);
  useEffect(() => {
    const questionFive = listSurvey?.filter((sp) => sp.question_title === '5');
    const value5 = questionFive[0]?.answer_by_user[0]?.answer[0];
    const questionSix = listSurvey?.filter((sp) => sp.question_title === '6');
    const value6 = questionSix[0]?.answer_by_user[0]?.answer[0];
    if (value5 || value6) {
      if (stateQ === true) {
        setValue('Q5', '');
        setValue('Q6', '');
        setStateQ(false);
      }
    }
  }, [listSurvey, setValue, stateQ]);
  return (
    <div className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <form
        autoComplete="off"
        encType="multipart/form-data"
        className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full"
      >
        <h1 className="w-full text-3xl text-center md:text-4xl xl:text-5xl text-primary">
          オクチィ
          <span className="text-6xl font-bold align-middle md:text-6xl xl:text-7xl">Q</span>
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
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
                  <div key={item.question_id} className="mt-[40px]">
                    <label
                      dangerouslySetInnerHTML={{
                        __html:
                          'Q.' +
                          item.question_title +
                          ' ' +
                          formatDescription(item?.question_content),
                      }}
                      className={`ml-3 ${
                        errors['Q' + item.question_title]?.message ? 'text-error' : ''
                      }`}
                    />
                    {item.question_type !== 'option' && (
                      <div className="relative mt-[12px]">
                        {item.question_type === 'date' ? (
                          <>
                            <div className="flex gap-4">
                              <Input
                                name={item.question_id}
                                type="number"
                                onChange={handleChangeYear}
                                placeholder="Year"
                                value={yearState}
                                defaultValue={
                                  item?.answer_by_user[0]?.answer[0].split('/')[0] || ''
                                }
                                validationMessage={errors['Q' + item.question_title]?.message}
                              />
                              <Input
                                name={item.question_id}
                                onChange={handleChangeMonth}
                                type="number"
                                placeholder="Month"
                                value={monthState}
                                defaultValue={
                                  item?.answer_by_user[0]?.answer[0].split('/')[1] || ''
                                }
                                validationMessage={errors['Q' + item.question_title]?.message}
                              />
                              <Input
                                name={item.question_id}
                                onChange={handleChangeDays}
                                type="number"
                                placeholder="Day"
                                value={dateState}
                                defaultValue={
                                  item?.answer_by_user[0]?.answer[0].split('/')[2] || ''
                                }
                                validationMessage={errors['Q' + item.question_title]?.message}
                              />
                            </div>
                            <span className="text-sm font-normal text-error">
                              {errors['Q' + item.question_title]?.message}
                            </span>
                          </>
                        ) : (
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
                            validationMessage={errors['Q' + item.question_title]?.message}
                          >
                            {errors['Q' + item.question_title]?.message}
                          </SurveyInput>
                        )}

                        {titleMap[item.question_title] && (
                          <div className="absolute right-[15px] top-[15px]">
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
                            type={item.question_title === '11' ? true : false}
                            id={'Q' + item.question_title}
                            register={register}
                            defaultChecked={item.answer_by_user[0]?.answer?.includes(
                              option.content
                            )}
                            onChange={() => handleChange(option.content, item.question_title)}
                            disabled={item.question_title === '13' && answers['12'] === 'いいえ'}
                          />
                        ))}
                        <span className="text-sm font-normal text-error">
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
