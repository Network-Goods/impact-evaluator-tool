import { SVGProps } from "react";

const Edit = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    id="Edit"
    data-name="Edit"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="9"
    height="8"
    viewBox="0 0 9 8"
    aria-labelledby="Edit"
    {...props}
  >
    <title id="Edit">Edit Icon</title>

    <path d="M5.50144 2.8077L5.87978 3.18604L2.15395 6.91187H1.77561V6.53353L5.50144 2.8077ZM6.98191 0.332031C6.8791 0.332031 6.77217 0.373155 6.69404 0.451291L5.94147 1.20386L7.48362 2.74601L8.23619 1.99344C8.39657 1.83306 8.39657 1.57398 8.23619 1.41359L7.27389 0.451291C7.19164 0.369043 7.08883 0.332031 6.98191 0.332031ZM5.50144 1.64389L0.953125 6.1922V7.73435H2.49528L7.04359 3.18604L5.50144 1.64389Z" />
  </svg>
);

export default Edit;
