export const formatError = error => {
  const message = error.message
    .replace('SequelizeValidationError: ', '')
    .replace('Validation error: ', '');
  return {
    ...error,
    message
  };
};
