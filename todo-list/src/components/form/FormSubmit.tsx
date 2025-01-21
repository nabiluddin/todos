import { FormStore, reset } from "@modular-forms/solid"
import { Component } from "solid-js"

const FormSubmit: Component<{ formName: string, close?: string, of: FormStore<any, any>, isSubmitting?: boolean, isInvalid?: boolean }> = (props) => {
  return (
    <div class={`modal-footer justify-content-between ${props.close && "flex-row-reverse"}`}>
      <button
        type="button"
        class={`btn btn-primary ${!props.close && "btn-link link-secondary"}`}
        onClick={() => reset(props.of)}
        data-bs-dismiss={!props.close && "modal"}
        tabIndex="-1"
      >
        {props.close || "Cancel"}
      </button>
      <button type="submit" class="btn btn-primary"  >
        {
          props.isSubmitting ?
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            :
            props.formName
        }
      </button>
    </div>
  )
}
export default FormSubmit