import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export default function DetailsTooltip({ children }: any) {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#333333",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#333333",
      color: "#ffffff",
      maxWidth: 160,
      fontSize: theme.typography.pxToRem(14),
      border: "1px solid #dadde9",
      padding: "10px",
    },
  }));

  return (
    <div>
      <HtmlTooltip
        title={
          <div className="text-center">
            <p>This round hasn't started yet.</p>
          </div>
        }
      >
        <div>{children}</div>
      </HtmlTooltip>
    </div>
  );
}
