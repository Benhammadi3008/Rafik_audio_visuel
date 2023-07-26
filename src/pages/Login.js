import React from "react";
import {  Row } from "antd";
import { Button, Checkbox, Form, Input } from 'antd';
import Logout from '../services/Logout';
import logo from "../images/RAFIK AUDIO VISUEL FINAL 2 .png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login (){
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = () => {
        form
            .validateFields()
            .then((values) => {
                let data = new FormData();

                data.append('login', values.username);
                data.append('password', values.password);
                const config = { headers: { 'Content-Type': 'multipart/form-data' } };

                axios.post(process.env.REACT_APP_API_BASE_URL + 'login',
                    data , config
                )
                    .then(({ data }) => {
                        localStorage.setItem('authorization', JSON.stringify(data.authorization));
                        localStorage.setItem('User', JSON.stringify(data.user));
                        localStorage.setItem('Authenticated', true);
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
                
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div className="h-screen"> 
            <Row className="w-1/6 h-1/6 mx-auto my-32 max-[600px]:h-1/5 max-[600px]:w-1/2  max-[600px]:ml-32 ">
                <img src={logo} alt="Rafik audio visuel"  />
            </Row>
        <Row className="flex justify-center">
            <Form
                    form={form}
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit" className="bg-sky-600">
                        Submit
                    </Button>
                    </Form.Item>
        </Form>
    </Row>
        </div>
    )
}
export default Login ; 