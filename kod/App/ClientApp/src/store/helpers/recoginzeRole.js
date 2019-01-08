export const isVisitor = ({ user }) => {
  return !!user && !user.role;
};

export const isAdmin = ({ user }) => {
  return !!user && !!user.role && user.role === "1";
};

export const isManager = ({ user }) => {
  return !!user && !!user.role && user.role === "2";
};

export const isClient = ({ user }) => {
  return !!user && !!user.role && user.role === "3";
};
