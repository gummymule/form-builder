import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  color?: string; 
  sx?: SxProps<Theme>;
  disabled?: boolean;
  isFormValid?: boolean;
  autoFocus?: boolean; // Add the `autoFocus` prop
  onClick?: () => void;
}


const ButtonDefault: React.FC<ButtonProps> = ({
  label,
  children,
  type = "button",
  variant = "contained",
  color,
  sx,
  disabled = false,
  isFormValid = true,
  autoFocus,
  onClick,
}) => {
  const { formState } = useFormContext();

  return (
    <Button
      type={type}
      variant={variant}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color={color as any} // TypeScript expects specific Material-UI colors, so casting might be needed
      sx={sx}
      disabled={disabled || !isFormValid || formState.isSubmitting}
      onClick={onClick}
      autoFocus={autoFocus}
    >
      {children || <div className="font-sans text-[20px] font-medium">{label}</div>}
    </Button>
  );
};


export default ButtonDefault;
