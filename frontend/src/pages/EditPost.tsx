import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import axios from 'axios';
import { Post } from '../types';

const { TextArea } = Input;

const EditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Post>(
          `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`
        );
        setPost(response.data);
        form.setFieldsValue({
          title: response.data.title,
          body: response.data.body,
        });
      } catch (err) {
        setError('Failed to load post data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, form]);

  const onFinish = async (values: { title: string; body: string }) => {
    if (!post) return;
    setSaving(true);
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          ...post,
          title: values.title,
          body: values.body,
        }
      );
      message.success('Post updated successfully!');
      navigate(`/posts/${post.id}`);
    } catch (err) {
      message.error('Failed to update post.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    if (post) {
      navigate(`/posts/${post.id}`);
    } else {
      navigate('/blogs');
    }
  };

  if (loading) return <Spin size="large" style={{ marginTop: 48 }} />;

  if (error)
    return (
      <div style={{ color: 'red', marginTop: 48, padding: 24 }}>{error}</div>
    );

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h2>Edit Post</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please input the body!' }]}
        >
          <TextArea rows={6} placeholder="Enter post content" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={saving}>
            Save
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPost;
