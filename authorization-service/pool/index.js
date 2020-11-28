export const validateCredentials = (username, password) => {
  const storedUserPassword = process.env[username];

  return storedUserPassword && storedUserPassword === password;
};
