import { Component, createEffect, splitProps } from 'solid-js';

type CheckboxProps = {
  name: string;
  value?: string;
  checked?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  class?: string;
};

const Checkbox: Component<CheckboxProps> = (props) => {
  const [, inputProps] = splitProps(props, [
    'value',
    'label',
    'error',
    'class',
  ]);
  createEffect(() => {
    // console.log(props.name, ": ", props.value);
  })
  return (
    <div class="">
      <label class={`form-check mb-0 ${props?.required && "required"} ${props.class}`}>
        <input
          {...inputProps}
          class="form-check-input"
          type="checkbox"
          id={props.name}
          value={props.value || ''}
          checked={props.checked}
          aria-invalid={!!props.error}
          aria-errormessage={`${props.name}-error`}
        />
        <span id={`${props.name}-error`} class="form-check-label">{props.label}</span>
      </label>
    </div>
  );
}
export default Checkbox
