import Image from 'next/image';
import PropTypes from 'prop-types';

export const UploadItem = ({
  index,
  handleChange,
  inputRef,
  handleClick,
  defaultSrc,
  item,
  alt,
  className,
  title,
  desc,
  ...props
}) => (
  <div className={`h-[200px] w-half ${className}`} {...props}>
    <div className="w-full h-[80%] relative">
      <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={(e) => handleChange(e, index)} />
      <Image onClick={() => handleClick(inputRef)} src={item ? URL.createObjectURL(item) : defaultSrc} fill alt={alt} />
    </div>
    <div className={`${desc ? 'bg-[#d0eaeb] ' : '' }p-2 text-center`}>
      <div className="text-fourth font-bold flex items-center justify-center">
        <span className="bg-fourth rounded-full text-white w-4 h-4 justify-center flex items-center text-[10px]">
          {index}
        </span>
        <h4>{title}</h4>
      </div>
      <p className="font-bold text-[10px]">{desc}</p>
    </div>
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
