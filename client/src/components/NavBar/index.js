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
  padding: 0.85rem 1rem;
  text-decoration: none;

  &:hover {
    background-color: #111;
  }
`;

const NavMainWrp = styled.nav`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  justify-content: space-between;
`;

const AppTitle = styled(Link)`
  color: ${({ theme }) => theme.text};
  padding: 0.85rem 1rem;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.2rem;
`;

const Navbar = ({ menuList, themeTogglerFunc }) => {
  return (
    <NavMainWrp>
      <AppTitle to="/">Employee Onboard</AppTitle>
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
    </NavMainWrp>
  );
};

Navbar.propTypes = {
  menuList: PropTypes.array.isRequired,
  themeTogglerFunc: PropTypes.func.isRequired,
};

export default Navbar;
