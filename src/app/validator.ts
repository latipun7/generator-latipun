import emojiRegex from 'emoji-regex/es2015/text';
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

export const isEmoji = (input: string) => {
  const emptyInput = input === '';
  const regex = emojiRegex();
  const match = regex.exec(input);

  if (emptyInput) return true;

  if (match) return true;

  return 'Input should valid emoji.';
};
