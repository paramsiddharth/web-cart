import { AppBar, Toolbar } from '@material-ui/core';
import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<div style={{
				position: 'fixed',
				bottom: '0',
				width: '100%',
				marginBottom: 0,
				padding: 0
			}}>
				<AppBar position='static' className='align-items-center'>
					<Toolbar>
						<h4 >Made with <i id='footerHeart' class='fa fa-heart'></i> by{' '}
						<a style={{
							color: 'lightblue'
						}} // eslint-disable-next-line 
						href='http://www.paramsid.com' target='_blank'>Param</a></h4>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default Footer;