import React from 'react';
import './app-header.css';

const AppHeader = ({liked, allPosts}) => {
	// const {liked, allPosts} = props;

	return (
		<div className='app-header d-flex'>
			<h1>Vladimir Levadny</h1>
			<h2>{allPosts} записей, из них понравилось {liked}</h2>
		</div>
	)
}

export default AppHeader;