export const validateEmail = (email: string) => {
  // Simple email validation regex
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length > 7;
};
