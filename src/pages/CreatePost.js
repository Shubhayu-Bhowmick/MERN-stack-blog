import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const CreatePostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: ${colors.text};
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${colors.primary};
  }
`;

const FormContainer = styled.div`
  background: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${colors.mediumGray};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primaryLight};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${colors.mediumGray};
  border-radius: 4px;
  min-height: 200px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primaryLight};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${colors.primaryDark};
  }
  
  &:disabled {
    background: ${colors.mediumGray};
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  color: ${colors.darkGray};
  border: 1px solid ${colors.mediumGray};
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background: ${colors.lightGray};
  }
`;

const TagsHelp = styled.small`
  display: block;
  margin-top: 0.5rem;
  color: ${colors.darkGray};
`;

const FormError = styled.div`
  color: #e53935;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/posts',
        { title, content, tags: tags.split(',').map(tag => tag.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <CreatePostContainer>
      <Header>
        <Title>Create New Post</Title>
      </Header>
      
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter a catchy title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="content">Content</Label>
            <TextArea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              type="text"
              placeholder="react, javascript, tutorial"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <TagsHelp>Separate tags with commas</TagsHelp>
          </FormGroup>
          
          {error && <FormError>{error}</FormError>}
          
          <ButtonContainer>
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </CreatePostContainer>
  );
};

export default CreatePost;