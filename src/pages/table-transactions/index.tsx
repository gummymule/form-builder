import {
  Button,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { CardWithHeader } from "../../components/atoms/card/with-header";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];
const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

export function TransactionsTable() {
  const navigate = useNavigate();
  return (
    <CardWithHeader
        label="Recent Transactions"
    >
      <CardHeader
        action={
          <Stack direction="row" spacing={1}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => navigate("/user-register/home")}
            >
              Add Transaction
            </Button>
          </Stack>
        }
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((head) => (
                <TableCell key={head}>
                    <div className="text-center">
                        <b>{head}</b>
                    </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TABLE_ROWS.map(
              (
                {
                  img,
                  name,
                  amount,
                  date,
                  status,
                  account,
                  accountNumber,
                  expiry,
                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "" : "border-b";

                return (
                  <TableRow key={name} className={classes}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <img src={img} alt={name} width={50} />
                        <Typography variant="body2">{name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                        <div className="text-center">
                            {amount}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="text-center">
                            {date}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex justify-center">
                            <Chip
                                label={status}
                                className="w-full px-4"
                                color={
                                status === "paid"
                                    ? "success"
                                    : status === "pending"
                                    ? "warning"
                                    : "error"
                                }
                            />
                        </div>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <div className="flex justify-center items-center gap-3 text-center">
                                <img
                                src={
                                    account === "visa"
                                    ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                    : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                }
                                alt={account}
                                />
                                <Typography variant="body2">
                                {account} {accountNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {expiry}
                                </Typography>
                            </div>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col gap-3">
                            <Tooltip title="Edit User">
                                <IconButton>
                                    <Button
                                        variant="outlined"
                                        className="w-full px-3 py-6"
                                        size="small"
                                        startIcon={<EditIcon />}
                                    >
                                        Transaction Detail
                                    </Button>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Download Invoice">
                                <IconButton>
                                    <Button
                                        variant="outlined"
                                        className="w-full px-3 py-6"
                                        size="small"
                                        startIcon={<DownloadIcon />}
                                    >
                                        Download
                                    </Button>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </CardWithHeader>
  );
}
