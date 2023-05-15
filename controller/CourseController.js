const CourseModel = require("../modals/Course");

class CourseController {
  static course_bca = async (req, res) => {
    try {
      const { name, image, _id, email } = req.user;
      res.render("course/Bca", { n: name, i: image, e: email });
      // console.log(req.user)
    } catch (error) {
      console.log(error);
    }
  };

  static displaybca = async (req, res) => {
    try {
      //console.log('hello')
      const { name, image, _id } = req.user;
      const result = await CourseModel.find({ user_id: _id });
      res.render("Bca/display", { Bca: result, n: name, i: image });
      //console.log(result)
    } catch (error) {
      console.log(error);
    }
  };

  static bcacourseview = async (req, res) => {
    try {
      const { name, image, user_id } = req.user;
      // console.log(req.params.id)
      const result = await CourseModel.findById(req.params.id);
      //console.log(result);
      res.render("Bca/view", { bca: result, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static bcacouresedit = async (req, res) => {
    try {
      const { name, image, user_id } = req.user;
      //console.log("first");
      const result = await CourseModel.findById(req.params.id);
      res.render("Bca/edit", { bca: result, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static insertbca = async (req, res) => {
    try {
      // console.log('heloo')
      const { _id } = req.user;
      const result = new CourseModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        collage: req.body.collage,
        subject: req.body.subject,
        branch: req.body.branch,
        user_id: _id,
      });
      //console.log(result)
      await result.save();

      res.redirect("/displaybca");
    } catch (error) {
      console.log(error);
    }
  };

  static course_mca = async (req, res) => {
    try {
      const { name, image, _id, email } = req.user;
      res.render("course/Mca", { n: name, i: image, e: email });
      // console.log(req.user)
    } catch (error) {
      console.log(error);
    }
  };

  static insertmca = async (req, res) => {
    try {
      // console.log('heloo')
      const { _id } = req.user;
      const result = new CourseModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        collage: req.body.collage,
        subject: req.body.subject,
        branch: req.body.branch,
        user_id: _id,
      });
      console.log(result);
      await result.save();

      res.redirect("/displaymca");
    } catch (error) {
      console.log(error);
    }
  };

  static displaymca = async (req, res) => {
    try {
      //console.log('hello')
      const { name, image, _id } = req.user;
      const result = await CourseModel.find({ user_id: _id });
      res.render("Mca/display", { Mca: result, n: name, i: image });
      //console.log(result)
    } catch (error) {
      console.log(error);
    }
  };

  static course_btech = async (req, res) => {
    try {
      const { name, image, _id, email } = req.user;
      res.render("course/Btech", { n: name, i: image, e: email });
      // console.log(req.user)
    } catch (error) {
      console.log(error);
    }
  };

  static insertbtech = async (req, res) => {
    try {
      // console.log('heloo')
      const { _id } = req.user;
      const result = new CourseModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        collage: req.body.collage,
        subject: req.body.subject,
        branch: req.body.branch,
        user_id: _id,
      });
      console.log(result);
      await result.save();

      res.redirect("/displaybtech");
    } catch (error) {
      console.log(error);
    }
  };

  static displaybtech = async (req, res) => {
    try {
      //console.log('hello')
      const { name, image, _id } = req.user;
      const result = await CourseModel.find({ user_id: _id });
      res.render("Btech/display", { Btech: result, n: name, i: image });
      //console.log(result)
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CourseController;
