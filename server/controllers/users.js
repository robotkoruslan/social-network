import User from "../models/userModel.js";


const getUsers = (req, res) => {
  res.send("Home page");
};

const signUp = async (req, res) => {

  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.send("Error")
    // res.render("/signup", {
    //   errors,
    //   name,
    //   email,
    //   password,
    //   confirm_password
    // });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      // req.flash("error_msg", "The Email is already in use.");
      res.redirect("/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      // req.flash("success_msg", "You are registered.");
      res.redirect("/signin");
    }
  }
};

export { getUsers, signUp };
