import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/userActions";
import { clearErrors } from "../../actions/errorActions";
import { Form, Input, Button, Typography, Anchor, Row, Col } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";

const { Link } = Anchor;
const { Text, Title } = Typography;

// props: { register, user, isFetching }
const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = ({ target }) => {
    if (target.name === "firstName") setFirstName(target.value);
    else if (target.name === "lastName") setLastName(target.value);
    else if (target.name === "email") setEmail(target.value);
    else if (target.name === "password") setPassword(target.value);
  };


  useEffect(() => {
    console.log('isloading', props.isLoading)
    console.log(props.user);
  })

  const handleSubmit = (e) => {
    props.register({ firstName, lastName, email, password });
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
                  label="First Name"
                  labelAlign="left"
                  name="First Name"
                  onChange={handleInputChange}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your First Name!",
                    },
                  ]}
                  placeholder="First Name"
                >
                  <Input name="firstName" />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  labelAlign="left"
                  name="Last Name"
                  onChange={handleInputChange}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Last Name!",
                    },
                  ]}
                  placeholder="Last Name"
                >
                  <Input name="lastName" />
                </Form.Item>

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
                  <Input.Password name="password" visibilityToggle={false} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Register
              </Button>

                <Text>
                  <Anchor onClick={props.toggleLayout}>
                    Or
                  <Link href="#" title="Login" />
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
  isLoading: state.user.isLoading,
  err: state.err,
});

export default connect(mapStateToProps, {
  register,
  clearErrors,
})(Register);
