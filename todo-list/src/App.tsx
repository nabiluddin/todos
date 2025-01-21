import { Route, Router } from "@solidjs/router";
import { ErrorBoundary, lazy, Suspense } from "solid-js"
import AuthGuard from "./auth/AuthGuard";
import { UserContextProvider } from "./context/User";
import Loading from "./components/common/Loading";
import routes from "./data/routes.json"
import { Toaster } from 'solid-toast';
import ErrorFallback from "./pages/Error";

const components = {
  Home: lazy(() => import("./pages/Home")),
  Login: lazy(() => import("./pages/Login")),
  Signup: lazy(() => import("./pages/Signup")),
  NotFound: lazy(() => import("./pages/404")),
}

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={() => <ErrorFallback />}>
        <UserContextProvider>
          <Toaster />
          <Router>
            <Route path="/login" component={components.Login} />
            <Route path="/signup" component={components.Signup} />
            <Route path="/" component={AuthGuard} >
              {routes.map((route) =>
                <Route
                  path={route.path}
                  component={components[route.component as keyof typeof components]}
                />
              )}
            </Route>
            <Route path="*" component={components.NotFound} />
          </Router>
        </UserContextProvider>
      </ErrorBoundary>
    </Suspense>
  )
};

export default App