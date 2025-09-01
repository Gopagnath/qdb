import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard</Title>
      <Paragraph>Welcome to your dashboard! Here you can see an overview of your activity.</Paragraph>
      {/* Add more dashboard widgets or stats here */}
    </div>
  );
};

export default Dashboard;