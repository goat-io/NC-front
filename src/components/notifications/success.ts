import { toast } from "react-toastify";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
  });
};
