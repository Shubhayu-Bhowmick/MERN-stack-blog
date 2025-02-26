import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../components/Comment';

// Colors
const colors = {
  primary: '#35cc79',
  primaryLight: '#eafbf2',
  primaryDark: '#2ba866',
  background: '#ffffff',
  text: '#333333',
  lightGray: '#f5f5f5',
  mediumGray: '#e0e0e0',
  darkGray: '#666666'
};

const BlogDetailsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
`;

const PostTitle = styled.h1`
  color: ${colors.text};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${colors.darkGray};
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const PostContent = styled.div`
  color: ${colors.text};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${colors.mediumGray};
`;

const Tag = styled.span`
  background: ${colors.primaryLight};
  color: ${colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 0.8rem;
  margin-bottom: 0.5rem;
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
`;

const CommentsTitle = styled.h3`
  color: ${colors.text};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${colors.primary};
  }
`;

const CommentFormContainer = styled.div`
  margin-top: 2rem;
  background: ${colors.lightGray};
  padding: 1.5rem;
  border-radius: 8px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid ${colors.mediumGray};
  border-radius: 6px;
  min-height: 120px;
  margin-bottom: 1rem;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primaryLight};
  }
`;

const SubmitButton = styled.button`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-end;
  
  &:hover {
    background: ${colors.primaryDark};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${colors.darkGray};
  font-size: 1.2rem;
`;

const CommentsContainer = styled.div`
  margin-top: 1.5rem;
`;

const NoCommentsMessage = styled.div`
  color: ${colors.darkGray};
  font-style: italic;
  margin: 1.5rem 0;
`;

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <LoadingContainer>
        <div>Loading post...</div>
      </LoadingContainer>
    );
  }

  if (!post) {
    return (
      <LoadingContainer>
        <div>Post not found</div>
      </LoadingContainer>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/comments',
        { content: comment, postId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      // Refresh the post to show the new comment
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <BlogDetailsContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <MetaItem>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
            </svg>
            {post.author?.name || 'Anonymous'}
          </MetaItem>
          <MetaItem>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 13.38C16.67 13.59 16.46 13.74 16.22 13.78L13.11 14.33C12.98 14.35 12.86 14.36 12.74 14.36C12.28 14.36 11.85 14.16 11.57 13.81L9.22 10.7C9.03 10.46 8.96 10.15 9.04 9.87C9.11 9.58 9.32 9.34 9.6 9.21L12.3 8.16C12.7 8 13.16 8.08 13.47 8.39L16.11 11.03C16.3 11.22 16.4 11.46 16.41 11.72C16.41 11.96 16.33 12.2 16.18 12.39L16.78 13.38Z" fill="currentColor"/>
            </svg>
            {new Date(post.createdAt).toLocaleDateString()}
          </MetaItem>
        </PostMeta>
      </PostHeader>
      
      <PostContent>{post.content}</PostContent>
      
      <TagsContainer>
        {post.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagsContainer>
      
      <CommentsSection>
        <CommentsTitle>Comments</CommentsTitle>
        
        <CommentsContainer>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          ) : (
            <NoCommentsMessage>No comments yet. Be the first to comment!</NoCommentsMessage>
          )}
        </CommentsContainer>
        
        <CommentFormContainer>
          <CommentForm onSubmit={handleSubmit}>
            <TextArea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <SubmitButton type="submit">Post Comment</SubmitButton>
          </CommentForm>
        </CommentFormContainer>
      </CommentsSection>
    </BlogDetailsContainer>
  );
};

export default BlogDetails;