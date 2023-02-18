import Image from "next/image";
import PropTypes from "prop-types";

export const UploadItem = ({
  index,
  handleChange,
  inputRef,
  handleClick,
  defaultSrc,
  item,
  alt,
  className,
  ...props
}) => (
  <div className={`h-[200px] w-half relative ${className}`} {...props}>
    <input
      type="file"
      accept="image/*"
      className="hidden"
      ref={inputRef}
      onChange={(e) => handleChange(e, index)}
    />
    <Image
      onClick={() => handleClick(inputRef)}
      src={item ? URL.createObjectURL(item) : defaultSrc}
      fill
      alt={alt}
    />
  </div>
);

UploadItem.propTypes = {
  index: PropTypes.number,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  defaultSrc: PropTypes.string,
  item: PropTypes.object,
  alt: PropTypes.string,
  className: PropTypes.string,
};
