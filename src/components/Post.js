import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  cursor: pointer; /* Add pointer cursor to indicate clickable */
  &:hover {
    background-color: #f9f9f9; /* Add hover effect */
  }
`;

const PostTitle = styled.h2`
  margin: 0;
`;

const PostContent = styled.p`
  margin: 1rem 0;
`;

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <div>
        <strong>Tags:</strong> {post.tags.join(', ')}
      </div>
    </PostContainer>
  );
};

export default Post;