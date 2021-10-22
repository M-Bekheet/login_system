import React from "react";
import { Typography } from "antd";
import { RadarChartOutlined } from '@ant-design/icons'

const { Title } = Typography

const Timeline = () => {
  return <section>
    <RadarChartOutlined className="app_logo sidebar_logo" />
    <Title >
      Web<span style={{ color: "#ff5722" }}>E</span>ra
      </Title>
    <Title className="section_title">

      Timeline
      </Title>

  </section>;
};

export default Timeline;
