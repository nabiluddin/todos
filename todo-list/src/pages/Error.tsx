import { IconArrowLeft } from "@tabler/icons-solidjs"

const ErrorFallback = () => {
  return (
    <main class="page page-center">
      <div class="container-tight py-4">
        <div class="empty">
          <div class="empty-header">500</div>
          <p class="empty-title">Oops… You just found an error page</p>
          <p class="empty-subtitle text-secondary">
            We are sorry but our server encountered an internal error
          </p>
          <div class="empty-action">
            <a href="/" class="btn btn-primary">
              <IconArrowLeft size={22} />
              Take me home
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
export default ErrorFallback