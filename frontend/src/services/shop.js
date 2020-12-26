import axios from 'axios';
import md5 from 'md5';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = {
	apiUrl,
	getItems: () => axios.get(`${apiUrl}/items`)
		.then(resp => resp.data ? resp.data : null),
	getUser: (name, pw) => axios.get(`${apiUrl}/users`)
		.then(resp => resp.data)
		.then(users => users.filter(user => user.username === name))
		.then(users => users.length > 0 ? users[0] : null)
		.then(user => {
			if (user === null)
				return user;
			
			if (user.password === md5(pw))
				return user;
			
			return -1;
		}),
	updateUser: (id, obj) => axios.put(`${apiUrl}/users/${id}`, obj),
	findUser: (name, pw) => axios.get(`${apiUrl}/users`)
		.then(resp => resp.data)
		.then(users => users.filter(user => user.username === name))
		.then(users => users.length > 0 ? users[0] : null),
	registerUser: (user, pass) => axios.post(`${apiUrl}/users`, {
			username: user,
			password: md5(pass),
			cart: []
		}).then(resp => resp.data)
};

export default api;