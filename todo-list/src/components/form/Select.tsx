import { Component, createEffect, For, JSX, splitProps } from 'solid-js';

type SelectProps = {
  options: { label: string; value: string }[];
  onInput?: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur?: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  name: string;
  value: string | string[] | undefined;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: string;
  class?: string;
};

const Select: Component<SelectProps> = (props) => {
  const [, selectProps] = splitProps(props, [
    'value',
    'options',
    'label',
    'error',
    'class',
  ]);
  createEffect(() => {
    // console.log(props.name,": ", props.value);
  })

  return (
    <div>
      <label
        class={`form-label ${props?.required && 'required'} ${props.class} `}
        for={props.name}
      >
        {props.label}{' '}
      </label>
      <select
        {...selectProps}
        class={`form-control ${props.class}`}
        id={props.name}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      >
        <option value="" hidden selected>
          {props.placeholder}
        </option>
        <For each={props.options}>
          {({ label, value }) => (
            <option value={value} selected={value === props.value}>
              {label}
            </option>
          )}
        </For>
      </select>
      <div id={`${props.name}-error`} class="invalid-feedback d-flex">{props.error}</div>
    </div>
  );
}
export default Select
