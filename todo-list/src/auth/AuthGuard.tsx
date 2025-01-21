import { Component, ParentProps, Show, createResource, createEffect, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useUserContext } from "../context/User";
import { AxiosApi } from "../services/axiosApi";

const isAuthenticated = async () => {
  try {
    const result = await AxiosApi.get("/auth/check-auth");
    return result.status === 200;
  } catch (error) {
    console.log("check-auth Failed: ", error);
    return false;
  }
}

const AuthGuard: Component<ParentProps> = (props) => {
  const navigate = useNavigate();
  const [user] = useUserContext();
  const [isAuth] = createResource(isAuthenticated);

  createEffect(() => {
    if (isAuth.state === "ready" && !isAuth() || (user() === undefined)) {
      navigate("/login");
    }
  })

  return (
    <Show when={isAuth.state === "ready" && isAuth()}>
      {props.children}
    </Show>
  )
};

export default AuthGuard
