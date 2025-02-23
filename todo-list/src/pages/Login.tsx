import { A, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { useUserContext } from "../context/User";
import { createForm, email, minLength, required } from '@modular-forms/solid';
import { AxiosApi } from "../services/axiosApi";
import { AxiosResponse } from "axios";
import toast from 'solid-toast';
import { FormSubmit, TextInput } from "../components";
import logo from "../assets/images/logo.svg";

type LoginForm = {
  email: string;
  password: string;
};

const Login: Component = () => {
  const [loginForm, { Form, Field }] = createForm<LoginForm>();
  const [user, setUser] = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (props: LoginForm) => {
    if (user()) {
      toast.success("You are already logged in. \nFirst logout current user then log in again!", { duration: 5000, position: "bottom-right", className: "mb-4 me-4" });
      navigate("/", { replace: true });
      return;
    }
    try {
      const result: AxiosResponse = await AxiosApi.post("/auth/login", props)
      setUser(result.data.user)
      navigate("/", { replace: true });
      toast.success(result.data.message, { duration: 3500, position: "bottom-right", className: "mb-4 me-4" });
    } catch (error: any) {
      console.log("Login Failed: ", error.response.data.error);
      toast.error(error.response?.data?.error || "An error occurred while login.", { duration: 3500, position: "bottom-right", className: "mb-4 me-4" });
    }
  }

  return (
    <div id="login" class="d-flex flex-column">
      <div class="page page-center">
        <div class="container container-tight py-4">
          <div class="text-center mb-4">
            <A href="/" class="d-flex justify-content-center align-items-center gap-1">
              <span><img src={logo} width="28" alt="logo" /></span>
              <span><h1 class="mt-3 text-primary">Todos</h1></span>
            </A>
          </div>
          <div class="card card-md">
            <div class="card-body">
              <h2 class="h2 text-center mb-4">Login to your account</h2>
              <Form onSubmit={(values) => handleLogin(values)}>
                <Field
                  name="email"
                  validate={[
                    required('Please enter your email.'),
                    email('The email address is badly formatted.'),
                  ]}
                >
                  {(field, props) => (
                    <TextInput
                      {...props}
                      formElement="input"
                      value={field.value}
                      error={field.error}
                      type="email"
                      label="Email"
                      placeholder="example@email.com"
                      required
                    />
                  )}
                </Field>
                <Field
                  name="password"
                  validate={[
                    required('Please enter your password.'),
                    minLength(8, 'You password must have 8 characters or more.'),
                  ]}
                >
                  {(field, props) => (
                    <TextInput
                      {...props}
                      formElement="input"
                      value={field.value}
                      error={field.error}
                      type="password"
                      label="Password"
                      placeholder="********"
                      required
                    />
                  )}
                </Field>
                <FormSubmit formName="Login" close="Reset" of={loginForm} />
              </Form>
            </div>
          </div>
          <div class="text-center text-secondary mt-3">
            Don't have account yet?{" "}
            <A href="/signup" tabIndex={-1}>
              Sign up
            </A>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login