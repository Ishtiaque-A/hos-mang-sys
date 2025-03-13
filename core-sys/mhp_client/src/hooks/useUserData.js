import { useEffect, useState } from "react";

const useUserData = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const isSuperAdmin =
      userData.user_type === "Super_Admin" || userData.user_type === "3"
        ? true
        : false;
    userData.isSuperAdmin = isSuperAdmin;
    setUser(userData);
    return () => {};
  }, []);
  return user;
};
export default useUserData;
