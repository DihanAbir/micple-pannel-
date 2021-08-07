function passwordTest(password) {
  return /^[a-zA-Z0-9@#*.]{8,12}$/.test(password);
}
function usernameTest(username) {
  return /^[a-z]+_[0-9]+$/.test(username);
}

module.exports = {
  passwordTest,
  usernameTest,
};
