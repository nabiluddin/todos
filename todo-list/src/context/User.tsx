import { createContext, ParentProps, useContext } from "solid-js";
import CryptoJs from "crypto-js";

type AuthUser = {
  id: string | null;
  username: string | null;
  email: string | null;
};

type UserContextType = [
  () => AuthUser | undefined,
  (data: AuthUser) => void
];

const UserContext = createContext<UserContextType>();

const decryptCookieValue = (value: string): AuthUser | undefined => {
  try {
    const bytes = CryptoJs.AES.decrypt(value, import.meta.env.VITE_ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJs.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.warn("Failed to get user: ", error);
    return undefined;
  }
};
const getCookie = (): AuthUser | undefined => {
  const cookies = document.cookie.split("; ");
  const userCookie = cookies.find((cookie) => cookie.startsWith("user="));
  if (userCookie) {
    const value = userCookie.split("=")[1];
    return decryptCookieValue(value);
  }
  return undefined;
};
const setEncryptedUserCookie = (data: AuthUser): void => {
  try {
    const encryptedValue = CryptoJs.AES.encrypt(
      JSON.stringify(data),
      import.meta.env.VITE_ENCRYPTION_KEY
    ).toString();
    document.cookie = `user=${encryptedValue}; path=/; max-age=${import.meta.env.VITE_SESSION_DURATION};`;
  } catch {
    console.error("Failed to encrypt and set the cookie.");
  }
};

export const UserContextProvider = (props: ParentProps) => {
  return (
    <UserContext.Provider value={[getCookie, setEncryptedUserCookie]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider.");
  }
  return context;
};
