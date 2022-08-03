import { toast } from "react-toastify";

const useAlert = () => {
    const optionMessage = {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
    };

    const alertError = (message) => {
        toast.error(message, optionMessage);
    };
    const alertSuccess = (message) => {
        toast.success(message, optionMessage);
    };

    return { alertError, alertSuccess };
};

export default useAlert;
