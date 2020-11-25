import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createProject, editProject } from "../../store/actions/projectActions";
import { firestoreConnect } from "react-redux-firebase";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      title_editable: false,
      content_editable: false,
    };
  }

  // componentDidMount() {
  //   if (this.props.match.path === "/edit/:projectId") {
  //     this.setState({
  //       title: this.props.project.title,
  //       content: this.props.project.content,
  //     });
  //   }
  // }

  // handleClick = (e) => {
  //   this.setState({
  //     // title: this.props.project.title,
  //     // content: this.props.project.content,
  //     editable: true,
  //   });
  // };

  handleChange = (e) => {
    this.setState({
      // title: this.props.project.title,
      // content: this.props.project.content,
      [e.target.id + "_editable"]: true,
    });
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const projectId = this.props.match.params.projectId;
    if (this.props.match.path === "/edit/:projectId") {
      this.props.editProject(this.state, projectId);
    } else {
      this.props.createProject(this.state);
    }
    this.props.history.push("/");
  };

  render() {
    // console.log("createproject-props", this.props);
    const { auth, match, project } = this.props;
    // let editable = project ? true : false
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} action="" className="white">
          <h4 className="grey-text text-darken-3">
            {match.path === "/edit/:projectId"
              ? "Edit Project"
              : "Create New Project"}
          </h4>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              value={
                !this.state.title_editable && project
                  ? project.title
                  : this.state.title
              }
              id="title"
              type="text"
              // onClick={this.handleClick}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea
              value={
                !this.state.content_editable && project
                  ? project.content
                  : this.state.content
              }
              className="materialize-textarea"
              id="content"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="input-field">
            <button className="btn lighten-1 z-depth-0 editBtn">
              {match.path === "/edit/:projectId" ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  const id = ownProps.match.params.projectId;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  // console.log(project);
  return {
    auth: state.firebase.auth,
    project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    editProject: (project, projectId) =>
      dispatch(editProject(project, projectId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }])
)(CreateProject);
// connect(mapStateToProps, mapDispatchToProps)(CreateProject);
