import { useNavigate } from "@solidjs/router";
import { useUserContext } from "../../context/User"

const Logout = () => {
  const [, setUser] = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      id: null,
      username: null,
      email: null
    });
    document.cookie = "user=;max-age=0"
    navigate("/login");
  }
  return (
    <button onClick={handleLogout} class="btn btn-danger w-100">Logout</button>
  )
}
export default Logout