export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to the database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const editProject = (project, projectId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to the database
    const firestore = getFirestore();

    firestore
      .collection("projects")
      .doc(projectId)
      .update({
        title: project.title,
        content: project.content,
      })
      .then(() => {
        dispatch({ type: "EDIT_PROJECT", project });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_PROJECT_ERROR", err });
      });
  };
};

export const deleteProject = (projectId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to the database
    const firestore = getFirestore();

    firestore
      .collection("projects")
      .doc(projectId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PROJECT" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};
