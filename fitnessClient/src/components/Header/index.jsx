/*
 * @Author: Zoey
 * @Date: 2023-04-24 16:45:23
 * @LastEditors: Zoey
 * @LastEditTime: 2023-04-28 11:36:55
 * @Descripttion:
 */
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';
import { Menu } from 'antd';
import Login from '../Login';
const items = [
	{
		label: 'HOMEPAGE',
		key: '/',
		icon: <SettingOutlined />,
	},
	{
		label: 'PERSONAL',
		key: 'PERSONAL',
		children: [
			{
				label: 'Dashboard',
				key: '/Dashboard',
			},
			{
				label: 'My Plan',
				key: '/plan',
			},
		],
	},
	{
		label: 'ABOUT',
		key: 'ABOUT',
		children: [
			{
				label: 'ABOUT',
				key: 'ARTICLES',
			},

			{
				label: 'OUR TEAM',
				key: 'TEAM',
			},
		],
	},
];
const path = window.location.pathname;
// const user = sessionStorage.getItem('user');
const changeMenu = value => {
	console.log(value);
	window.location.href = value.key;
};

const App = () => {
	const [user, setuser] = useState('');
	const [visible, setvisible] = useState(false);
	const showLogin = () => {
		setvisible(true);
	};
	const isModalOpen = () => {};
	const close = value => {
		setuser(value);
		sessionStorage.setItem('username', value);
		setvisible(false);
	};
	useEffect(() => {
		let username = sessionStorage.getItem('username');
		setuser(username);
	}, []);

	return (
		<div className="header-box">
			<div className="logo">
				<a href="/"></a>
			</div>
			<Menu
				onClick={changeMenu}
				defaultSelectedKeys={path}
				className="menu-list"
				style={{ flex: 'auto', minWidth: 0 }}
				mode="horizontal"
				items={items}
			/>
			<div className="right">
				<a
					className="tips"
					onClick={() => {
						showLogin();
					}}
				>
					Hi,{user ? user : 'Sign in'}
				</a>
				<UserOutlined className="user-icon" />
			</div>
			<Modal
				onCancel={() => {
					setvisible(false);
				}}
				open={visible}
				footer={null}
			>
				<Login close={close} />
			</Modal>
		</div>
	);
};

export default App;
