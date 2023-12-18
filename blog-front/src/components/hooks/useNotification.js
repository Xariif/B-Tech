import { useContext } from "react";
import { ToastContext } from "../../context/NotificationContext";

export const useNotification = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export default useNotification;
