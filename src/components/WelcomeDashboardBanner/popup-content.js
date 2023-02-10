import { ClosePopUpIcon } from "@/assets/icons";
import { Button2 } from "../Button/button2";
import PropTypes from "prop-types";

export const PopUpContent = ({ handleClose }) => {
  return (
    <div className="relative bg-[#ffffff] h-full w-full px-[24px] py-[72px] rounded-[24px] ">
      <div
        onClick={handleClose}
        className="absolute right-[24px] top-[24px] hover:cursor-pointer"
      >
        <ClosePopUpIcon width={16} height={16} />
      </div>
      <div className="flex flex-col gap-[50px]">
        <Button2>法人でご利用のお客様</Button2>
        <Button2>個人でご利用のお客様</Button2>
      </div>
    </div>
  );
};

PopUpContent.propTypes = {
    handleClose: PropTypes.func,
    
  };
