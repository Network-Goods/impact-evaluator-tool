import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

type CreateRoundTooltipProps = {
  children: React.ReactNode;
};

export default function CreateRoundTooltip({ children }: CreateRoundTooltipProps) {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#333333",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#333333",
      color: "#ffffff",
      maxWidth: 204.69,
      fontSize: theme.typography.pxToRem(14),
      border: "1px solid #dadde9",
      padding: "10px 24px",
    },
  }));

  return (
    <div>
      <HtmlTooltip
        title={
          <div className="text-center">
            <b className="">Coming Soon!</b>
            <p className="">Round Creation is not available at this time.</p>
          </div>
        }
      >
        <div>{children}</div>
      </HtmlTooltip>
    </div>
  );
}
