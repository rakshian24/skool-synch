import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { MouseEventHandler, ReactElement } from "react";
import { SxProps } from "@mui/material";
import { colors } from "../constants";

export type ButtonProps = LoadingButtonProps & {
  styles?: SxProps;
  buttonText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  dataTestId?: string;
  priority?: "primary" | "secondary" | "tertiary";
};

const Button = ({
  styles,
  buttonText,
  disabled = false,
  isLoading = false,
  onClick = () => {},
  startIcon,
  endIcon,
  dataTestId = "SubmitBtn",
  priority = "primary",
  ...props
}: ButtonProps) => (
  <LoadingButton
    type="submit"
    loading={isLoading}
    disabled={disabled}
    onClick={onClick}
    variant={"contained"}
    startIcon={startIcon}
    endIcon={endIcon}
    data-testid={dataTestId}
    sx={{
      ...{
        fontSize: "16px",
        borderRadius: "8px",
        textTransform: "none",
        p: endIcon ? "8px 16px" : startIcon ? "8px 16px" : "8px 16px",
        boxShadow: "none",
        bgcolor: priority === "primary" ? colors.primary : colors.white,
        color: priority === "primary" ? colors.white : colors.primary,
        border:
          priority === "secondary" ? `1px solid ${colors.primary}` : "none",
        "&:hover": {
          bgcolor:
            priority === "primary"
              ? colors.primaryDark
              : priority === "secondary"
              ? colors.lightGrey
              : colors.primaryLight,
          boxShadow: "none",
        },
        "&:disabled": {
          bgcolor: priority === "primary" ? colors.primary : colors.white,
          color: priority === "primary" ? colors.white : colors.primary,
          opacity: 0.6,
        },
      },
      ...(styles && { ...styles }),
    }}
    {...props}
  >
    {buttonText}
  </LoadingButton>
);

export default Button;
