import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface ButtonProps {
  label: string; // Button text
  type?: "button" | "submit" | "reset"; // Button type (defaults to "button")
  variant?: "text" | "outlined" | "contained"; // Material-UI button variant
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning"; // Button color
  sx?: SxProps<Theme>; // Additional Material-UI styles
  disabled?: boolean; // Manually disable the button
  isFormValid?: boolean; // Disable the button based on form validity
  onClick?: () => void; // Custom click handler (optional)
}

const ButtonDefault: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant = "contained",
  color = "primary",
  sx,
  disabled = false,
  isFormValid = true,
  onClick,
}) => {
  const { formState } = useFormContext(); // Get form state from react-hook-form

  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      sx={sx}
      disabled={disabled || !isFormValid || formState.isSubmitting} // Disable based on props and form state
      onClick={onClick}
    >
      <div className="font-sans text-[20px] font-medium">
        {label}
      </div>
    </Button>
  );
};

export default ButtonDefault;
