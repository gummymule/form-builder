import { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

// Define the prop types
interface NavbarDefaultProps {
  navData: { label: string; value: string; description: React.ReactNode }[];
  navState?: string;
  setTab?: string;
  getTabValue?: (value: string) => void;
  sx?: object;
  cn?: object;
  isTabDisabled?: boolean;
}

export const NavbarDefault: React.FC<NavbarDefaultProps> = ({
  navData,
  navState,
  setTab,
  getTabValue,
  sx,
  cn, 
  isTabDisabled = false,
}) => {
  const [value, setValue] = useState<string>(navState || navData[0]?.value || "1");
  const [isHandle, setHandle] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
    if (getTabValue) {
      getTabValue(newValue);
    }
    setHandle(true);
  };

  useEffect(() => {
    if (navState && navState !== value) {
      setValue(navState);
    }
  }, [navState, value]);

  useEffect(() => {
    if (!isHandle && setTab && setTab !== value) {
      setValue(setTab);
    }
  }, [setTab, value, isHandle]);

  return (
    <Box>
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "8px",
          marginBottom: "2rem",
          padding: "0.5rem",
          ...cn
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              color: "#303030",
              fontWeight: 400,
              fontSize: "14px",
              fontFamily: 'Poppins, sans',
              textTransform: "none",
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
          scrollButtons="auto"
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
