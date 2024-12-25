import { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

type NavItem = {
  label: string;
  value: string;
  description?: React.ReactNode;
};

type NavbarScrollableProps = {
  navData: NavItem[];
  navState?: string;
  getTabValue?: (value: string) => void;
  sx?: object;
  isTabDisabled?: boolean;
};

export const NavbarScrollable: React.FC<NavbarScrollableProps> = ({
  navData,
  navState,
  getTabValue,
  sx,
  isTabDisabled = false,
}) => {
  const [value, setValue] = useState<string>(navState || navData[0]?.value || "1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);

    if (getTabValue) {
      getTabValue(newValue);
    }
  };

  useEffect(() => {
    if (navState && navState !== value) {
      setValue(navState);
    }
  }, [navState, value]);

  return (
    <Box>
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "8px",
          marginBottom: "2rem",
          padding: "0.5rem",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              color: "#303030",
              fontWeight: 400,
              fontSize: "14px",
              opacity: isTabDisabled ? 1 : undefined,
              pointerEvents: isTabDisabled ? "none" : "auto",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#084F8C",
              fontWeight: 700,
            },
            "& .MuiTab-root.Mui-disabled": {
              color: "#303030",
              opacity: 1,
            },
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#ED6E12",
              height: "3px",
              borderRadius: "2px",
              marginBottom: "4px",
            },
          }}
        >
          {navData.map((data, index) => (
            <Tab
              key={index}
              label={data.label}
              value={data.value}
              disabled={isTabDisabled}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          padding: "0",
          ...sx,
        }}
      >
        {navData.map(
          (data, index) =>
            value === data.value && (
              <Box key={index} role="tabpanel">
                {data.description}
              </Box>
            )
        )}
      </Box>
    </Box>
  );
};
