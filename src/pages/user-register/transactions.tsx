import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { CardWithHeader } from "../../components/atoms/card/with-header";
import TextEditor from "../../components/molecules/text-editor/default";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CurrencyKursSection from "../../components/organism/forms/transactions-purpose/currency-and-kurs";
import FacilitiesForm from "../../components/organism/forms/transactions-purpose/facilities-form";


const schema = z.object({
  segmentation: z.string().min(1, 'Segmentation is required'),
  market_information: z.string().min(1, 'Market Information is required'),
  currency_kurs: z.array(
    z.object({
      currency: z.string().min(1, 'Currency is required'),
      kurs: z.number().min(1, 'Kurs is required')
    })
  ),
  facility_loan: z.array(
    z.object({
      facility_type: z.string().min(1, 'Facility Type is required'),
      currency: z.string().min(1, 'Currency is required'),
      limit: z.number().min(1, 'Limit is required'),
      exposure: z.number().min(1, 'Exposure is required'),
      final_exposure: z.number().min(1, 'Final Exposure is required'),
    })
  ),
});

type FormData = z.infer<typeof schema>;

interface TransactionProps {
  setNavState: (value: string) => void;
}

const Transactions: React.FC<TransactionProps> = ({ setNavState }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      segmentation: '',
      market_information: '',
      currency_kurs: [{ 
        currency: '', 
        kurs: 0 
      }],
      facility_loan: [{ 
        facility_type: '', 
        currency: '', 
        limit: 0, 
        exposure: 0, 
        final_exposure: 0 
      }],
    },
  });

  const { formState, handleSubmit, setFocus } = methods;
  const { errors } = formState;
  const handleScrollToError = (errors: typeof formState.errors) => {
    const firstErrorKey = Object.keys(errors)[0];
    console.log('firstErrorKey', firstErrorKey);
    if (firstErrorKey) {
      setFocus(firstErrorKey as keyof FormData);
      const errorField = document.querySelector(`[name="${firstErrorKey}"]`);
      errorField?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const onError = (errors: typeof formState.errors) => {
    handleScrollToError(errors);
  };

  const onSubmit = (data: FormData) => {
    console.log(data)
    setNavState('3')
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Segmentation"
          sx= {{
            marginBottom: '15px'
          }}
        >
          <TextEditor
            name="segmentation"
            placeholder="Enter your text here..."
            errors={errors.segmentation?.message}
          />
        </CardWithHeader>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Market Information"
          sx= {{
            marginBottom: '15px'
          }}
        >
          <TextEditor
            name="market_information"
            placeholder="Enter your text here..."
            errors={errors.market_information?.message}
          />
        </CardWithHeader>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Transaction Purpose"
          sx= {{
            marginBottom: '15px'
          }}
        >
          <CurrencyKursSection name="currency_kurs" />
        </CardWithHeader>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Transaction Purpose"
          sx= {{
            marginBottom: '15px'
          }}
        > 
          <FacilitiesForm name="facility_loan" />
        </CardWithHeader>
        <div className="flex py-4 justify-end gap-4">
          <Button type="reset" variant="outlined" color="primary">
            Reset
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default Transactions
