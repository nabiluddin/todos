/* @refresh reload */
import { render } from 'solid-js/web';
import "./assets/styles/tabler.min.css"
import "./assets/styles/customStyles.css"
import "./assets/lib/tabler.min.js"
import App from './App';
import 'solid-devtools'

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}
if(localStorage.getItem("tablerTheme")){
  document.body.setAttribute('data-bs-theme', localStorage.getItem("tablerTheme") as string)
} else {
  localStorage.setItem("tablerTheme", 'light')
  document.body.setAttribute('data-bs-theme', 'light')
}
render(() => <App /> , root!);
