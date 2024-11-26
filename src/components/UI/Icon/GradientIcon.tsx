import classNames from "classnames";
import React from "react";

interface GradientIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const GradientIcon: React.FC<GradientIconProps> = ({
  width = 40,
  height = 40,
  className,
}) => {
  return (
    <div className={classNames("group", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 기본 색상 */}
          <linearGradient id="default-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          {/* 호버 시 색상 */}
          <linearGradient id="hover-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C81CCC" />
            <stop offset="100%" stopColor="#0D00B5" />
          </linearGradient>
          <clipPath id="clip0_195_59">
            <rect
              width="28"
              height="28"
              fill="white"
              transform="translate(20.0001 0.200928) rotate(45)"
            />
          </clipPath>
        </defs>
        <g id="Frame 12" clipPath="url(#clip0_195_59)">
          <g id="Group 7">
            {/* 선의 기본 색상과 호버 색상 설정 */}
            <line
              id="Line 10"
              x1="28.1318"
              y1="11.161"
              x2="11.1612"
              y2="28.1315"
              stroke="url(#default-stroke)"
              strokeWidth="3"
              className="group-hover:stroke-[url(#hover-stroke)] transition-colors duration-300"
            />
            <path
              id="Vector 1"
              d="M15.0503 11.5146H28.4853V24.9497"
              stroke="url(#default-stroke)"
              strokeWidth="3"
              className="group-hover:stroke-[url(#hover-stroke)] transition-colors duration-300"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default GradientIcon;
