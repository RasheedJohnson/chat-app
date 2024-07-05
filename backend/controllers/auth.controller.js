export const signup = (req, res) => {
  console.log("signup request sent");
  res.send("signup screen");
};

export const login = (req, res) => {
  console.log("login request sent");
  res.send("login screen");
};

export const logout = (req, res) => {
  console.log("logout request sent");
  res.send("logout screen");
};
