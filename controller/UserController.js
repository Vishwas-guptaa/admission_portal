const UserModel = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CourseModel = require("../modals/Course");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddz1pswrm",
  api_key: "288465368246899",
  api_secret: "Zq5bXS-SVjDGmijXiRY4ohoXZ_c",
  // secure: true
});

class UserController {
  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      res.render("login", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static home = async (req, res) => {
    try {
      const { name, email, image, _id } = req.user;
      const btech = await CourseModel.findOne({ user_id: _id, subject: "MCA" });
      const bca = await CourseModel.findOne({ user_id: _id, subject: "BCA" });
      const mca = await CourseModel.findOne({ user_id: _id, subject: "MCA" });
      res.render("home", {
        n: name,
        e: email,
        i: image,
        Bt: btech,
        BCA: bca,
        MCA: mca,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static insert = async (req, res) => {
    try {
      //console.log(req.files)
      //console.log(req.body)
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "AdmissionImage",
      });
      //console.log(myimage)
      //
      //     const file =req.files.image
      //     const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
      //     folder:'AdmissionImage'
      //     })

      //     // console.log(req.body)
      const { name, email, password, confirmpassword, mobile } = req.body;

      const user = await UserModel.findOne({ email: email });
      if (user) {
        req.flash("error", "Email already exist");
        res.redirect("/register");
      } else {
        if (name && email && password && confirmpassword) {
          if (password && confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = await new UserModel({
              name: name,
              email: email,
              mobile: mobile,
              password: hashpassword,
              image: {
                public_id: myimage.public_id,
                url: myimage.secure_url,
              },
            });

            await result.save();
            res.redirect("/");
          } else {
            req.flash("error", "Password and confirm password are not matched");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All field are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          const ismatched = await bcrypt.compare(password, user.password);
          if (ismatched) {
            //multiple login

            if (user.role == "student") {
              //generate jwt web token
              const token = jwt.sign({ id: user.id }, "vishwas123");
              //  console.log(token)
              res.cookie("token", token);
              res.redirect("/home");
            }
            if (user.role == "admin") {
              //generate jwt web token
              const token = jwt.sign({ id: user.id }, "vishwas123");
              //  console.log(token)
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            }
          } else {
            req.flash("error", "Email are password is incorret ");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not register user");
          res.redirect("/");
        }
      } else {
        req.flash("error", "all fields are require");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static profiledashboard = async (req, res) => {
    try {
      //  console.log('hello')
      const { name, image, _id, email, mobile } = req.user;
      res.render("profile/profiledashboard", {
        n: name,
        i: image,
        e: email,
        i: image,
        m: mobile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static editprofile = async (req, res) => {
    try {
      //console.log('hhhh')

      const { name, image, _id, email, mobile } = req.user;
      const result = await UserModel.findById(req.params.id);
      res.render("profile/editprofile", {
        edit: result,
        n: name,
        i: image,
        e: email,
        i: image,
        m: mobile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static updateprofile = async (req, res) => {
    try {
      // console.log("rrrrr");
      if (req.files) {
        const user = await UserModel.findById(req.user.id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "AdmissionImage",
        });

        var data = {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          email: req.body.email,
        };
      }
      console.log(data);
      const updateprofile = await UserModel.findByIdAndUpdate(
        req.user.id,
        data
      );
      res.redirect("/profiledashboard");
    } catch (error) {
      console.log(error);
    }
  };

  static displaychangepassword = async (req, res) => {
    try {
      //console.log('hello')
      const { name, image, _id } = req.user;
      res.render("profile/changepass", {
        n: name,
        i: image,
        message: req.flash("Sucess"),
        message: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static updatepassword = async (req, res) => {
    try {
      //console.log("hello");
      const { old_password, new_password, cpassword } = req.body;
      //console.log(req.body);
      //const { _id } = req.admin;

      // console.log(_id)

      if (old_password && new_password && cpassword) {
        const user = await UserModel.findById(req.user.id);
        //console.log(admin)
        const ismatched = await bcrypt.compare(old_password, user.password);
        // const isPasswordMatched = await userModel.comparePassword(req.body.old_password);
        if (!ismatched) {
          req.flash("error", "Old password is incorrect");
          res.redirect("/changepass");
        } else {
          if (new_password !== cpassword) {
            req.flash("error", "Paswword not Match");
            res.redirect("/changepass");
          } else {
            const newHashPassword = await bcrypt.hash(new_password, 10);
            //console.log(req.user)
            await UserModel.findByIdAndUpdate(req.user.id, {
              $set: { password: newHashPassword },
            });

            req.flash("error", "Password changed succesfully");
            res.redirect("/logout");
          }
        }
      } else {
        req.flash("error", "All Fields are Required");
        res.redirect("/changepass");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;
