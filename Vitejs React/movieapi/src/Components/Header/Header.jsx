import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({path}) {
  return (
    <header>
      <div className="nav container">
        <div className="logo">
          Movie<span>APP</span>
        </div>

{path==="Home" &&
        <NavLink to="/" className="active">
        {path}
        </NavLink>
}

{path!=="Home" &&
        <NavLink to="/serchresult" className="active">
        {path}
        </NavLink>
}

        &nbsp;&nbsp;
        <NavLink to="/Favorite" className="active">
          Favorite
        </NavLink>

      </div>
    </header>
  );
}
