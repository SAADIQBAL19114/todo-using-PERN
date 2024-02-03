import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import TestComponent from "../components/TestComponent";

const UserPage = () => {
  const [key, setKey] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["auth-token"]);
  const handleLogout = () => {
    removeCookie("auth-token");
  };

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      handleLogout();
    }
    const selectedValue = () => {
      setKey(e.key);
    };
    selectedValue();
  };
  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Todos",
      key: "2",
      icon: <FileTextOutlined />,
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Layout>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-700">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                MSI TODO
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <div>
                <div>
                  <Dropdown menu={menuProps}>
                    <Button icon={<UserOutlined style={{ color: "#fff" }} />}>
                      <Space>
                        <DownOutlined style={{ color: "#fff" }} />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <content>{key === "2" && <TestComponent />}</content>
    </Layout>
  );
};

export default UserPage;
