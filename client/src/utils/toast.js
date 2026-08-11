import toast from "react-hot-toast";

export const showSuccess = (message) => {

    return toast.success(message);

};

export const showError = (message) => {

    return toast.error(message);

};

export const showLoading = (message) => {

    return toast.loading(message);

};

export const hideLoading = (toastId) => {

    toast.dismiss(toastId);

};

export const showInfo = (message) => {

    return toast(message);

};