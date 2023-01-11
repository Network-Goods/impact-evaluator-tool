import { SVGProps } from "react";

const Close = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    id="Close"
    data-name="Close"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="13.426"
    height="13.423"
    viewBox="0 0 13.426 13.423"
    aria-labelledby="close"
    {...props}
  >
    <title id="close">Close Icon</title>

    <path
      id="Icon_ionic-ios-close"
      data-name="Icon ionic-ios-close"
      d="M19.589,18l4.8-4.8A1.124,1.124,0,0,0,22.8,11.616l-4.8,4.8-4.8-4.8A1.124,1.124,0,1,0,11.616,13.2l4.8,4.8-4.8,4.8A1.124,1.124,0,0,0,13.2,24.384l4.8-4.8,4.8,4.8A1.124,1.124,0,1,0,24.384,22.8Z"
      transform="translate(-11.285 -11.289)"
    />
  </svg>
);

export default Close;
