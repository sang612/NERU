import { Button } from '../Button/button';

export const NotifyModal = ({ content, firstAction, secondAction, children, contentClassname }) => (
  <div className={`mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}>
    <div className="text-center flex flex-col items-center justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full min-h-[80vh]">
      {children}
      {content && (
        <div className="w-full">
          <div
            className={`mx-auto text-left max-w-[280px] md:max-w-full font-[700] text-2xl text-third md:text-3xl xl:text-4xl my-[50px] sssm:my-[120px] ${contentClassname}`}
          >
            {content}
          </div>
        </div>
      )}
      <div></div>
    </div>
    <div className="w-full flex flex-row absolute bottom-[50px] left-0 px-[26px]">
      <Button classname="bg-secondary mr-[20px]" onClick={firstAction}>
        戻る
      </Button>
      <Button type="submit" classname="bg-primary" onClick={secondAction}>
        次へ
      </Button>
    </div>
  </div>
);
