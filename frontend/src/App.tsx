import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 24px 24px 24px 0;
  padding: 24px;
  background: #fff;
  overflow-y: auto;
`;

const App: React.FC = () => {
  return (
    
      <StyledLayout>
        <Sidebar />
        <Layout>
          <Header />
          <StyledContent>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
              <Route path="/posts/edit/:postId" element={<EditPost />} />
              {/* 404 Not found fallback */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </StyledContent>
        </Layout>
      </StyledLayout>
  );
};

export default App;
