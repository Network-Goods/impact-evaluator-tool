import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

type SelfDealingTooltipProps = {
  children: React.ReactNode;
};

export default function SelfDealingTooltip({ children }: SelfDealingTooltipProps) {
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
      padding: "10px 18px",
    },
  }));

  return (
    <div>
      <HtmlTooltip
        title={
          <div className="text-center">
            <p className="">Evaluators cannot vote on their own projects.</p>
          </div>
        }
      >
        <div>{children}</div>
      </HtmlTooltip>
    </div>
  );
}
