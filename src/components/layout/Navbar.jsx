import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = (props) => {
  const { auth, profile } = props;
  return (
    <nav className="navigation">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          Kollab
        </Link>
        {auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
