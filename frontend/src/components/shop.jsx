import { Box, Container, Typography, ButtonGroup, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/shop';

class Shop extends Component {
	constructor(props) {
		super(props);

		this.loadItems = this.loadItems.bind(this);
		this.countItem = this.countItem.bind(this);
		this.incrementItem = this.incrementItem.bind(this);
		this.decrementItem = this.decrementItem.bind(this);

		this.state = {
			items: []
		};

		this.loadItems();
	}

	loadItems() {
		api.getItems()
			.then(items => {
				this.setState({ items: items });
			});
	}

	countItem(id) {
		for (const item of this.props.user.cart) {
			if (item[0] === id)
				return item[1];
		}
		return 0;
	}

	incrementItem(id) {
		let userCopy = { ...this.props.user };
		for (let i = 0; i < userCopy.cart.length; i++) {
			if (userCopy.cart[i][0] === id) {
				userCopy.cart[i][1]++;
				api.updateUser(userCopy.id, userCopy)
					.then(resp => this.props.setUser(resp.data));
				return;
			}
		}
		userCopy.cart.push([id, 1]);
		api.updateUser(userCopy.id, userCopy)
			.then(resp => this.props.setUser(resp.data));
	}

	decrementItem(id) {
		let userCopy = { ...this.props.user };
		for (let i = 0; i < userCopy.cart.length; i++) {
			if (userCopy.cart[i][0] === id) {
				if (userCopy.cart[i][1] <= 1) {
					userCopy.cart.splice(i, 1);
				} else {
					userCopy.cart[i][1]--;
				}
				api.updateUser(userCopy.id, userCopy)
					.then(resp => this.props.setUser(resp.data));
				return;
			}
		}
	}

	render() {
		if (this.props.user === null)
			return <Redirect to='/login' />;

		const items = this.state.items.map((item, i) => {
			return <div className='col-12 col-md-4 mb-3 text-center text-md-left' key={i}>
				<img style={{
					height: 130,
					width: 130,
					borderRadius: 50,
					border: '1px solid black'
				}} src={`${api.apiUrl}/static/${item.img}`} alt={item.name} />
				<Typography variant='h4'>
					{ item.name }
				</Typography>
				<Typography variant='h6'>
					₹{ item.price.toFixed(2) }
				</Typography>
				<div>
					In cart: { this.countItem(item.id) }
				</div>
				<ButtonGroup variant='contained'>
					<Button onClick={() => this.incrementItem(item.id)}>+</Button>
					<Button onClick={() => this.decrementItem(item.id)}>-</Button>
				</ButtonGroup>
			</div>
		});

		return (
			<Container maxWidth='md' style={{ padding: 7, paddingBottom: 60 }}>
				<h1 className='text-center text-md-left mb-4'>Shop</h1>
				<Box className='container-fluid'>
					<div className='row'>
						{ items }
					</div>
				</Box>
			</Container>
		);
	}
}

export default Shop;