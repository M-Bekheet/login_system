import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import EditProfile from "./EditProfile";
import { Anchor, Card, Avatar, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Link } = Anchor;
const { Meta } = Card;
const { Text } = TypeError;

const Profile = ({ user, updateProfile }) => {
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

  console.log(user.user);

  return (
    <div>
      {isUpdatingInfo ? (
        <>
          <EditProfile />
          <Anchor onClick={() => setIsUpdatingInfo((prevState) => !prevState)}>
            <Link title="Cancel" />
          </Anchor>
        </>
      ) : (
        <div>
          <Card
            style={{ width: 300, margin: "80px auto" }}
            cover={
              <img
                alt="User Photo"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={user.user.firstName ? user.user.firstName : "John Doe"}
              city="City"
            />
            {user.user.email ? user.user.email : ""}
            <br />
            {user.user.city ? user.user.city : ""}
            <br />
            {user.user.gender ? user.user.gender : ""}
          </Card>
          {/* {user.user.city && <Text>City: {user.user.city} </Text>} */}
          {/* {user.user.phone && <Text>Phone: {user.user.phone} </Text>} 
          {user.user.gender ? user.user.gender : ""} */}

          <Anchor onClick={() => setIsUpdatingInfo((prevState) => !prevState)}>
            <Link title="Update Profile" />
          </Anchor>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile })(Profile);