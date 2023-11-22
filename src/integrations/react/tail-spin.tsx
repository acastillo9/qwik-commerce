import { qwikify$ } from "@builder.io/qwik-react";
import { TailSpin } from "react-loader-spinner";

export const QTailSpin = qwikify$(TailSpin, { eagerness: "hover" });
