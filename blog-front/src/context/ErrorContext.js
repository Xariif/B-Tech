import React, { createContext, useContext, useState } from "react";
import { useNotification } from "../components/hooks/useNotification";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const notification = useNotification();

  const handleError = (error) => {
    setError(error);

    // handle error here

    switch (error.code) {
      case 401:
        console.log("401");
        break;
      case 404:
        console.log("404");
        break;
      case 500:
        console.log("500");
        break;
      case 400:
        console.log("400");
        break;
      case 403:
        console.log("403");
        break;

      case "ERR_NETWORK":
        console.log(error);
        notification.showToast(error.message, "error");

        break;

      default:
        console.log("default");
        break;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, handleError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorContext;
