import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create-post">Create Post</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;