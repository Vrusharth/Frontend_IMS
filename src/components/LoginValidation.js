function Validation(values) {
  const error = {};
  if (values.email === "") {
    error.email = "Email shouldnot be empty";
  } else {
    error.email = "";
  }
  if (values.password === "") {
    error.password = "Password should not be empty";
  } else {
    error.password = "";
  }
  return error;
}

export default Validation;
