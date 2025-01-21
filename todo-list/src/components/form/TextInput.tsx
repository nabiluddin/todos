import { Component, createEffect, createMemo, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type TextInputProps = {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date';
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  formElement: 'input' | 'textarea'
  name: string;
  value: string | number | undefined;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: string;
  class?: string
  row?: string
};

const TextInput: Component<TextInputProps> = (props) => {
  const [, inputProps] = splitProps(props, [
    'value',
    'label',
    'error',
    'class'
  ]);
  createEffect(() => {
    // console.log(props.name, ": ", props.value);
  })
  const getValue = createMemo((): string | number | undefined => {
    if (props.value === undefined || Number.isNaN(props.value)) {
      return '';
    }
    if (props.type === "date") {
      const date = new Date(props.value);
      if (!Number.isNaN(date.getTime())) {
        return date.toISOString().split('T', 1)[0];
      }
    }
    return props.value;
  });

  return (
    <div>
      <label
        class={`form-label ${props?.required && "required"} `}
        for={props.name}
      >
        {props.label}{' '}
      </label>
      <Dynamic
        component={props.formElement}
        {...inputProps}
        class={`form-control ${props.class}`}
        id={props.name}
        value={getValue()}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        rows={props.row}
        autocomplete={props.type === "password" ? "on" : ""}
      />
      <div id={`${props.name}-error`} class="invalid-feedback d-flex">{props.error}</div>
    </div>
  );
}
export default TextInput