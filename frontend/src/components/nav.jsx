import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
	render() {
		return (
			<div>
				<AppBar position='static'>
					<Toolbar>
						<Typography variant='h5'>
							<a component={React.Fragment} href='./' className='link-unstyled'>
								<i style={{ color: '#69f0ae' }} className='fa fa-lg fa-cutlery' />&nbsp;&nbsp;
								Food Shop
							</a>
						</Typography>
						<span style={{ flex: 0.02 }}></span>
					</Toolbar>
				</AppBar>
				<br/>
				<div style={{ textAlign: 'center' }}>
					{
						this.props.user === null
						? <Button component={Link} to='/login' variant='contained'>Login/Signup</Button>
						: <Button component={Link} to='/login' onClick={this.props.logOut} variant='contained'>Logout ({this.props.user.username})</Button>
					}
					&nbsp;&nbsp;
					<Button component={Link} to='/shop' variant='contained'>Shop</Button>&nbsp;&nbsp;
					<Button component={Link} to='/cart' variant='contained'>Cart</Button>
				</div>
			</div>
		);
	}
}

export default NavBar;