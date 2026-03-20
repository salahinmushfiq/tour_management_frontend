// components/TooltipWrapper.jsx
import React from 'react';
import clsx from 'clsx';

const TooltipWrapper = ({
  label,
  children,
  position = 'top',
  withArrow = true,
  className = '',
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-black dark:border-t-white',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 rotate-180 border-t-black dark:border-t-white',
    left: 'left-full top-1/2 -translate-y-1/2 -rotate-90 border-t-black dark:border-t-white',
    right: 'right-full top-1/2 -translate-y-1/2 rotate-90 border-t-black dark:border-t-white',
  };

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={clsx(
          'absolute z-50 hidden group-hover:flex flex-col items-center transition-all duration-200',
          positionClasses[position]
        )}
      >
        <div
          className={clsx(
            'px-2 py-1 rounded text-xs whitespace-nowrap text-white dark:text-black bg-black dark:bg-white shadow-lg',
            className
          )}
        >
          {label}
        </div>
        {withArrow && (
          <div
            className={clsx(
              'w-0 h-0 border-4 border-transparent',
              'group-hover:block',
              'absolute',
              arrowPositions[position]
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

export default TooltipWrapper;
