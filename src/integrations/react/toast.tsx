import { qwikify$ } from "@builder.io/qwik-react";
import { ToastContainer, toast } from "react-toastify";

export const QToastContainer = qwikify$(ToastContainer);
export const qToast = toast;
