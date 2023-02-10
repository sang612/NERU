import PropTypes from "prop-types";

export const Button2 = ({ classname, children, ...props }) => {
  return (
    <button
      className={`bg-[#A6D4E3] px-[32px] outline-[#50C3C5] outline outline-[4px] rounded-[24px] w-full h-[80px] uppercase text-[#ffffff] font-[700] text-[16px] leading-[20px] text-center ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button2.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  props: PropTypes.object,
};