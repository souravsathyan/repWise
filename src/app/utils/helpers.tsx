export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validateCode = (code: string) => {
  const re = /^\d{6}$/; // exactly 6 digits
  return re.test(code);
};
