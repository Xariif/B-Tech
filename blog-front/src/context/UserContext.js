import { createContext, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { useMediaQuery } from "@mui/material";
import Loading from "../components/ui/Loading";

const UserContext = createContext();

function UserProvider({ children }) {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [user, setUser] = useState(null);

  useMemo(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        const decoded = jwtDecode(token);
        setUser(decoded);
      });
    }
  }, [isAuthenticated]);

  const value = useMemo(() => ({ user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
