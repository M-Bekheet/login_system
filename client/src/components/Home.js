import { useEffect } from "react";
import { connect } from "react-redux";
import Register from "./User/Register";
import Login from "./User/Login";
import Dashboard from "./Dashboard";
import { Layout, message } from "antd";
import { logout } from "../actions/userActions";
import { useState } from "react";


const Home = (props) => {
  const [shownLayout, setShownLayout] = useState("login");
  const [reqErr, setReqErr] = useState(props.err)

  const handleErrMsg = () => {
    try {
      if (props.err.msg) {
        setReqErr(props.err.msg)
        props.err.status >= 400 ? message.error(props.err.msg) : message.success(props.err.msg)
      } else {
        setReqErr(null)
      }
    }
    catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    handleErrMsg()
  }, [props.isAuth, props.err])




  const authMenu = <Dashboard reqErr={reqErr} />;

  const toggleShownLayout = (e) => {
    setShownLayout((prevLayout) =>
      prevLayout === "login" ? "register" : "login"
    );
  };

  const guestMenu = (
    <>
      {shownLayout === "login" ? (
        <Login toggleLayout={toggleShownLayout} handleErrMsg={handleErrMsg} />
      ) : (
          <Register toggleLayout={toggleShownLayout} handleErrMsg={handleErrMsg} />
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
  isAuth: state.user.isAuth,
  err: state.err,
});

export default connect(mapStateToProps, { logout })(Home);
