import React, { useEffect, useState, useCallback } from 'react';
import {
  Tabs,
  Pagination,
  Modal,
  message,
  Spin,
  Typography,
  Row,
  Col,
  Card,
  Select,
  Space,
} from 'antd';
import axios from 'axios';
import { Post } from '../types';
import { useUser } from '../hooks/useUser';

const { TabPane } = Tabs;
const { Title, Text, Paragraph, Link } = Typography;

const POSTS_PER_PAGE = 1;

const Blogs: React.FC = () => {
  const user = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');

  // Fetch posts
  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Post[]>(
          `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/posts`
        );
        // add fallback fields (thumbnail, createdAt, content)
        const withFallback = response.data.map((p, idx) => ({
          ...p,
          thumbnail: p.thumbnail || `/assets/img.jpg`,
          createdAt: p.createdAt || new Date().toISOString(),
          content: p.content || 'No description available for this blog post.',
        }));
        setPosts(withFallback);
      } catch (err: any) {
        setError('Failed to load posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Filter by tab
  useEffect(() => {
    let updated = posts;
    if (activeTab === 'latest') {
      updated = posts.filter((_, idx) => idx % 2 === 0);
    } else if (activeTab === 'archived') {
      updated = posts.filter((_, idx) => idx % 2 !== 0);
    }
    setFilteredPosts(updated);
    setCurrentPage(1);
  }, [activeTab, posts]);

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortOrder === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortOrder === 'az') {
      return a.title.localeCompare(b.title);
    }
    if (sortOrder === 'za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Pagination
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Delete handler
  const handleDelete = useCallback(
    (id: number) => {
      Modal.confirm({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this post?',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/users/${user?.id}/post/${id}`,
              { deleted: true }
            );
            setPosts((prev) => prev.filter((p) => p.id !== id));
            message.success('Post deleted successfully');
          } catch (err) {
            message.error('Failed to delete post');
            console.error(err);
          }
        },
      });
    },
    [user?.id]
  );

  if (loading) return <Spin size="large" style={{ marginTop: 48 }} />;
  if (error) return <div style={{ color: 'red', marginTop: 48 }}>{error}</div>;

  return (
    <div style={{ padding: 24 }}>
      {/* Header row: Title + Sort/Filter */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0 }}>
            All Blog posts
          </Title>
          <Text type="secondary">Qatar Development Bank</Text>
        </Col>
        <Col>
          <Space>
            <Select
              value={sortOrder}
              style={{ width: 150 }}
              onChange={(value) => setSortOrder(value)}
              options={[
                { value: 'newest', label: 'Newest first' },
                { value: 'oldest', label: 'Oldest first' },
                { value: 'az', label: 'A → Z' },
                { value: 'za', label: 'Z → A' },
              ]}
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={(val) => setActiveTab(val)}
              options={[
                { value: 'all', label: 'All' },
                { value: 'latest', label: 'Latest' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
          </Space>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="all"
        onChange={(key) => setActiveTab(key)}
        activeKey={activeTab}
        style={{ marginBottom: 24 }}
      >
        <TabPane tab="All" key="all" />
        <TabPane tab="Latest" key="latest" />
        <TabPane tab="Archived" key="archived" />
      </Tabs>

      {/* Blog list */}
      {paginatedPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        paginatedPosts.map((post) => (
          <Card
            key={post.id}
            style={{
              marginBottom: 20,
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid #f0f0f0',
            }}
            bodyStyle={{ padding: 16 }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={6} md={5}>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: 90,
                    objectFit: 'cover',
                    borderRadius: 4,
                  }}
                />
              </Col>
              <Col xs={24} sm={18} md={19}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Title level={5} ellipsis style={{ marginBottom: 4 }}>
                    {post.title || 'Untitled Post'}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                </div>
                <Paragraph
                  type="secondary"
                  ellipsis={{ rows: 2 }}
                  style={{ marginBottom: 4, fontSize: 13 }}
                >
                  {post.content}
                </Paragraph>
                <Link href={`/posts/${post.id}`} style={{ fontSize: 13 }}>
                  Read more
                </Link>
              </Col>
            </Row>
          </Card>
        ))
      )}

      {/* Pagination at bottom */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        {sortedPosts.length > 0 && (
          <Pagination
            current={currentPage}
            pageSize={POSTS_PER_PAGE}
            total={sortedPosts.length}
            onChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Blogs;
