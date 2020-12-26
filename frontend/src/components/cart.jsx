import { Box, Container, Typography, Button, } from '@material-ui/core';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/shop';

class Cart extends Component {
	constructor(props) {
		super(props);

		this.removeItem = this.removeItem.bind(this);
		this.loadItems = this.loadItems.bind(this);
		this.getItem = this.getItem.bind(this);
		this.netPrice = this.netPrice.bind(this);
		this.checkout = this.checkout.bind(this);

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

	getItem(id) {
		let item = this.state.items.filter(item => item.id === id);
		if (item.length > 0)
			return item[0];
		return null;
	}

	removeItem(id) {
		let userCopy = { ...this.props.user };
		for (let i = 0; i < userCopy.cart.length; i++) {
			if (userCopy.cart[i][0] === id) {
				userCopy.cart.splice(i, 1);
				api.updateUser(userCopy.id, userCopy)
					.then(resp => this.props.setUser(resp.data));
				return;
			}
		}
	}

	netPrice() {
		let price = 0;
		for (let i = 0; i < this.props.user.cart.length; i++) {
			let item = this.getItem(this.props.user.cart[i][0]);
			if (item && item.price)
				price += item.price * this.props.user.cart[i][1];
		}
		return price;
	}

	checkout() {
		let userCopy = { ...this.props.user, cart: [] };
		api.updateUser(userCopy.id, userCopy)
			.then(resp => this.props.setUser(resp.data));
	}

	render() {
		if (this.props.user === null)
			return <Redirect to='/login' />;

		let items;
		
		if (this.props.user.cart.length > 0)
			items = this.props.user.cart.map((citem, i) => {
				let item = this.getItem(citem[0]);
				if (item === null)
					return <span key={i}></span>;
				item.count = citem[1];

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
						₹{ item.price && item.count ? (item.count * item.price).toFixed(2) : '' }
					</Typography>
					<div className='pb-2'>
						Count: { item.count }<br/>
						Per piece: ₹{ item.price.toFixed(2) }
					</div>
					<Button variant='contained' color='secondary' onClick={() => this.removeItem(item.id)}>-</Button>
				</div>
			});
		else
			items = <h4>No items in cart.</h4>;

		return (
			<Container maxWidth='md' style={{ padding: 7, paddingBottom: 80 }}>
				<h1 className='text-center text-md-left mb-4'>Cart</h1>
				<Box className='container-fluid'>
					<div className='row'>
						{ items }
						<div className='col-12'>
							{
								items instanceof Array ?
									<div className='container-fluid pt-4'>
										<div className='row'>
											<div className='col-12 col-md-9 offset-md-3 text-right'>
												<h4>Amount: ₹{ this.netPrice().toFixed(2) }</h4>
												{
													this.netPrice() > 0 ?
													<Button variant='contained' size='large' color='secondary'
														onClick={this.checkout}>Checkout</Button>
													: ''
												}
											</div>
										</div>
									</div>
								: ''
							}
						</div>
					</div>
				</Box>
			</Container>
		);
	}
}

export default Cart;