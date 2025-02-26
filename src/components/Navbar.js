import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Colors
const colors = {
  primary: '#35cc79',
  primaryDark: '#2ba866',
  background: '#ffffff',
  text: '#333333',
  lightGray: '#f5f5f5',
  mediumGray: '#e0e0e0',
  darkGray: '#666666'
};

const NavbarContainer = styled.nav`
  background: ${colors.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: ${colors.primary};
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
  margin: 0 1rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${colors.primary};
    transition: width 0.3s;
  }
  
  &:hover {
    color: ${colors.primary};
    &:after {
      width: 100%;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1.2rem;
  margin-left: 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.login {
    color: ${colors.primary};
    border: 1px solid ${colors.primary};
    
    &:hover {
      background: ${colors.lightGray};
    }
  }
  
  &.register {
    color: white;
    background: ${colors.primary};
    
    &:hover {
      background: ${colors.primaryDark};
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px 0;
    background: ${colors.text};
    border-radius: 3px;
    transition: all 0.3s ease;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
  
  ${NavLink} {
    margin: 10px 0;
  }
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NavbarContainer>
      <Logo to="/">BlogSpace</Logo>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </MobileMenuButton>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create-post">Create Post</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </NavLinks>
      
      <AuthButtons>
        <Button to="/login" className="login">Login</Button>
        <Button to="/register" className="register">Register</Button>
      </AuthButtons>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create-post">Create Post</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <Button to="/login" className="login">Login</Button>
        <Button to="/register" className="register">Register</Button>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;