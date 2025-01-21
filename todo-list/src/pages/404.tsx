import { A } from "@solidjs/router";
import { IconArrowLeft } from "@tabler/icons-solidjs";
import notFound from "../assets/images/not-found.svg"

export default function NotFound() {
  return (
    <main class="page page-center">
      <div class="container-tight py-4">
        <div class="empty">
          <div class="empty-img">
            <img src={notFound} alt="Not Found" width={100} height={100} />
          </div>
          <p class="empty-title">Oops… You just found an error page</p>
          <p class="empty-subtitle text-secondary">
            We are sorry but the page you are looking for was not found
          </p>
          <div class="empty-action">
            <A href="/" class="btn btn-primary">
              <IconArrowLeft size={22} />
              Take me home
            </A>
          </div>
        </div>
      </div>
    </main>
  );
}
