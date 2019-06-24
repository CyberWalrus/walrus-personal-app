import RoutePath from "@client/routes";
import * as React from "react";
import { FunctionComponent, ReactElement } from "react";
import { Link } from "react-router-dom";

const Header: FunctionComponent = (): ReactElement => {
  return (
    <header className={`page-header`}>
      <div className={`logo`}>
        <Link to={RoutePath.INDEX} className={`logo__link`}>
          <img className={`logo__img`} src={`img/walrus-icon-white.png`} />
        </Link>
      </div>
      <nav className={`menu`}>
        <ul>
          <li className={`menu__item`}>
            <Link to={RoutePath.INDEX} className={`menu__link`}>
              Main
            </Link>
          </li>
          <li className={`menu__item`}>
            <Link to={RoutePath.INFO} className={`menu__link`}>
              Info
            </Link>
          </li>
          <li className={`menu__item`}>
            <Link to={RoutePath.OPTION} className={`menu__link`}>
              Option
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`user`}>
        <Link to={RoutePath.LOGIN} className={`user__link`}>
          Sign In
        </Link>
        <Link to={RoutePath.SIGNUP} className={`user__link`}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
