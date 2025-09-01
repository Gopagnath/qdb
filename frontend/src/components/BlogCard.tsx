import React from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import styled from 'styled-components';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Post } from '../types';

const { Title, Paragraph, Text } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 120px;
  background-image: url('/assets/static.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`;

interface BlogCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onEdit, onDelete }) => {
  const snippet = post.body.length > 120
    ? post.body.slice(0, 120) + '...'
    : post.body;

  return (
    <StyledCard>
      <Row gutter={16} align="middle">
        <Col span={6}>
          <ImageContainer />
        </Col>
        <Col span={18}>
          <Row justify="space-between" align="top">
            <Col>
              <Title level={4}>{post.title}</Title>
              <Paragraph>{snippet}</Paragraph>
              <Link to={`/posts/${post.id}`}>Read more</Link>
            </Col>
            <Col>
              <Text type="secondary">
                {new Date().toLocaleDateString()}
              </Text>
            </Col>
          </Row>

          <Space style={{ marginTop: 12 }}>
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(post)}
              type="primary"
              size="small"
            >
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDelete(post.id)}
              danger
              size="small"
            >
              Delete
            </Button>
          </Space>
        </Col>
      </Row>
    </StyledCard>
  );
};

export default BlogCard;
