import { Component } from "solid-js";

const Loading: Component = () => {
  return (
    <div class="page-wrapper min-vh-100  d-flex justify-content-center align-items-center">
      <div class="page-body h-100">
        <div class="container-xl d-flex justify-content-center align-items-center gap-4">
          <div style="width: 5rem; height: 5rem;" class="spinner-grow text-info fw-bolder"></div>
          <h1>Loading...</h1>
        </div>
      </div>
    </div>
  )
}

export default Loading;