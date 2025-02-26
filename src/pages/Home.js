import React, { useState } from 'react';
import PostList from '../components/PostList';

const Home = () => {
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <div>
      <h1>Recent Posts</h1>
      <div>
        <label>Filter by Tag:</label>
        <input
          type="text"
          placeholder="Enter a tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        />
      </div>
      <PostList selectedTag={selectedTag} />
    </div>
  );
};

export default Home;