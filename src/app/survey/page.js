"use client";
import { Input } from "@/components/Input";
import { InputRadio } from "@/components/InputRadio";
import { Button } from "@/components/Button/button";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { NotFound } from "@/assets/icons";
import { useSelector } from "react-redux";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SurveyPage() {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const [listQuestion, setListQuestion] = useState();
  const [answersList, setAnswersList] = useState({
    user: user.id,
    answer: [],
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
    if (e.target.value.length === 0) return;
    setAnswersList((prevState) => ({
      ...prevState,
      answer: [
        ...prevState.answer,
        { question_id: id, answer: e.target.value },
      ],
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
    if (answersList.answer.length !== listQuestion.length) {
      enqueueSnackbar("Please answer all the question", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/answer-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accessToken: token,
          },
          body: JSON.stringify(answersList),
        }
      );
      const data = await response.json();
      setIsLoading(false);
      if (data.status === "failure") {
        enqueueSnackbar(data.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        return;
      } else if (data.status === "success") {
        enqueueSnackbar("Send answers successful", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Send answers failed", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      throw error;
    }
  };
  useEffect(() => {
    setIsLoadingPage(true);
    const getListQuestion = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user-auth/question`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accessToken: token,
            },
          }
        );
        const data = await response.json();
        setIsLoadingPage(false);
        if (data.status === "failure") {
          return;
        } else if (data.status === "success") {
          setListQuestion(data?.payload?.questionAll);
        }
      } catch (error) {
        setIsLoadingPage(false);
        throw error;
      }
    };
    getListQuestion();
  }, []);
  if (!user.id) return <NotFound />;
  if (isLoadingPage) return "Loading...";

  return (
    <div
      className={`${inter.className} mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff]`}
    >
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
            {listQuestion?.map((item, index) => (
              <div key={index} className="mt-[40px]">
                <label className="ml-3">{item.content}</label>
                {(item.type === "text" || item.answers.length === 0) && (
                  <div className="relative mt-[12px]">
                    <Input
                      className="pr-[72px]"
                      type="text"
                      onChange={(e) => handleChangeInput(e, item._id)}
                    />
                    {item.title === "Q.05" && (
                      <div className="absolute right-[32px] top-1/2 -translate-y-1/2">
                        時間
                      </div>
                    )}
                  </div>
                )}
                {item.type === "option" && (
                  <div className="mt-[12px]">
                    {item?.answers?.map((option, indexOption) => (
                      <InputRadio
                        text={option?.content}
                        name={item?.id}
                        checked={index == 0}
                        value={option?.content}
                        onChange={() =>
                          handleChangeRadioInput(option?._id, item?._id)
                        }
                        key={indexOption}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-[20px] mt-[40px]">
            <Button classname="bg-secondary">戻る</Button>
            <Button
              onClick={handleSubmit}
              classname="bg-primary"
              isLoading={isLoading}
            >
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
