// @toDo add password && email && date less then today rules
export function fieldValidation(invalid, errorText) {
  const error = invalid ? errorText : '';
  return {
    invalid,
    error,
  };
}

export function notEmpty(value, errorText = 'This value should not be empty') {
  const invalid = Boolean(value === null
    || value === undefined
    || value.length === 0);
  return fieldValidation(invalid, errorText);
}

export function notFuture(value, errorText = 'This date couldn\'t be in future') {
  const now = new Date().getTime();
  const date = new Date(value).getTime();
  const invalid = now < date;
  return fieldValidation(invalid, errorText);
}
const formValidationRules = {
  notEmpty,
};

export default formValidationRules;
