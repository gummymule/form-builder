import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextFieldDefault from '../../components/molecules/text-field/default';
import DatePickerDefault from '../../components/molecules/date-picker/default';
import SelectDefault from '../../components/molecules/select/default';
import SearchSelect from '../../components/molecules/select/search-select';
import OfficialStructureTable from '../../components/organism/forms/user-register/official-structures';
import { CardWithHeader } from '../../components/atoms/card/with-header';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ListOfShareholdersTable from '../../components/organism/forms/user-register/list-of-shareholders';
import TextEditor from '../../components/molecules/text-editor/default';
import FileUpload from '../../components/molecules/file-upload/default';
import RadioButtonHorizontal from '../../components/molecules/radio/horizontal';
import dayjs from 'dayjs';

const queryOptions = [
  { label: 'General Enquiry', value: 'General Enquiry' },
  { label: 'Support Request', value: 'Support Request' },
];

const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Australia', value: 'AU' },
];

const regions = [
  { label: 'New York', value: 'NY' },
  { label: 'San Francisco', value: 'SF' },
  { label: 'London', value: 'LDN' },
  { label: 'Sydney', value: 'SYD' },
];

const facilities = [
  { label: 'Standalone', value: 'Standalone' },
  { label: 'Parent Guarantee - Written Unconditional', value: 'Parent Guarantee - Written Unconditional' },
  { label: 'Parent Guarantee - Written Conditional', value: 'Parent Guarantee - Written Conditional' },
  { label: 'Parent Guarantee - Verbal', value: 'Parent Guarantee - Verbal' },
];

// Define the validation schema with Zod
const schema = z.object({
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  query_type: z.string().min(1, 'Query Type is required'),
  birth_date: z.coerce.date().optional(),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be less than 500 characters'),
  country: z.string().min(1, 'Country is required'),
  region: z.string().min(1, 'Region is required'),
  facility: z.string().min(1, 'Facility is required'),
  swift_code: z.string().min(1, 'Swift Code is required'),
  official_structures: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      position: z.string().min(1, 'Position is required'),
      role: z.string().min(1, 'Role is required'),
      attached_appendix: z.boolean().default(false).optional(),
    })
  ),
  list_shareholders: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      shareholding: z.string().min(1, 'Shareholdings is required'),
    })
  ),
  company_overview: z.string().min(1, 'Company Overview is required'),
  files: z.array(z.any()).optional(),
});

type FormData = z.infer<typeof schema>;

interface UserProps {
  setNavState: (state: string) => void;
}

const User: React.FC<UserProps> = ({ setNavState }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      query_type: '',
      birth_date: new Date(),
      message: '',
      country: '',
      region: '',
      facility: '',
      swift_code: '',
      official_structures: [
        {
          name: '',
          position: '',
          role: '',
          attached_appendix: false,
        },
      ],
      list_shareholders: [
        {
          name: '',
          shareholding: ''
        }
      ],
      company_overview: '',
      files: []
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

  const handleFileUpload = async (files: File[]) => {
    // Simulate API call
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      // Replace with your actual API endpoint
      // await fetch("https://your-api-endpoint/upload", {
      //   method: "POST",
      //   body: formData,
      // });
    }
    // alert("Files uploaded successfully!");
  };

  const onSubmit = (data: FormData) => {
    const payloadData = {
      ...data,
      birth_date: data.birth_date ? dayjs(data.birth_date).format('DD-MM-YYYY') : null,
      register_id: '',
    };
    console.log(payloadData);
    setNavState("2");
  };

  const onError = (errors: typeof formState.errors) => {
    handleScrollToError(errors);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardWithHeader 
          icon={<TextSnippetIcon />}
          label="Identity"
          sx= {{ 
            marginBottom: '15px'
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <TextFieldDefault 
              name="first_name" 
              label="First Name"
              errors={errors?.first_name?.message} 
            />
            <TextFieldDefault 
              name="last_name" 
              label="Last Name"
              errors={errors?.last_name?.message} 
            />
          </div>
          <div className="py-2">
            <TextFieldDefault 
              name="email" 
              label="Email" 
              errors={errors?.email?.message}
            />
          </div>
          <div className="py-2 grid grid-cols-2 gap-4">
            <RadioButtonHorizontal 
              name="query_type"
              label="Query Type" 
              options={queryOptions}
              errors={errors?.query_type?.message} 
            />
            <DatePickerDefault 
              name="birth_date"
              label="Date of Birth"
              errors={errors?.birth_date?.message}
            />
          </div>
          <div className="py-2">
            <TextFieldDefault 
              name="message" 
              label="Message" 
              rows={4}
              errors={errors?.message?.message} 
            />
          </div>
          <div className="py-2 grid grid-cols-2 gap-4">
            <SelectDefault 
              name="country" 
              label="Country" 
              options={countries} 
              errors={errors.country?.message}
            />
            <SelectDefault 
              name="region" 
              label="Region" 
              options={regions} 
              errors={errors.region?.message}
            />
          </div>
          <div className="py-2 grid grid-cols-2 gap-4">
            <SearchSelect
              name="facility"
              label="Facility"
              options={facilities}
              errors={errors.facility?.message}
              placeholder="Select or search for a facility"
            />
            <TextFieldDefault 
              name="swift_code" 
              label="Swift Code"
              errors={errors?.swift_code?.message} 
            />
          </div>
        </CardWithHeader>
        <CardWithHeader 
          icon={<TextSnippetIcon />}
          label="Official Structures"
          sx= {{ 
            marginBottom: '15px'
          }}
        >
          <div className="py-4">
            <OfficialStructureTable name="official_structures" />
          </div>
        </CardWithHeader>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="List of Shareholders"
          sx= {{
            marginBottom: '15px'
          }}
        >
          <div className="py-4">
            <ListOfShareholdersTable name="list_shareholders" />
          </div>
        </CardWithHeader>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Company Overview"
          sx= {{
            marginBottom: '15px'
          }}
        >
          <TextEditor
            name="company_overview"
            placeholder="Enter your text here..."
            errors={errors.company_overview?.message}
          />
        </CardWithHeader>
        <CardWithHeader
          icon={<TextSnippetIcon />}
          label="Attachments"
          sx= {{
            marginBottom: '15px'
          }}
        >
          <FileUpload 
            name="files"
            accept=".pdf,.docx,image/*"
            multiple={true}
            maxSizeMB={10}
            onSubmit={handleFileUpload}
            errors={methods.formState.errors.files?.message}
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
  );
};

export default User;
