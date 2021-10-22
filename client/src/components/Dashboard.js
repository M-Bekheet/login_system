import React, { useState } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import Profile from "./User/Profile";
import Timeline from "./User/Timeline";
import { Col, Row, Anchor } from "antd";

const { Link } = Anchor;

const Dashboard = (props) => {
  const [shownlayout, setshownlayout] = useState("Timeline");

  const handleLayoutChange = (layout) => {
    console.log("layout", layout);
    setshownlayout(layout);
  };

  console.log(shownlayout);
  return props.user.isAuth ? (
    <Row wrap={false}>
      <Col flex="none">
        <Sidebar handleLayoutChange={handleLayoutChange} />
      </Col>
      <Col flex="auto">
        {shownlayout === "Profile" ? <Profile /> : <Timeline />}
      </Col>
    </Row>
  ) : null;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Dashboard);
