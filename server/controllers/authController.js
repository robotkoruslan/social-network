import User from "../models/userModel.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  }).catch(error => { throw error})
};

export {signup};
