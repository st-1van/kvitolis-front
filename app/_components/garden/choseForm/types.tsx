export type Alley = {
  slug: string;
  title: string;
};

export type FormData = {
  alley: string;
  personList: string[];
  name: string;
  email: string;
  phone: string;
  treeNumber: string;
};

export type Errors = {
  alley?: string;
  treeNumber?: string;
  name?: string;
  email?: string;
  phone?: string;
  personList?: string;
};

export type AlleySelectProps = {
  AlleyData: Alley[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  submitted: boolean;
  errors: Errors;
  handleAlleyChange: (newName: string) => void;
};

