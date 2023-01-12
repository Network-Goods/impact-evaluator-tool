import { SVGProps } from "react";

const LeftArrow = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    id="LeftArrow"
    data-name="LeftArrow"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="13"
    viewBox="0 0 20 13"
    aria-labelledby="LeftArrow"
    {...props}
  >
    <title id="LeftArrow">LeftArrow Icon</title>

    <path
      d="M19.0961 5.45843H4.83353L8.43691 1.84499L7.0177 0.425781L0.978516 6.46496L7.0177 12.5041L8.43691 11.0849L4.83353 7.4715H19.0961V5.45843Z"
      fill="#242424"
    />
  </svg>
);

export default LeftArrow;
