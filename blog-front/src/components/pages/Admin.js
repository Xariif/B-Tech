import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../services/UserService";
import { Table } from "@mui/material";

export default function Admin() {
	const userService = UserService();

	const [users, setUsers] = useState([]);

	useEffect(() => {}, []);

	return (
		<>
			Panel admina - w przygotowaniu akceptacja <br></br>
			postów zarządzanie postami itp.
			<Table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Email</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user) => (
							<tr key={user.userId}>
								<td>{user.userId}</td>
								<td>{user.email}</td>
								<td>{user.name}</td>
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
}
