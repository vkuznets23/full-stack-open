export const validatePhoneNumber = (phoneNumber) => {
  return /^(\d{2,3}-\d{6,8})$/.test(phoneNumber);
};

export const validateName = (name) => {
  return name.trim().length >= 3;
};