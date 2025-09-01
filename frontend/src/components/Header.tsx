import React from 'react';
import { Layout, Input, Avatar, Space, Button, Tooltip, Badge } from 'antd';
import {
  PlusOutlined,
  MailOutlined,
  BellOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;

const StyledHeader = styled(AntHeader)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #f0f0f0;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 40px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .icon-btn {
    font-size: 18px;
    color: #555;
    cursor: pointer;
  }
`;

const Header: React.FC = () => {
  const handleCreateNew = () => {
    console.log('Create New clicked');
  };

  return (
    <StyledHeader>
      {/* Search bar */}
      <SearchContainer>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Type here to search..."
          allowClear
        />
      </SearchContainer>

      {/* Right side actions */}
      <Actions>
        <Tooltip title="Create New Post">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={handleCreateNew}
          />
        </Tooltip>

        <Badge count={3} size="small">
          <MailOutlined className="icon-btn" />
        </Badge>

        <Badge count={5} size="small">
          <BellOutlined className="icon-btn" />
        </Badge>

        <Avatar src="/assets/user.jpg" />
      </Actions>
    </StyledHeader>
  );
};

export default Header;
