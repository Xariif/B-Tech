import React, { createContext, useContext, useState } from "react";
import { useNotification } from "../components/hooks/useNotification";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const notification = useNotification();

  const handleError = (newError) => {
    setError(newError);

    switch (newError.code) {
      case 401:
        console.log("401");
        break;
      case 404:
        console.log("404");
        break;
      case "ERR_BAD_RESPONSE":
        console.log("ERR_BAD_RESPONSE");
        break;
      case 400:
        console.log("400");
        break;
      case 403:
        console.log("403");
        break;

      case "ERR_BAD_REQUEST":
        // notification.showToast(newError.message, "error");
        break;

      case "ERR_NETWORK":
        //  notification.showToast(newError.message, "error");
        break;

      default:
        console.log(newError);
        notification.showToast(
          "Uexpected error occurs, please contact support",
          "info",
        );
        break;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const contextValue = React.useMemo(
    () => ({ error, handleError, clearError }),
    [error, handleError, clearError],
  );

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorContext;
