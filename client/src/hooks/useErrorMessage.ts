import { useState } from "react";

const useErrorMessage = (initialValue = "") => {
  const [message, setMessage] = useState(initialValue);

  return {
    message,
    setMessage,
    clearMessage: () => setMessage(""),
  };
};

export default useErrorMessage;
