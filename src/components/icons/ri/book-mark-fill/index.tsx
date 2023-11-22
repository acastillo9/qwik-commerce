import { type QwikIntrinsicElements } from "@builder.io/qwik";

export function RiBookMarkFill(
  props: QwikIntrinsicElements["svg"],
  key: string,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        d="M20 22H6.5A3.5 3.5 0 0 1 3 18.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Zm-1-2v-3H6.5a1.5 1.5 0 0 0 0 3H19ZM10 4v8l3.5-2l3.5 2V4h-7Z"
      ></path>
    </svg>
  );
}
