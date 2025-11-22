import { useState } from 'react';
import './App.css';

const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7,
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20,
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0,
	},
];

export default function App() {
	const [friendFormVisibility, setFriendFormVisibility] = useState(false);

	function handleAddFriendButton() {
		setFriendFormVisibility((visible) => !visible);
	}

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList />
				{friendFormVisibility ? (
					<>
						<AddFriendForm />
						<Button handleAddFriendButton={handleAddFriendButton}>Close</Button>
					</>
				) : (
					<Button handleAddFriendButton={handleAddFriendButton}>
						Add Friend
					</Button>
				)}
			</div>
			<SplitBillForm />
		</div>
	);
}

function FriendsList() {
	const friends = initialFriends;
	return (
		<ul>
			{friends.map((friend) => (
				<FriendItem
					friend={friend}
					key={friend.id}
				/>
			))}
		</ul>
	);
}

function FriendItem({ friend }) {
	return (
		<li>
			<img
				src={friend.image}
				alt={friend.name}
			/>
			<h3>{friend.name}</h3>
			{friend.balance < 0 ? (
				<p className='red'>
					You owe {friend.name} {Math.abs(friend.balance)}
				</p>
			) : friend.balance > 0 ? (
				<p className='green'>
					{friend.name} owes you {Math.abs(friend.balance)}
				</p>
			) : (
				<p className=''>You and {friend.name} are even</p>
			)}
			<Button>Select</Button>
		</li>
	);
}

function Button({ children, handleAddFriendButton }) {
	return (
		<button
			className='button'
			onClick={handleAddFriendButton}
		>
			{children}
		</button>
	);
}

function AddFriendForm() {
	return (
		<form
			action=''
			className='form-add-friend'
		>
			<label htmlFor=''>👫 Friend Name</label>
			<input type='text' />

			<label htmlFor=''>🖼️ Image URL</label>
			<input type='text' />
			<Button>Add</Button>
		</form>
	);
}

function SplitBillForm() {
	return (
		<form className='form-split-bill'>
			<h2>Split a bill with X</h2>

			<label htmlFor=''>💰 Bill Value</label>
			<input type='number' />

			<label htmlFor=''>🧍 Your Expense</label>
			<input type='number' />

			<label htmlFor=''>👫 X Expense</label>
			<input
				type='number'
				disabled
			/>

			<label htmlFor=''>🤑 Who is paying the bill</label>
			<select
				name=''
				id=''
			>
				<option value='user'>You</option>
				<option value='friend'>X</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
