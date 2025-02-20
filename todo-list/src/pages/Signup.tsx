import { A, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { createForm, email, minLength, required } from '@modular-forms/solid';
import { AxiosApi } from "../services/axiosApi";
import toast from 'solid-toast';
import { useUserContext } from "../context/User";
import { FormSubmit, TextInput } from "../components";
import logo from "../assets/images/logo.svg";

type SignForm = {
  username: string,
  email: string;
  password: string;
};

const Signup: Component = () => {
  const [loginForm, { Form, Field }] = createForm<SignForm>();
  const navigate = useNavigate();

  const handleSignin = async (props: SignForm) => {
    const [user] = useUserContext();
    if (user()) {
      toast.success("you are already logged in", { duration: 3500, position: "bottom-right", className: "mb-8 me-4" });
      navigate("/", { replace: true });
      return;
    }
    try {
      const result = await AxiosApi.post("/auth/signup", props);
      if (result.data && result.status === 201) {
        navigate("/login", { replace: true });
        toast.success(result.data.message, { duration: 3500, position: "bottom-right", className: "mb-8 me-4" });
      }
    } catch (error: any) {
      console.log("Signup Failed: ", error.response.data.error);
      toast.error(error.response?.data?.error || "An error occurred while signup.", { duration: 3500, position: "bottom-right", className: "mb-8 me-4" });
    }
  }

  return (
    <div class="d-d-flex justify-content-centerflex-column">
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
              <h2 class="h2 text-center mb-4">Create new account</h2>
              <Form onSubmit={(values) => handleSignin(values)}>
                <Field
                  name="username"
                  validate={[
                    required('Please enter your username.'),
                    minLength(3, 'User name must have 3 characters or more.')
                  ]}
                >
                  {(field, props) => (
                    <TextInput
                      {...props}
                      formElement="input"
                      value={field.value}
                      error={field.error}
                      type="text"
                      label="User Name"
                      placeholder="John Doe"
                      required
                    />
                  )}
                </Field>
                <Field
                  name="email"
                  validate={[
                    required('Please enter your email.'),
                    email('The email address is badly formatted.')
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
                    minLength(8, 'Your password must have 8 characters or more.')
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
                <FormSubmit formName="Sign Up" close="Reset" of={loginForm} />
              </Form>
            </div>
          </div>
          <div class="text-center text-secondary mt-3">
            Already have account?{" "}
            <A href="/login" tabIndex={-1}>
              Login
            </A>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signup