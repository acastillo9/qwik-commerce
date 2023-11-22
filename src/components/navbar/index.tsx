import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const scrolled = useSignal(false);
  const nav = useNavigate();

  useVisibleTask$(() => {
    window.onscroll = () => {
      scrolled.value = window.scrollY < 30 ? false : true;
      return () => (window.onscroll = null);
    };
  });

  return (
    <div
      class={`navbar ${
        scrolled.value ? "bg-white/95  " : "bg-transparent"
      }  fixed text-white top-0 left-0 z-50`}
    >
      <div class="navbar-start">
        <div class="dropdown">
          <label tabIndex={0} class="btn btn-active text-white btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            class="menu menu-compact dropdown-content mt-3 p-2 shadow text-black bg-gray-50 rounded-box w-52"
          >
            <li>
              <Link href={"/"}>Homepage</Link>
            </li>
            <li>
              <Link href={"/"}>Shop</Link>
            </li>
            <li>
              <Link href={"/order/view-orders"}>My Orders</Link>
            </li>
            <li>
              <Link href={"/Dashboard"}>Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-end">
        <div class="flex-none">
          <button
            onClick$={() => nav("/auth/login")}
            class="btn text-white mx-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
});
