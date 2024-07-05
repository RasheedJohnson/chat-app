export const signup = (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
  } catch (error) {}
};

export const login = (req, res) => {
  console.log("login request sent");
  res.send("login screen");
};

export const logout = (req, res) => {
  console.log("logout request sent");
  res.send("logout screen");
};
