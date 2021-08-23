import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ToggleBtn from "../ToggleBtn";

const NavbarWrp = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: flex-end;

  .MuiTypography-root {
    color: white;
  }
  & > li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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

const Navbar = ({ menuList, themeTogglerFunc }) => {
  return (
    <nav>
      <NavbarWrp>
        {menuList.map((nav) => (
          <NavItem key={nav.link}>
            <NavItemLink to={`/${nav.link}`}>{nav.label}</NavItemLink>
          </NavItem>
        ))}
        <NavItem>
          <ToggleBtn btnOnClick={themeTogglerFunc} />
        </NavItem>
      </NavbarWrp>
    </nav>
  );
};

Navbar.propTypes = {
  menuList: PropTypes.array.isRequired,
  themeTogglerFunc: PropTypes.func.isRequired,
};

export default Navbar;
