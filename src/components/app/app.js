import React, { Component } from 'react';

import './app.css'; 

import AppHeader from '../app-header';
import PostAddForm from '../post-add-form/post-add-form';
import PostList from '../post-list/post-list';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import SearchPanel from '../serch-panel/search-panel';


export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: [
				{label: 'Going to learn React', important: true, like: false, id:"qwew"},
				{label: 'That is so good', important: false, like: false, id:"qda"},
				{label: 'I need a break...', important: false, like: false, id:"dada"},
			],
			term: '',
			filter: 'all'
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		let newData = this.state.data.filter(obj => id !== obj.id)
		this.setState(state => ({
			data: newData
		}))
	} 

	addItem = (body) => {
		const newItem = {
			label: body,
			important: false,
			like: false,
			id: this.maxId++
		}		

		this.setState(({data}) => {
			const newArr = [...data, newItem];
			return {
				data:newArr
			}
		})

	}


	toggleService = (id, trigger) => {
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);
			
			const old = data[index];
			let newItem = {}; 
			
			if (trigger === 'important') {
				newItem = {...old, important: !old.important}
			} else {
				newItem = {...old, like: !old.like};
			}
			
			const newArr = [...data.slice(0,index), newItem, ...data.slice(index+1)];

			return {
				data: newArr
			}
		})
	}

	onToggleImportant = (id) => {
		this.toggleService(id, 'important')
	}
	onToggleLiked = (id) => {
		this.toggleService(id, 'like')
	}

	searchPost = (items, term) => {
		if (term.length === 0) {
			return items
		}

		return items.filter( (item) => {
			return item.label.indexOf(term) > -1
		})
	}

	filterPost = (items, filter) => {
		if (filter === 'like') {
			return items.filter(item => item.like)
		} else {
			return items;
		}
	}

	onUpdateSearch = (term) => {
		this.setState({term})
	}

	onFilterSelect = (filter) => {
        this.setState({filter})
    }

	render() {
		const {data, term, filter} = this.state;

		const liked = data.filter(item => item.like).length;
		const allPosts = data.length;

		const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

		return (
			<div className="app">
				<AppHeader liked={liked} allPosts={allPosts} />
				<div className="search-panel d-flex">
					<SearchPanel
						onUpdateSearch={this.onUpdateSearch}	
					/>
					<PostStatusFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
				</div>
				<PostList
					posts={visiblePosts}
					onDelete={id => this.deleteItem(id)}
					onToggleImportant={this.onToggleImportant}
					onToggleLiked={this.onToggleLiked}
					/>
				<PostAddForm 
					onAdd={this.addItem}/>
				
			</div>
			
		)
	}	
}

