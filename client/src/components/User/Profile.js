import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import EditProfile from "./EditProfile";
import { Anchor, Card, Avatar, Typography, message } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";


const { Title } = Typography
const { Link } = Anchor;
const { Meta } = Card;

const Profile = ({ user, err, reqErr }) => {

  const [firstName, setFirstName] = useState(user.user.firstName)
  const [city, setCity] = useState(user.user.city)
  const [gender, setGender] = useState(user.user.gender)


  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

  const handleNewUpdate = ({ firstName, city, gender }) => {
    if (typeof reqErr === 'string') {
      return
    }
    else {
      setFirstName(firstName);
      setCity(city);
      setGender(gender)
      setIsUpdatingInfo(false)
    }

  }

  return (
    <div>
      {isUpdatingInfo ? (
        <>
          <EditProfile setIsUpdatingInfo={setIsUpdatingInfo} handleNewUpdate={handleNewUpdate} />

        </>
      ) : (
          <div>
            <RadarChartOutlined className="app_logo sidebar_logo" />
            <Title >
              Web<span style={{ color: "#ff5722" }}>E</span>ra
      </Title>
            <Title className="section_title">
              Profile
      </Title>
            <Card
              style={{ width: 300, margin: "80px auto" }}
              cover={
                <img
                  alt="User"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" onClick={() => setIsUpdatingInfo((prevState) => !prevState)} />,
                <EditOutlined key="edit" onClick={() => setIsUpdatingInfo((prevState) => !prevState)} />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={firstName ? firstName : "John Doe"}
                city="City"
              />
              {user.user.email ? user.user.email : ""}
              <br />
              {city ? city : ""}
              <br />
              {gender ? gender : ""}
            </Card>

          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  err: state.user.err
});

export default connect(mapStateToProps, null)(Profile);
