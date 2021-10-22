import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";
import { Menu, Anchor, Button } from "antd";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";

const { Link } = Anchor;

const Sidebar = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = (e) => {
    props.logout();
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  window.addEventListener("resize", handleResize);

  const handleSelect = (e) => {
    if (e.key === "1") props.handleLayoutChange("Timeline");
    else if (e.key === "2") props.handleLayoutChange("Profile");
  };

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
      >
        <Menu.Item key="1" icon={<MenuFoldOutlined />}>
          TimeLine
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="3" className="center logout-btn">
          <Anchor onClick={handleLogout}>
            <Link href="#" title="Logout" />
          </Anchor>
        </Menu.Item>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Sidebar);
