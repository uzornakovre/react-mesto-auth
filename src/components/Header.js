import React                   from 'react';
import headerLogo              from '../images/header__logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Место" />
      <div className="header__account">
        <Routes>
          <Route path="/" element={
            <>
              <p className='header__email'>{userEmail}</p>
              <button className="header__link">Выйти</button>
            </>
          } />
          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
        </Routes>
      </div>
    </header>
  )
}

export default Header;