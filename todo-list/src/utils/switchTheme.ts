export const switchTheme = () => {
  const currentTheme = localStorage.getItem("todosTheme")
  if(currentTheme === 'light'){
    localStorage.setItem("todosTheme", 'dark')
    document.body.setAttribute('data-bs-theme', 'dark')
  } else {
    localStorage.setItem("todosTheme", 'light')
    document.body.setAttribute('data-bs-theme', 'light')
  }
}