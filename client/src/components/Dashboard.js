import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import Profile from "./User/Profile";
import Timeline from "./User/Timeline";
import { Col, Row, Anchor, Spin, Space } from "antd";

const { Link } = Anchor;

const Dashboard = (props) => {
  const [shownlayout, setshownlayout] = useState("Timeline");

  const handleLayoutChange = (layout) => {
    console.log("layout", layout);
    setshownlayout(layout);
  };

  useEffect(() => {
    console.log('isloading', props.isLoading)
    console.log(props.user);
  })

  console.log(shownlayout);
  return props.user.isAuth ? (
    props.isLoading ? (
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Space>
    ) : (
        <Row wrap={false}>
          <Col flex="none">
            <Sidebar handleLayoutChange={handleLayoutChange} />
          </Col>
          <Col flex="auto">
            {shownlayout === "Profile" ? <Profile /> : <Timeline />}
          </Col>
        </Row>

      )
  ) : (
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Space>
    )
};

const mapStateToProps = (state) => ({
  user: state.user,
  isloading: state.user.isLoading
});

export default connect(mapStateToProps, null)(Dashboard);
