import { component$, $ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import {
  formAction$,
  valiForm$,
  useForm,
  type InitialValues,
  type SubmitHandler,
} from "@modular-forms/qwik";
import { type Input, email, minLength, object, string } from "valibot";
import Navbar from "~/components/navbar";
import { login } from "~/server/auth/login";

const LoginSchema = object({
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string([
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});

type LoginForm = Input<typeof LoginSchema>;
type ResponseData = {
  userId: string;
};

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<LoginForm, ResponseData>(
  async (values) => {
    const userId = await login(values.email, values.password);
    return {
      status: "success",
      message: "You are now logged in.",
      data: { userId },
    };
  },
  valiForm$(LoginSchema),
);

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
  });

  const handleSubmit: SubmitHandler<LoginForm> = $((values, event) => {
    // Runs on client
    console.log(values);
  });

  return (
    <>
      <Navbar />
      <div class="w-full h-screen bg-gray-50 text-black">
        <div class="flex flex-col items-center  text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div class="w-full bg-white text-black rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <Form onSubmit$={handleSubmit} class="space-y-4 md:space-y-6">
                <div class="text-left">
                  <Field name="email">
                    {(field, props) => (
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Your email
                        </label>
                        <input
                          {...props}
                          type="email"
                          id="email"
                          value={field.value}
                          class="bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 "
                          placeholder="name@company.com"
                        />
                        {field.error && (
                          <p class="text-sm text-red-500">{field.error}</p>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div class="text-left">
                  <Field name="password">
                    {(field, props) => (
                      <div>
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Password
                        </label>
                        <input
                          {...props}
                          type="password"
                          id="password"
                          value={field.value}
                          placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                        />
                        {field.error && (
                          <p class="text-sm text-red-500">{field.error}</p>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        checked
                        class="w-4 h-4 bg-white  border border-gray-300 rounded focus:ring-3 focus:ring-orange-300  "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-gray-500  ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    href="/auth/reset"
                    class="text-sm font-medium text-orange-600 hover:underline "
                  >
                    Forgot password?
                  </Link>
                </div>
                {loginForm.submitting ? (
                  <button
                    type="button"
                    class="w-full flex items-center justify-center text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  >
                    {/*
                    <QTailSpin
                      height="20"
                      width="20"
                      color="white"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                    */}
                  </button>
                ) : (
                  <button
                    type="submit"
                    class="w-full text-white bg-orange-600 da hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  >
                    Sign in
                  </button>
                )}

                <p class="text-sm text-black ">
                  Don’t have an account yet?{" "}
                  <Link
                    href={"/auth/register"}
                    class="font-medium text-orange-600 hover:underline "
                  >
                    Sign up
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
