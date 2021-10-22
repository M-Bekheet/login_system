import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { Form, Input, Button, Anchor, Radio } from "antd";

const { Link } = Anchor;

const EditProfile = ({ user, updateProfile }) => {
  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [phone, setPhone] = useState(user.user.phone);
  const [email, setEmail] = useState(user.user.email);
  const [password, setPassword] = useState(user.user.email);
  const [gender, setGender] = useState(user.user.gender);
  const [city, setCity] = useState(user.user.city);
  const [country, setCountry] = useState(user.user.country);
  const [addrState, setAddrState] = useState(user.user.state);

  console.log(user.user.gender);
  // console.log("fn", firstName);
  const handleInputChange = ({ target }) => {
    console.log(target.value, gender);
    if (target.name === "firstName") setFirstName(target.value);
    else if (target.name === "lastName") setLastName(target.value);
    else if (target.name === "phone") setPhone(target.value);
    else if (target.name === "password") setPassword(target.value);
    else if (target.name === "city") setCity(target.value);
    else if (target.name === "country") setCountry(target.value);
    else if (target.name === "email") setEmail(target.value);
    else if (target.value === "Female" || target.value == "Male") {
      console.log(target.value);
      setGender(target.value);
      // console.log("new", gender);
    }
  };

  const handleSubmit = (e) => {
    updateProfile({
      firstName,
      lastName,
      email,
      password,
      city,
      phone,
      gender,
      city,
      state: addrState,
      country,
    });
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="form profile_form"
      initialValues={{
        ["First Name"]: firstName,
        ["Last Name"]: lastName,
        Phone: phone ? phone : "",
        Country: country ? country : "",
        City: city ? city : "",
        Gender: gender ? gender : "",
        ["Address State"]: addrState,
        ["Email"]: email,
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

      <Radio.Group onChange={handleInputChange} value={gender} required={true}>
        <Radio value="Female" name="Gender">
          Female
        </Radio>
        <Radio value="Male" name="Gender">
          Male
        </Radio>
      </Radio.Group>

      <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
        Update
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile })(EditProfile);
