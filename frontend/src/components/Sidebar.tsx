// src/components/Sidebar.tsx
import React from 'react';
import { Layout, Menu, Avatar, Button, Dropdown } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  BellOutlined,
  MenuOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background: #fff;
  border-right: 1px solid #f0f0f0;
  min-height: 100vh;
`;
const Logo = styled.img`
  height: 36px;
  cursor: pointer;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;

  .logo {
    font-weight: 700;
    font-size: 18px;
    color: #1890ff;
  }

  .menu-icon {
    font-size: 20px;
    color: #666;
    cursor: pointer;
  }
`;

const StyledProfile = styled.div`
  text-align: center;
  padding: 20px 16px;
  border-bottom: 1px solid #f0f0f0;

  .avatar {
    margin-bottom: 12px;
    border: 2px solid #1890ff;
  }

  .greeting {
    font-size: 13px;
    color: #888;
    margin-top: 4px;
  }

  .username {
    font-weight: 600;
    font-size: 15px;
    color: #333;
    margin-bottom: 4px;
  }

  .metrics-btn {
    margin-top: 12px;
    width: 100%;
    border-radius: 8px;
  }
`;

const Sidebar: React.FC = () => {
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <StyledSider width={250}>
      {/* Top bar with logo + hamburger */}
      <TopBar>
      <Logo
          src="/assets/qdb-logo.png" // replace with your actual QDB logo path
          alt="QDB Logo"
          onClick={() => navigate('/dashboard')}
        />
        <MenuOutlined className="menu-icon" />
      </TopBar>

      {/* Profile section */}
      <StyledProfile>
        <Avatar className="avatar" size={64} src="/assets/user.jpg" />
        <div className="greeting">Hello</div>
        <div className="username">{user?.name || 'Loading...'}</div>
        <Dropdown overlay={profileMenu} trigger={['click']}>
          <a onClick={e => e.preventDefault()}>
            Options <DownOutlined />
          </a>
        </Dropdown>
        <Button type="primary" className="metrics-btn">
          Live metrics
        </Button>
      </StyledProfile>

      {/* Menu items */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['blogs']}
        style={{
          borderRight: 0,
          padding: '12px 0',
        }}
      >
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Overview</Link>
        </Menu.Item>

        <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
          <Link to="/calendar">Calendar</Link>
        </Menu.Item>

        <Menu.Item key="/actions" icon={<DashboardOutlined />}>
          <Link to="/actions">Schedule Actions</Link>
        </Menu.Item>

        <Menu.Item key="/alerts" icon={<BellOutlined />}>
          <Link to="/alerts">Live Alerts</Link>
        </Menu.Item>

        <Menu.SubMenu key="blogs" icon={<FileTextOutlined />} title="Blogs">
          <Menu.Item key="/blogs">
            <Link to="/blogs">All</Link>
          </Menu.Item>
          <Menu.Item key="/blogs/latest">
            <Link to="/blogs/latest">Latest</Link>
          </Menu.Item>
          <Menu.Item key="/blogs/archived">
            <Link to="/blogs/archived">Archived</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="/documentation" icon={<BookOutlined />}>
          Documentation
        </Menu.Item>
        <Menu.Item key="/reports" icon={<FileDoneOutlined />}>
          Reports
        </Menu.Item>
        <Menu.Item key="/help" icon={<QuestionCircleOutlined />}>
          Need Help?
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
