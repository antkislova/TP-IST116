export const mapStateToProps = state => {
    let { user, token } = state.auth;
    return {
      user,
      token
    };
  };