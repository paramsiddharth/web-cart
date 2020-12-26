import { Container, Input, Box, List, ListItem, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../services/shop';

class Login extends Component {
	constructor(props) {
		super(props);

		this.handleLogin = this.handleLogin.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.verifyInput = this.verifyInput.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			user: '',
			pass: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	verifyInput() {
		if (this.state.user.length < 1) {
			toast.error('Enter the username.', { autoClose: 2000 });
			return false;
		}
		if (this.state.pass.length < 1) {
			toast.error('Enter the password.', { autoClose: 2000 });
			return false;
		}
		return true;
	}

	handleLogin() {
		if (this.verifyInput()) {
			api.getUser(this.state.user.toLowerCase(), this.state.pass)
				.then(user => {
					if (user === null)
						toast.error('User doesn\'t exist.', { autoClose: 2000 });
					else if (user === -1)
						toast.error('Wrong password.', { autoClose: 2000 });
					else
						this.props.logIn(user);
				});
		};
	}

	handleSignup() {
		if (this.verifyInput())
			api.findUser(this.state.user.toLowerCase())
				.then(user => {
					if (user !== null) {
						toast.error('User already exists.', { autoClose: 2000 });
						return;
					}
					api.registerUser(this.state.user.toLowerCase(), this.state.pass)
						.then(user => this.props.logIn(user));
				});
	}

	render() {
		if (this.props.user !== null)
			return <Redirect to='/shop' />;

		return (
			<Container maxWidth='xs' style={{
				padding: 30
			}}>
				<ToastContainer />
				<Box>
					<h1>Login/Signup</h1>
					<form onSubmit={e => e.preventDefault()}>
						<List>
							<ListItem>
								<Input fullWidth type='text' name='user' required placeholder='Username' onChange={this.handleChange} value={this.state.user} />
							</ListItem>
							<ListItem>
								<Input fullWidth type='password' name='pass' required placeholder='Password' onChange={this.handleChange} value={this.state.pass} />
							</ListItem>
							<ListItem>
								<Button color='primary' variant='contained' onClick={this.handleLogin}><i className='fa fa-sm fa-unlock'></i>&nbsp;&nbsp;Login</Button>
								<span style={{ flex: 1 }}></span>
								<Button color='primary' variant='contained' onClick={this.handleSignup}><i className='fa fa-sm fa-gear'></i>&nbsp;&nbsp;Signup</Button>
							</ListItem>
						</List>
					</form>
				</Box>
			</Container>
		);
	}
}

export default Login;