import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@mui/material"
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { CardWithHeader } from "../../components/atoms/card/with-header";
import TextEditor from "../../components/molecules/text-editor/default";
import { CardDefault } from "../../components/atoms/card/default";
import RadioButtonDefault from "../../components/molecules/radio/default";
import SelectDefault from "../../components/molecules/select/default";
import TextFieldPrefixNumber from "../../components/molecules/text-field/prefix-postfix-number";
import RadioButtonHorizontal from "../../components/molecules/radio/horizontal";
// import RadioButtonDefault from "../../components/molecules/radio/default";

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    members: 'Free access for 2 members',
    price: '$129 /year',
    features: [
      '✅ Complete documentation',
      '✅ Working materials in Sketch',
      '➖ Integration help',
      '➖ 40GB Cloud storage',
      '➖ Support team full assist',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    members: 'Free access for 30 members',
    price: '$299 /year',
    features: [
      '✅ Complete documentation',
      '✅ Working materials in Sketch',
      '✅ Integration help',
      '✅ 40GB Cloud storage',
      '➖ Support team full assist',
    ],
  },
  {
    id: 'company',
    name: 'Company',
    members: 'Free access for 200 members',
    price: '$399 /year',
    features: [
      '✅ Complete documentation',
      '✅ Working materials in Sketch',
      '✅ Integration help',
      '✅ 40GB Cloud storage',
      '✅ Support team full assist',
    ],
  },
];

const bankOptions = [
  { label: 'Bank A', value: 'Bank A' },
  { label: 'Bank B', value: 'Bank B' },
  { label: 'Bank C', value: 'Bank C' },
  { label: 'Bank D', value: 'Bank D' },
];

const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Australia', value: 'AU' },
];

const typeCardOptions = [
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'Debit Card', value: 'Debit Card' },
]

const schema = z.object({
  plan: z.string().min(1, 'Plan is required'),
  country: z.string().min(1, 'Country is required'),
  bank: z.string().min(1, 'Bank is required'),
  card_number: z.string().min(1, 'Card Number is required'),
  type_card: z.string().min(1, 'Type Card is required'),
  notes: z.string().min(1, 'Notes is required'),
});

type FormData = z.infer<typeof schema>;

interface PaymentProps {
  setNavState: (value: string) => void;
}

const Payment: React.FC<PaymentProps>  = ({ setNavState }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      plan: '',
      country: '',
      bank: '',
      card_number: '',
      type_card: '',
      notes: '',
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
    console.log(data);
    setNavState('1')
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Select Your Plan"
          sx={{
            marginBottom: "15px",
          }}
        >
          <p>You have the option of monthly or yearly billing</p>
          <div className="flex flex-row w-full gap-2 mt-4">
            {plans.map((plan) => (
              <div className="flex flex-col items-center flex-grow" key={plan.id}>
                <CardDefault
                  sx={{ flex: 1, height: '100%', minHeight: '400px', paddingRight: '10px', paddingLeft: '10px' }}
                >
                  <div className="flex flex-col items-center text-center p-4">
                    <Typography variant="h6" sx={{ paddingTop: '40px' }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {plan.members}
                    </Typography>
                    <Typography variant="h4" className="mt-2">
                      {plan.price}
                    </Typography>
                    <ul className="mt-6 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardDefault>
                <RadioButtonDefault
                  name="plan"
                  label={`${plan.name} plan`}
                  value={plan.id}
                  errors={errors.plan?.message}
                />
              </div>
            ))}
          </div>
        </CardWithHeader>

        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Payment Method"
          sx={{
            marginBottom: "15px",
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <SelectDefault 
              name="country" 
              label="Country" 
              options={countries} 
              errors={errors.country?.message}
            />
            <SelectDefault 
              name="bank" 
              label="Bank" 
              options={bankOptions} 
              errors={errors.bank?.message}
            />
            <TextFieldPrefixNumber
              name="card_number"
              label="Card Number" 
              textAlign="left"
              className="mt-6"
              errors={errors?.card_number?.message}
            />
            <RadioButtonHorizontal 
              name="type_card"
              className="mt-6"
              label="Type Card" 
              options={typeCardOptions}
              errors={errors?.type_card?.message} 
            />
          </div>
        </CardWithHeader>

        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Notes"
          sx= {{ 
            marginBottom: '15px'
           }}
        >
          <TextEditor
            name="notes"
            placeholder="Enter your text here..."
            errors={errors.notes?.message}
          />
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

export default Payment
