import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { deleteProject } from "../../store/actions/projectActions";

const ProjectDetails = (props) => {
  // console.log(props);
  const { project, auth, match, deleteProject, history } = props;
  // if (project && project.authorId === auth.uid) {
  //   console.log("matched");
  // }
  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted By {project.authorFirstName} {project.authorLastName}
              </div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>
            {auth.uid === project.authorId ||
            auth.uid === "9CQIJK69EQeofUmyoaD2CLCDE8J2" ? (
              <div className="editButtons">
                <Link
                  to={"/edit/" + match.params.id}
                  className="btn lighten-1 z-depth-0 editBtn"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    deleteProject(match.params.id);
                    history.push("/");
                  }}
                  className="btn lighten-1 z-depth-0 deleteBtn"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container center">
      <p>Loading Projects...</p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  // console.log(project);
  return {
    project: project,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
