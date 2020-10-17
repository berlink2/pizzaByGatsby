import { useState } from "react";

export interface Props {
  [value: string]: string;
}
interface Return {
  values: Props;
  updateValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useForm = (defaults: Props): Return => {
  const [values, setValues] = useState<Props>(defaults);

  function updateValue(e: React.ChangeEvent<HTMLInputElement>): void {
    const value: string = e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
};

export default useForm;
