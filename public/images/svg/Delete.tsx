import { SVGProps } from "react";

const Delete = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    id="Delete"
    data-name="Delete"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="9"
    height="10"
    viewBox="0 0 9 10"
    aria-labelledby="Delete"
    {...props}
  >
    <title id="Delete">Delete Icon</title>

    <path
      d="M6.47993 3.53034V8.61507H2.41214V3.53034H6.47993ZM5.71722 0.479492H3.17485L2.66638 0.987966H0.886719V2.00491H8.00535V0.987966H6.22569L5.71722 0.479492ZM7.49688 2.51339H1.39519V8.61507C1.39519 9.1744 1.85282 9.63202 2.41214 9.63202H6.47993C7.03925 9.63202 7.49688 9.1744 7.49688 8.61507V2.51339Z"
      fill="#346DEE"
    />
  </svg>
);

export default Delete;
