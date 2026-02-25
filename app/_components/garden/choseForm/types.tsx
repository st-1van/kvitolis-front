export type Alley = {
  slug: string;
  alleyName: string;
};

export type FormData = {
  alley: string;
  chosenPersons: string[];
  name: string;
  email: string;
  phone: string;
};

export type Errors = {
  alley?: string;
  name?: string;
  email?: string;
  phone?: string;
  chosenPersons?: string;
};

export type AlleySelectProps = {
  AlleyData: Alley[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  submitted: boolean;
  errors: Errors;
  handleAlleyChange: (newName: string) => void;
  disabled: boolean;
};

