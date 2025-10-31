export const createTokenUser = (user) => {
  return {
    userID: user.id,
    username: user.username,
    role: user.role_id,
  };
};
