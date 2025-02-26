import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  cursor: pointer; /* Add pointer cursor to indicate clickable */
  transition: background-color 0.3s ease-in-out; /* Smooth transition */
  
  &:hover {
    background-color: #f1f1f1; /* Slightly darker background on hover */
  }
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const PostContent = styled.p`
  margin: 1rem 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

const PostTags = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #777;
`;

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <PostTags>
        <strong>Tags:</strong> {post.tags?.join(', ') || "No Tags"}
      </PostTags>
    </PostContainer>
  );
};

export default Post;
