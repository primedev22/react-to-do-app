import { useState } from "react";

const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (event: any) => {
      setInputValue(event.target.value);
    },
    clearInput: () => setInputValue("")
  };
};

export default useInputValue;
