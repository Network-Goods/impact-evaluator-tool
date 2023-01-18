import { SVGProps } from "react";

const DownChevron = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    id="DownChevron"
    data-name="DownChevron"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 20 20"
    aria-labelledby="DownChevron"
    aria-hidden="true"
    {...props}
  >
    <title id="DownChevron">DownChevron Icon</title>

    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export default DownChevron;
