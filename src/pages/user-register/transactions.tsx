import { Button } from "@mui/material";

interface TransactionProps {
  setNavState: (value: string) => void;
}

const Transactions: React.FC<TransactionProps> = ({ setNavState }) => {
  const onSubmit = () => {
    setNavState('3')
  }
  return (
    <div>
      Test 2
      <div className="flex py-4 justify-end gap-4">
        <Button type="reset" variant="outlined" color="primary">
          Reset
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Transactions
