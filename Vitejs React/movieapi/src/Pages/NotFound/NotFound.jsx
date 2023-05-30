import React from "react";
// import image from '../../Asserts/img/section/section.jpg'
import { NavLink } from "react-router-dom";

import NoPage from "../../Asserts/img/NoPage.jpg";
import "../../Asserts/css/nofound.css";

export default function NotFound() {
  return (
	<>
	
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	


    <div className="errorContainer">
      <div className="error">
	  <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/></svg>
      </div>
	  <br/>
	<br/>
		<p>
		The page you are visiting has either been removed, or the link to the page has been closed or is no longer available.
		</p>
      <br />
	  <br/>
	<br/>
      <div className="links">

		   <NavLink  to="/" className="active">
              Home
          </NavLink>
      </div>
    </div>
	</>
  );
}
