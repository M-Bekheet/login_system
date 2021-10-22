// import { useState } from "react";
import { connect } from "react-redux";
import Register from "./User/Register";
import Login from "./User/Login";
import Dashboard from "./Dashboard";
import { Typography, Row, Col, Anchor, Layout } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";
import { logout } from "../actions/userActions";
import { useState } from "react";

const { Link } = Anchor;
const { Title } = Typography;

const Home = (props) => {
  const [shownLayout, setShownLayout] = useState("login");

  const authMenu = <Dashboard />;

  const toggleShownLayout = (e) => {
    console.log("toggle", shownLayout);
    setShownLayout((prevLayout) =>
      prevLayout === "login" ? "register" : "login"
    );
  };

  const guestMenu = (
    <>
      {shownLayout === "login" ? (
        <Login toggleLayout={toggleShownLayout} />
      ) : (
        <Register toggleLayout={toggleShownLayout} />
      )}
    </>
  );

  return (
    <Layout className="site-layout">
      {props.user.isAuth ? authMenu : guestMenu}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Home);
