import React from 'react';
import styled from 'styled-components';

// Colors
const colors = {
  primary: '#35cc79',
  primaryLight: '#eafbf2',
  background: '#ffffff',
  text: '#333333',
  lightGray: '#f5f5f5',
  mediumGray: '#e0e0e0',
  darkGray: '#666666'
};

const CommentContainer = styled.div`
  background: ${colors.background};
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  border-left: 3px solid ${colors.primary};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  color: ${colors.primary};
  font-weight: bold;
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  color: ${colors.text};
`;

const CommentDate = styled.div`
  font-size: 0.8rem;
  color: ${colors.darkGray};
  margin-left: auto;
`;

const CommentContent = styled.div`
  color: ${colors.darkGray};
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 0.8rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${colors.darkGray};
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
  padding: 0;
  
  &:hover {
    color: ${colors.primary};
  }
  
  svg {
    margin-right: 0.3rem;
  }
`;

const Comment = ({ comment }) => {
  // Get first letter of author's name for avatar
  const authorInitial = comment.author ? comment.author.charAt(0).toUpperCase() : 'A';
  
  return (
    <CommentContainer>
      <CommentHeader>
        <Avatar>{authorInitial}</Avatar>
        <CommentAuthor>{comment.author}</CommentAuthor>
        <CommentDate>{comment.date || "Feb 26, 2025"}</CommentDate>
      </CommentHeader>
      
      <CommentContent>
        {comment.content}
      </CommentContent>
      
      <Actions>
        <ActionButton>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
          </svg>
          Like
        </ActionButton>
        
        <ActionButton>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
          </svg>
          Reply
        </ActionButton>
      </Actions>
    </CommentContainer>
  );
};

export default Comment;