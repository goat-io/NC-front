import { toast } from "react-toastify";

export const notifyError = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
  });
};
