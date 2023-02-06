import { SVGProps } from "react";

const Plus = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    id="Plus"
    data-name="Plus"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 50 50"
    width="50px"
    height="50px"
    aria-labelledby="Plus"
    {...props}
  >
    <title id="Plus">Plus Icon</title>

    <rect fill="none" stroke="none" height="50" width="50" />
    <line strokeMiterlimit="10" strokeWidth="4" x1="9" x2="41" y1="25" y2="25" />
    <line strokeMiterlimit="10" strokeWidth="4" x1="25" x2="25" y1="9" y2="41" />
  </svg>
);

export default Plus;
