'use client';
import { SurveyInput } from '@/components/Input';
import { InputRadio } from '@/components/InputRadio';
import { Button } from '@/components/Button/button';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDate = yesterday.toISOString().slice(0, 10);
  return formattedDate;
};
const yesterday = getYesterday();
const replaceWithBr = (question) => {
  return question.replace(/break/g, '<br />');
};
const numberExtractor = (inputString) => {
  const regex = /(?:^|\D)(\d{1,2})(?:$|\D)/;
  const matches = inputString.match(regex);
  if (matches && matches.length > 1) {
    const numberString = matches[1];
    const number = parseInt(numberString);
    return number;
  }
};

export default function SurveyPage() {
  const [isErrorMessage, setIsErrorMessage] = useState([]);
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [listQuestion, setListQuestion] = useState();
  const [answersList, setAnswersList] = useState({
    user: user.id,
    answer: [{ question_id: '63f609f6bd5ab34b9a8e9f13', answer: '' }],
  });
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const deletePreviousAnswer = (id) => {
    const updateAnswer = {
      ...answersList,
      answer: answersList.answer.filter((item) => item.question_id !== id),
    };
    setAnswersList(updateAnswer);
  };
  const handleChangeInput = (e, id) => {
    deletePreviousAnswer(id);
    if (id === '63f609f6bd5ab34b9a8e9f13' && e.target.value.length === 0) {
      setAnswersList((prevState) => ({
        ...prevState,
        answer: [...prevState.answer, { question_id: id, answer: '' }],
      }));
    }
    if (e.target.value.length === 0) return;
    if (e.target.value < 0) {
      e.target.value = e.target.value * -1;
    }
    setAnswersList((prevState) => ({
      ...prevState,
      answer: [...prevState.answer, { question_id: id, answer: e.target.value }],
    }));
  };
  const handleChangeRadioInput = (optionId, id) => {
    deletePreviousAnswer(id);
    setAnswersList((prevState) => ({
      ...prevState,
      answer: [...prevState.answer, { question_id: id, answer_id: optionId }],
    }));
  };
  const handleSubmit = async () => {
    if (isErrorMessage.length > 0) {
      return;
    }
    if (answersList.answer.length === 1) {
      enqueueSnackbar('全ての質問を答えてください', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/answer-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accessToken: token,
        },
        body: JSON.stringify(answersList),
      });
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
  useEffect(() => {
    setIsLoadingPage(true);
    const getListQuestion = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/question?page=1&limit=100`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
        });
        const data = await response.json();
        setIsLoadingPage(false);
        if (data.status !== 200 && data.status !== 201) {
          return;
        } else if (data.status === 200 || data.status === 201) {
          const questionListFromServer = data?.payload?.questionAll;
          questionListFromServer.sort((a, b) => {
            const aNumber = Number(a.content.replace(/[^\d.]/g, ''));
            const bNumber = Number(b.content.replace(/[^\d.]/g, ''));
            return aNumber - bNumber;
          });
          setListQuestion(questionListFromServer);
        }
      } catch (error) {
        setIsLoadingPage(false);
        throw error;
      }
    };
    getListQuestion();
  }, []);
  const disableInput = (name) => {
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) {
      input.classList.add('bg-disabled');
      input.classList.add('border-none');
      input.classList.add('text-secondary');
      input.disabled = true;
    }
  };
  const enableInput = (name) => {
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) {
      input.classList.remove('bg-disabled');
      input.classList.remove('border-none');
      input.classList.remove('text-secondary');
      input.disabled = false;
    }
  };
  const disableRadioInput = (name) => {
    const input = document.querySelectorAll(`input[name="${name}"]`);
    for (let i = 0; i < input.length; i++) {
      const parentDiv = input[i].parentNode.parentNode;
      if (parentDiv) {
        parentDiv.classList.add('bg-disabled');
        parentDiv.classList.add('border-none');
        parentDiv.classList.add('text-secondary');
        input[i].disabled = true;
        input[i].checked = false;
      }
    }
  };
  const enableRadioInput = (name) => {
    const input = document.querySelectorAll(`input[name="${name}"]`);
    for (let i = 0; i < input.length; i++) {
      const parentDiv = input[i].parentNode.parentNode;
      if (parentDiv) {
        parentDiv.classList.remove('bg-disabled');
        parentDiv.classList.remove('border-none');
        parentDiv.classList.remove('text-secondary');
        input[i].disabled = false;
      }
    }
  };
  useEffect(() => {
    let index = answersList.answer.findIndex((o) => o.question_id === '640959b1495019455d6740a0');
    if (index > 0) {
      if (answersList.answer[index].answer_id === '640959b1495019455d6740a1') {
        disableInput('640959e7495019455d6740af');
        enableInput('64095a14495019455d6740b2');
      } else if (answersList.answer[index].answer_id === '640959b1495019455d6740a2') {
        disableInput('64095a14495019455d6740b2');
        enableInput('640959e7495019455d6740af');
      }
    }
    let index2 = answersList.answer.findIndex((o) => o.question_id === '64095b8347d8a7c5aaee8efd');
    if (index2 > 0) {
      if (answersList.answer[index2].answer_id === '64097a1d47d8a7c5aaee9019') {
        disableInput('64095bab47d8a7c5aaee8f04');
      } else {
        enableInput('64095bab47d8a7c5aaee8f04');
      }
    }
    let index3 = answersList.answer.findIndex((o) => o.question_id === '64095c1547d8a7c5aaee8f1d');
    if (index3 > 0) {
      if (answersList.answer[index3].answer_id === '64097adf47d8a7c5aaee903c') {
        disableRadioInput('64095c3047d8a7c5aaee8f24');
      } else {
        enableRadioInput('64095c3047d8a7c5aaee8f24');
      }
    }
    let index4 = answersList.answer.findIndex((o) => o.question_id === '64095c3047d8a7c5aaee8f24');
    if (index4 > 0) {
      if (answersList.answer[index4].answer_id === '64097aff47d8a7c5aaee9043') {
        disableInput('64095d3a47d8a7c5aaee8f33');
      } else {
        enableInput('64095d3a47d8a7c5aaee8f33');
      }
    }
    let index5 = answersList.answer.findIndex((o) => o.question_id === '64095d5547d8a7c5aaee8f36');
    if (index5 > 0) {
      if (answersList.answer[index5].answer_id === '64097b8947d8a7c5aaee906a') {
        disableRadioInput('64095d7547d8a7c5aaee8f3d');
      } else {
        enableRadioInput('64095d7547d8a7c5aaee8f3d');
      }
    }
    let index6 = answersList.answer.findIndex((o) => o.question_id === '64095de047d8a7c5aaee8f59');
    if (index6 > 0) {
      if (answersList.answer[index6].answer_id === '64097c2020af33a0256d35cf') {
        disableRadioInput('64095e0d47d8a7c5aaee8f68');
      } else {
        enableRadioInput('64095e0d47d8a7c5aaee8f68');
      }
    }
  }, [answersList]);
  if (isLoadingPage) return 'Loading...';

  return (
    <div className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">
          オクチィ
          <span className="align-middle text-6xl md:text-6xl xl:text-7xl font-bold">Q</span>
        </h1>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
          <p className="text-2xl text-third md:text-3xl xl:text-4xl">普段の生活習慣</p>
          <div className="mt-[26.8px] text-left text-xl md:text-2xl xl:text-3xl">
            {listQuestion?.map((item) => (
              <div key={item.id} className="mt-[40px]">
                {item.title === 'Q.14' && (
                  <div className="w-full text-center text-2xl border-t-primary border-t-[3px] py-6 ">就寝中</div>
                )}
                {item.title === 'Q.17' && (
                  <div className="w-full text-center text-2xl border-t-primary border-t-[3px] py-6 ">起床</div>
                )}
                {item.title === 'Q.19' && (
                  <div className="w-full text-center text-2xl border-t-primary border-t-[3px] py-6 ">日中</div>
                )}
                {item.title === 'Q.20' && (
                  <div className="w-full text-center text-2xl border-t-primary border-t-[3px] py-6 ">
                    健康状態について
                  </div>
                )}
                <label className="ml-3" dangerouslySetInnerHTML={{ __html: replaceWithBr(item.content) }} />
                {(item.type === 'text' || item.answers.length === 0) && (
                  <div className="relative mt-[12px]">
                    <SurveyInput
                      name={item.id}
                      key={numberExtractor(item.title)}
                      className={`${item.type === 'number' ? 'pr-[40%]' : ''}`}
                      type={item.type}
                      onChange={(e) => handleChangeInput(e, item.id)}
                      max={item.type === 'date' ? yesterday : ''}
                      min={item.type === 'number' ? 0 : ''}
                      numberOfQuestion={numberExtractor(item.title)}
                      setIsErrorMessage={setIsErrorMessage}
                    />
                    {item.title === 'Q.05' && (
                      <div className="absolute right-[32px] top-1/2 -translate-y-1/2">時間</div>
                    )}
                    {item.title === '身⻑' && (
                      <div className="absolute right-[32px] top-1/2 -translate-y-1/2">センチ</div>
                    )}
                    {item.title === '体重' && (
                      <div className="absolute right-[32px] top-1/2 -translate-y-1/2">キログラム</div>
                    )}
                    {item.title === 'Q.07' && <div className="absolute right-[32px] top-1/2 -translate-y-1/2">日</div>}
                    {item.title === 'Q.08' && <div className="absolute right-[32px] top-1/2 -translate-y-1/2">合</div>}
                    {item.title === 'Q.10' && (
                      <div className="absolute right-[32px] top-1/2 -translate-y-1/2">年 間</div>
                    )}
                    {item.title === 'Q.11' && <div className="absolute right-[32px] top-1/2 -translate-y-1/2">本</div>}
                    {item.title === 'Q.22' && <div className="absolute right-[32px] top-1/2 -translate-y-1/2">kg</div>}
                    {item.title === 'Q.27' && (
                      <div className="absolute right-[32px] top-1/2 -translate-y-1/2">年 間</div>
                    )}
                  </div>
                )}
                {item.type === 'option' && (
                  <div className="mt-[12px]">
                    {item?.answers?.map((option, indexOption) => (
                      <InputRadio
                        text={option?.content}
                        name={item?.id}
                        value={option?.content}
                        onChange={() => handleChangeRadioInput(option?.id, item?.id)}
                        key={indexOption}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex mt-[40px]">
            <Button onClick={() => router.push('/upload')} classname="bg-secondary mr-[20px]">
              戻る
            </Button>
            <Button onClick={handleSubmit} classname="bg-primary" isLoading={isLoading}>
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
