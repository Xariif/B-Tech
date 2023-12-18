import { useEffect, useState } from "react";
import Admin from "../pages/Admin";
import { useNotification } from "../hooks/useNotification";
import useService from "../../services/users/useService";
import auth0Service from "../../services/auth0/useService";
import NotFound from "../pages/NotFound";
import useError from "../hooks/useError";

export default function AdminWrapper() {
  const [users, setUsers] = useState();

  const { setLoader } = useNotification();
  const { handleError } = useError();

  const userService = useService();
  const auth0 = auth0Service();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      userService
        .GetAllUsers()
        .then((response) => {
          Promise.all(
            response.map((user) =>
              auth0.GetUserRoles({ auth0Id: user.auth0Id }),
            ),
          ).then((roles) => {
            const usersWithRoles = response.map((user, index) => ({
              ...user,
              roles: roles[index],
            }));

            setUsers(usersWithRoles);
          });
        })
        .catch((error) => {
          handleError(error);
          setUsers(false);
        })
        .finally(() => {
          setLoader(false);
        });
    }, 2000);
  }, []);

  if (users === undefined) return null;
  if (users === false) return <NotFound />;
  return <Admin users={users} />;
}
