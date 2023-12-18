import { Table } from "@mui/material";

export default function Admin({ users }) {
  return (
    <>
      Panel admina - w przygotowaniu akceptacja <br />
      postów zarządzanie postami itp.
      <Table>
        <thead>
          <tr>
            <th>Auth0 Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {users &&
            users.map((user) => (
              <tr key={user.auth0Id}>
                <td>{user.auth0Id}</td>
                <td>{user.email}</td>
                <td>{`${user.name} ${user.surname}`}</td>
                <td>
                  {user.roles.map((role) => (
                    <li key={role.id}>
                      {role.name} <br />
                    </li>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
