import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // EVERY USER EXCEPT FOR LOGGED IN USER

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
