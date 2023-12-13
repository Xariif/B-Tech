import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "@mui/material";
import useService from "../../services/users/useService";
import auth0Service from "../../services/auth0/useService";
import { useNotification } from "../hooks/useNotification";

export default function Admin() {
	const [users, setUsers] = useState([]);

	const notification = useNotification();

	const userService = useService();
	const auth0 = auth0Service();

	useEffect(() => {
		notification.setLoader(true);
		setTimeout(() => {
			userService
				.GetAllUsers()
				.then((response) => {
					Promise.all(
						response.map((user) =>
							auth0.GetUserRoles({ auth0Id: user.auth0Id })
						)
					).then((roles) => {
						const usersWithRoles = response.map((user, index) => ({
							...user,
							roles: roles[index],
						}));

						setUsers(usersWithRoles);
					});
				})
				.finally(() => {
					notification.setLoader(false);
				});
		}, 2000);
	}, []);

	if (users.length === 0) {
		return null;
	}

	return (
		<>
			Panel admina - w przygotowaniu akceptacja <br></br>
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
								<td>{user.name + " " + user.surname}</td>
								<td>
									{user.roles.map((role, index) => (
										<li key={index}>
											{role.name} <br></br>
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
