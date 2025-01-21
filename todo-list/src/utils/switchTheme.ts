export const switchTheme = () => {
  const currentTheme = localStorage.getItem("tablerTheme")
  if(currentTheme === 'light'){
    localStorage.setItem("tablerTheme", 'dark')
    document.body.setAttribute('data-bs-theme', 'dark')
  } else {
    localStorage.setItem("tablerTheme", 'light')
    document.body.setAttribute('data-bs-theme', 'light')
  }
}