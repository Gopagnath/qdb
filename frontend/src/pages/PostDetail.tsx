import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Modal, message, Spin } from 'antd';
import axios from 'axios';
import { Post, User } from '../types';

const { Title, Paragraph } = Typography;

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch post
        const postResponse = await axios.get<Post>(
          `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`
        );
        setPost(postResponse.data);

        // Fetch author user details
        const userId = postResponse.data.userId;
        const userResponse = await axios.get<User>(
          `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`
        );
        setAuthor(userResponse.data);
      } catch (err) {
        setError('Failed to load post details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostAndUser();
    }
  }, [postId]);

  const handleEdit = () => {
    if (postId) {
      navigate(`/posts/edit/${postId}`);
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this post?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/delete`
          );
          message.success('Post deleted successfully');
          navigate('/blogs');
        } catch (err) {
          message.error('Failed to delete post');
          console.error(err);
        }
      },
    });
  };

  if (loading) return <Spin size="large" style={{ marginTop: 48 }} />;

  if (error)
    return (
      <div style={{ color: 'red', marginTop: 48, padding: 24 }}>{error}</div>
    );

  if (!post) return <p style={{ padding: 24 }}>Post not found.</p>;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>{post.title}</Title>
      <Paragraph>{post.body}</Paragraph>

      {author && (
        <Paragraph>
          <strong>Author:</strong> {author.name} ({author.email})
        </Paragraph>
      )}

      <div style={{ marginTop: 24 }}>
        <Button type="primary" onClick={handleEdit} style={{ marginRight: 8 }}>
          Edit
        </Button>
        <Button danger onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostDetail;
