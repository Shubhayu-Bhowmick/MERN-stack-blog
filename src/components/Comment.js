import React from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  border: 1px solid #eee;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
`;

const CommentAuthor = styled.strong`
  display: block;
  margin-bottom: 0.5rem;
`;

const Comment = ({ comment }) => {
  return (
    <CommentContainer>
      <CommentAuthor>{comment.author}</CommentAuthor>
      <p>{comment.content}</p>
    </CommentContainer>
  );
};

export default Comment;