import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/userActions";
import { clearErrors } from "../../actions/errorActions";
import { Form, Input, Button, Typography, Anchor, Row, Col } from "antd";

import { RadarChartOutlined } from "@ant-design/icons";

const { Link } = Anchor;
const { Text, Title } = Typography;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(password);
    props.login({ email, password });
  };

  const handleInputChange = ({ target }) => {
    console.log(target.value);
    if (target.name === "email") setEmail(target.value);
    else if (target.name === "password") setPassword(target.value);
  };

  return (
    <>
      {props.isAuth ? (
        <div> Welcome </div>
      ) : (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col md={8} span={24}>
            <RadarChartOutlined className="app_logo" />
            <Title>
              Web<span style={{ color: "#ff5722" }}>E</span>ra
            </Title>
          </Col>
          <Col md={16} span={24}>
            <Form onFinish={handleSubmit} className="form">
              <Form.Item
                label="Email"
                labelAlign="left"
                name="Email"
                onChange={handleInputChange}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
                placeholder="email"
              >
                <Input name="email" />
              </Form.Item>

              <Form.Item
                onChange={handleInputChange}
                label="Password"
                labelAlign="left"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password visibilityToggle={false} name="password" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Login
              </Button>

              <Text>
                <Anchor onClick={props.toggleLayout}>
                  Or
                  <Link href="#" title="Register" />
                </Anchor>
              </Text>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  err: state.err,
});

export default connect(mapStateToProps, {
  login,
  clearErrors,
})(Login);
