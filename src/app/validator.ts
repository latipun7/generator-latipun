import validator from 'validator';

export const isEmail = (input: string) => {
  const emptyInput = input === '';

  if (emptyInput) return true;

  if (validator.isEmail(input)) return true;

  return 'Input should valid email.';
};

export const isURL = (input: string) => {
  const emptyInput = input === '';

  if (emptyInput) return true;

  if (validator.isURL(input)) return true;

  return 'Input should valid URL.';
};
