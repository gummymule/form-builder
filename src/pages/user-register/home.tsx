import { useState } from 'react';
import { NavbarDefault } from '../../components/atoms/navbar/default';
import Payment from './payment';
import Transactions from './transactions';
import User from './user';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";

interface NavbarState {
  label: string;
  value: string;
  description: JSX.Element;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [navState, setNavState] = useState<string>("1");

  const navbarState: NavbarState[] = [
    {
      label: "Identity User",
      value: "1",
      description: <User setNavState={setNavState} />,
    },
    {
      label: "Transactions Purpose",
      value: "2",
      description: <Transactions setNavState={setNavState} />,
    },
    {
      label: "Payment Methods",
      value: "3",
      description: <Payment setNavState={setNavState} />,
    },
  ];

  return (
    <div>
      <Button
        variant="outlined" 
        color="primary"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => navigate("/")}
        sx={{
          marginBottom: "20px",
        }}
      >
        Back
      </Button>
      <NavbarDefault 
        navData={navbarState} 
        navState={navState} 
        cn={{
          position: "sticky",
          top: 0,
          zIndex: 9
        }}
      />
    </div>
  );
};

export default Home;
