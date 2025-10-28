// src/services/notification.service.js
import { useToast } from "../contexts/ToastContext";

export const useNotification = () => {
  const { addToast } = useToast();

  const notifySuccess = (message) => {
    addToast({ type: "success", message });
  };

  const notifyError = (message) => {
    addToast({ type: "error", message });
  };

  const notifyInfo = (message) => {
    addToast({ type: "info", message });
  };

  return { notifySuccess, notifyError, notifyInfo };
};
