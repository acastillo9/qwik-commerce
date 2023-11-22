import { component$ } from "@builder.io/qwik";
import IntroImage from "~/media/intro.jpg?jsx";
import IntroMobImage from "~/media/mob-intro.jpg?jsx";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="w-full h-screen relative">
      <IntroImage class="w-full h-full object-cover hidden md:block" />
      <div class="w-full flex-col md:hidden h-full relative flex items-center px-3 justify-center text-center">
        <IntroMobImage
          class="absolute w-full h-full object-cover"
          alt="no image"
        />

        <h1 class="mb-2 text-xl text-white/90 z-10 font-semibold ">
          Work hard, lift harder - Get fit, feel fitter with our gear!
        </h1>
        <Link
          href={"/#my-Categories"}
          class="btn btn-ghost border border-orange-600 text-white/90 hover:bg-orange-600  z-40"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
});
