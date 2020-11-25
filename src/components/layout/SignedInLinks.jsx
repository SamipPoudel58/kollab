import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
  const { profile } = props;
  return (
    <ul className="links">
      <li>
        <NavLink to="/create">New Project</NavLink>
      </li>
      <li>
        <a href="/#" onClick={props.signOut}>
          Log Out
        </a>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating profile_pic">
          {profile.initials}
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
