import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateProfile, logout } from "../../actions/userActions";
import { Form, Input, Button, Radio, Row, Col } from "antd";


const EditProfile = ({ user, updateProfile, setIsUpdatingInfo, err, handleNewUpdate }) => {


  const [info, setInfo] = useState({
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    phone: user.user.phone,
    email: user.user.email,
    password: user.user.password,
    gender: user.user.gender || "Male",
    city: user.user.city,
    country: user.user.country,
  })

  const handleInputChange = ({ target }) => {
    if (target.value === "Female" || target.value === "Male") {
      setInfo(info => ({ ...info, gender: target.value }))
    } else {
      setInfo(info => ({ ...info, [target.name]: target.value }))
    }
  };

  const handleSubmit = (e) => {
    updateProfile({ ...info });
    handleNewUpdate({ ...info })

  };


  const handleUpdateCancel = () => {
    setIsUpdatingInfo(false)
  }

  return (
    <Form
      onFinish={handleSubmit}
      className="form profile_form"
      initialValues={{
        // ["First Name"]: info.firstName,
        // ["Last Name"]: info.lastName,
        // Phone: info.phone ? info.phone : "",
        // Country: info.country ? info.country : "",
        // City: info.city ? info.city : "",
        Gender: info.gender ? info.gender : "Male",
        // ["Email"]: info.email,
      }}
    >
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
      <Form.Item
        label="City"
        labelAlign="left"
        name="City"
        onChange={handleInputChange}
        rules={[
          {
            required: true,
            message: "Please enter your City!",
          },
        ]}
        placeholder="Your City"
      >
        <Input name="city" />
      </Form.Item>

      <Form.Item
        label="Country"
        labelAlign="left"
        name="Country"
        onChange={handleInputChange}
        rules={[
          {
            required: true,
            message: "Please enter your Country!",
          },
        ]}
        placeholder="Country"
      >
        <Input name="country" />
      </Form.Item>

      <Form.Item
        label="Phone"
        labelAlign="left"
        name="Phone"
        onChange={handleInputChange}
        rules={[
          {
            required: true,
            message: "Please enter your Phone!",
          },
        ]}
        placeholder="Phone"
      >
        <Input name="phone" />
      </Form.Item>

      <Radio.Group onChange={handleInputChange} value={info.gender} required={true} >
        <Radio value="Female" name="Gender">
          Female
        </Radio>
        <Radio value="Male" name="Gender">
          Male
        </Radio>
      </Radio.Group>

      <Row justify="center">
        <Col >
          <Button type="primary" size="large" htmlType="submit" style={{ margin: '10px 20px' }} >
            Update
        </Button>
        </Col>
        <Col >
          <Button type="primary" danger size="large" style={{ margin: '10px 20px' }} onClick={handleUpdateCancel} >
            Cancel
        </Button>
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  err: state.user.err
});

export default connect(mapStateToProps, { updateProfile, logout })(EditProfile);
