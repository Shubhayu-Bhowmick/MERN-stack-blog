import React, { useState } from 'react';
import styled from 'styled-components';
import PostList from '../components/PostList';

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

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  color: ${colors.text};
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${colors.primary};
  }
`;

const FilterContainer = styled.div`
  background: ${colors.lightGray};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterLabel = styled.label`
  font-weight: 600;
  margin-right: 1rem;
  color: ${colors.text};
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const FilterInput = styled.input`
  padding: 0.7rem 1rem;
  border: 1px solid ${colors.mediumGray};
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
  margin-right: 1rem;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primaryLight};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const Button = styled.button`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${colors.primaryDark};
  }
`;

const Home = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilter = () => {
    setIsFiltering(true);
  };

  return (
    <HomeContainer>
      <Header>
        <Title>Recent Posts</Title>
      </Header>
      
      <FilterContainer>
        <FilterLabel>Filter by Tag:</FilterLabel>
        <FilterInput
          type="text"
          placeholder="Enter a tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        />
        <Button onClick={handleFilter}>Apply Filter</Button>
      </FilterContainer>
      
      <PostList selectedTag={selectedTag} />
    </HomeContainer>
  );
};

export default Home;