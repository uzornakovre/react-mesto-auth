import React                   from 'react';
import headerLogo              from '../images/header__logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Место" />
      <div className="header__account">
        {children}
      </div>
    </header>
  )
}

export default Header;