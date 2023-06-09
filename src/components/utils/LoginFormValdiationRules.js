export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if(!values.password) {
    errors.password = "Password is required"
  } else if(values.password.length < 8) {
    errors.password = "Password is not 8 characters long"
  }
  return errors;
};