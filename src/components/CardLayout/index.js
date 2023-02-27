import { css, cx } from '@emotion/css';

const CardLayout = ({ children }) => {
  return (
    <div className="w-full py-6 px-8">
      <div
        className={cx(
          'py-10 px-4 rounded-2xl w-full bg-white',
          css`
            box-shadow: 0px 2px 6px 4px #2224;
          `
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default CardLayout;
