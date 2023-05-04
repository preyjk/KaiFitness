/*
 * @Author: Zoey
 * @Date: 2023-04-25 14:44:09
 * @LastEditors: Zoey
 * @LastEditTime: 2023-04-28 11:36:50
 * @Descripttion:
 */

import { Input, Form, Button, Select, message, InputNumber, Upload } from 'antd';
import './index.less';
import axios from 'axios';
import { useState } from 'react';
import { LockOutlined, UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function App(props) {
	const { close } = props;
	const [messageApi, contextHolder] = message.useMessage();
	const [show, setshow] = useState('login');
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};
	const handleChange = info => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, url => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};
	// login
	const onFinish = values => {
		axios.post('/api/user/signIn', values).then(res => {
			close(values.user);
			let token = res.data.token;
			sessionStorage.setItem('token', token);
			messageApi.open({
				type: 'success',
				content: 'Login successful',
			});
		});
	};
	// signUp
	const onFinishSignUp = values => {
		console.log(values);
		axios
			.post('/api/user/signUp', {
				user: values.user,
				password: values.password,
				gender: values.gender,
				height: values.height,
				weight: values.weight,
				profilePicBase: imageUrl,
			})
			.then(res => {
				messageApi.open({
					type: 'success',
					content: 'Successfully registered account',
				});
			});
	};
	const changeType = value => {
		setshow(value);
	};
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload Avatar
			</div>
		</div>
	);
	return (
		<div className="login_page">
			<div className="login">
				<p>MyFitness</p>
				{show === 'login' ? (
					<Form name="normal_login" className="login-form" onFinish={onFinish}>
						<Form.Item
							name="user"
							rules={[{ required: true, message: 'Please input your Username!' }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Username"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Please input your Password!' }]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item>
							{/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Log in
							</Button>
							Or{' '}
							<a
								onClick={() => {
									changeType('up');
								}}
							>
								register now!
							</a>
						</Form.Item>
					</Form>
				) : (
					<Form name="signUpForm" onFinish={onFinishSignUp}>
						<Form.Item
							name="user"
							rules={[{ required: true, message: 'Please input your Username!' }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Username"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
							hasFeedback
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item
							name="confirm"
							dependencies={['password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error(
												'The two passwords that you entered do not match!'
											)
										);
									},
								}),
							]}
						>
							<Input.Password placeholder="Please confirm your password" />
						</Form.Item>
						<Form.Item name="gender">
							<Select placeholder="select your gender">
								<Option value="male">Male</Option>
								<Option value="female">Female</Option>
								<Option value={null}>Other</Option>
							</Select>
						</Form.Item>
						<Form.Item name="height">
							<InputNumber min={0} placeholder="height" />
						</Form.Item>
						<Form.Item name="weight">
							<InputNumber min={0} placeholder="weight" />
						</Form.Item>
						<Form.Item name="avatar">
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								beforeUpload={beforeUpload}
								onChange={handleChange}
							>
								{imageUrl ? (
									<img
										src={imageUrl}
										alt="avatar"
										style={{
											width: '100%',
										}}
									/>
								) : (
									uploadButton
								)}
							</Upload>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Sign up
							</Button>
							Or{' '}
							<a
								onClick={() => {
									changeType('login');
								}}
							>
								login now!
							</a>
						</Form.Item>
					</Form>
				)}
			</div>
		</div>
	);
}

export default App;
