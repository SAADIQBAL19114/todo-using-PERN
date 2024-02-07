const { users,tokens } = require("../sequelize/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegisterUser = async (req, res) => {
  const { name, username, email, password, gender, dob, role } = req.body;
  
  try {
    userAlreadyExist = await users.findOne({ where: { email } });
    if (userAlreadyExist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    const newDob = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - newDob.getFullYear();
    const hash = await bcrypt.hash(password, 10);
    const user = await users.create({
      name,
      username,
      email,
      password: hash,
      gender,
      dob,
      age,
      role,
    });
    res.status(201).json({
      message: "User Registered",
      data: user,
      // token:token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// const handleLoginUser = async (req,role, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await users.findOne({ where: { email } });
//     if (!user) {
//       return res.status(401).json({
//         message: "Email or Password doesnot match",
//       });
//     }
//     if (user.role !== role) {
//       return res.status(403).json({
//         message: "Please make sure you are logging in from the right portal.",
//       });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//       let token = jwt.sign(
//         {
//           id: user.id,
//           email: user.email,
//           role: user.role,
//           username: user.username,
//         },
//         "secretkey",
//         { expiresIn: "3 days" }
//       );
//       let result = {
//         name: user.name,
//         role: user.role,
//         email: user.email,
//         expiresIn: 168,
//       };
//       res.status(200).cookie("auth-token", token, {
//         expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
//         httpOnly: false,
//         domain: "localhost",
//         secure: true,
//       });
//       res.status(200).json({
//         message: "user has been logged in",
//         token: token,
//         role: user.role,
//         username: user.username,
//       });
//       return res.json({
//         ...result,
//         message: "You are now logged in.",
//       });
//     } else {
//       return res.status(403).json({
//         message: "Incorrect username or password.",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: "Email or Password doesnot match",
      });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "Password does not match",
      });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      "secretkey",

    );
    await tokens.create({
      token: token,
      expired:false,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: false,
      domain: "localhost",
    });
    res.status(200).json({
      message: "user has been logged in",
      token: token,
      role: user.role,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const handleUserInfo = async (req, res) => {
  const id = req.user.id;
  const { token } = req.cookies;
  console.log(id);
  try {
    const user = await users.findOne({ where: { id } });
    if (user == null) {
      res.status(400).json({
        message: "please provide a valid id",
      });
    } else {
      return res.status(200).json({
        message: "user with the provided id",
        data: user,
      });
    }
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  handleRegisterUser,
  handleLoginUser,
  handleUserInfo,
};
