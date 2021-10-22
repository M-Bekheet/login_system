import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";
import { Menu } from "antd";
import { MenuFoldOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";


const Sidebar = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    handleResize()
    return () => { //clean up event listener onUnmount
      window.removeEventListener("resize", handleResize)
    }
  }, [])


  window.addEventListener("resize", handleResize);

  const handleSelect = (e) => {
    if (e.key === "1") props.handleLayoutChange("Timeline");
    else if (e.key === "2") props.handleLayoutChange("Profile");
  };

  const handleMenuClick = e => {
    if (e.key === '3') {
      props.logout();
    }
  }

  return (
    <>
      <Menu
        className="sidebar"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={isCollapsed}
        onSelect={handleSelect}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1" icon={<MenuFoldOutlined />}>
          TimeLine
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="3" icon={<LoginOutlined />} className="logout-btn">
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Sidebar);
