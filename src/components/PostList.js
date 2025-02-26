import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Post from './Post';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PostListContainer = styled.div`
  padding: 1rem;
`;

const PostList = ({ selectedTag }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = selectedTag ? `http://localhost:5000/api/posts?tag=${selectedTag}` : 'http://localhost:5000/api/posts';
        const res = await axios.get(url);
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [selectedTag]);

  return (
    <PostListContainer>
      {posts.map((post) => (
        <Link to={`/posts/${post._id}`} key={post._id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Post post={post} />
        </Link>
      ))}
    </PostListContainer>
  );
};

export default PostList;