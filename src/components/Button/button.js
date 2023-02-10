import PropTypes from "prop-types";

export const Button = ({ classname, children, ...props }) => {
  return (
    <button
      className={`uppercase w-full py-[20px] px-[44px] rounded-[10px] text-[#ffffff] ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  props: PropTypes.object,
};
