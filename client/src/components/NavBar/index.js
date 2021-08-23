import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarWrp = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: flex-end;
`;

const NavItem = styled.li``;

const NavItemLink = styled(Link)`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover {
    background-color: #111;
  }
`;

const Navbar = ({ menuList }) => {
  return (
    <nav>
      <NavbarWrp>
        {menuList.map((nav) => (
          <NavItem key={nav.link}>
            <NavItemLink to={`/${nav.link}`}>{nav.label}</NavItemLink>
          </NavItem>
        ))}
      </NavbarWrp>
    </nav>
  );
};

Navbar.propTypes = {
  menuList: PropTypes.array.isRequired,
};

export default Navbar;
