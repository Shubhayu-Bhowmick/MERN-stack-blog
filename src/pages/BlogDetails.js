import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../components/Comment';

const BlogDetailsContainer = styled.div`
  padding: 1rem;
`;

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/comments',
        { content: comment, postId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      // Refresh the post to show the new comment
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <BlogDetailsContainer>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>
        <strong>Tags:</strong> {post.tags.join(', ')}
      </div>
      <div>
        <h3>Comments</h3>
        {post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </BlogDetailsContainer>
  );
};

export default BlogDetails;