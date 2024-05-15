import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
    let message: string;
    if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === "string") {
        message = error;
    } else {
        message = "An error ocurred";
    }
    toast.error(message);
}