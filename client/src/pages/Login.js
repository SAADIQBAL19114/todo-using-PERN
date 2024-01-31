import React from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const submitHandler = async (value) => {
    console.log(value);
    try {
      const {data} = await api.post("/users/login", value);
      console.log(data);
    } catch (error) {
      message.error("something went wrong");
    }
  };
  return (
    <div className="register-page min-h-screen flex items-center justify-center bg-gray-100">
      <Form
        layout="vertical"
        onFinish={submitHandler}
        className="bg-white p-4 shadow-md rounded-md w-96"
      >
        <h1 className="text-2xl font-semibold mb-2">Login Form</h1>
        <Form.Item label="Email" name="email">
          <Input type="email" className="p-1 w-full border rounded-md" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" className="p-1 w-full border rounded-md" />
        </Form.Item>
        <div className="flex justify-between">
          <Link to="/register" className="text-blue-500 hover:underline">
            Not a user? Click Here to Register
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 text-white px-4 rounded-md"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
