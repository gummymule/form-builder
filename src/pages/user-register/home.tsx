import { useState } from 'react';
import { NavbarDefault } from '../../components/atoms/navbar/default';
import Payment from './payment';
import Transactions from './transactions';
import User from './user';

interface NavbarState {
  label: string;
  value: string;
  description: JSX.Element;
}

const Home: React.FC = () => {
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
      <NavbarDefault navData={navbarState} navState={navState} />
    </div>
  );
};

export default Home;
