import React, { useState, useEffect } from "react";
import { Button, Form, Input, DatePicker, Select,message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import moment from "moment";

const Register = () => {
  const navigate = useNavigate();
  const submitHandler = async (value) => {
     const dobTimestamp = moment(value.dob).valueOf();
    const newObj = { ...value, dob: dobTimestamp };
    console.log(newObj);
    try {
      await api.post("/users/register", newObj);
       message.success("Registration Successfull");
      navigate("/login");
    } catch (error) {
        message.error("something went wrong");
    }
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ role: "user" });
  }, [form]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Form
          form={form}
          className="bg-white p-4 shadow-md rounded-md w-96"
          layout="vertical"
          onFinish={submitHandler}
          initialValues={{ role: "user" }}
        >
          <h1 className="text-2xl font-semibold mb-2">Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input className=" p-1 w-full border rounded-md" type="text" />
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input className="p-1 w-full border rounded-md" type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input className="p-1 w-full border rounded-md" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input className="p-1 w-full border rounded-md" type="password" />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select
              className="p-1 w-full border rounded-md"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </Form.Item>
          <Form.Item label="DOB" name="dob">
            <DatePicker
              className="p-1 w-full border rounded-md"
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Select
              className="p-1 w-full border rounded-md"
              options={[
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
              ]}
            />
          </Form.Item>
          <div className="flex justify-between">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already Registered? Login here
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 text-white px-4 rounded-md"
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
