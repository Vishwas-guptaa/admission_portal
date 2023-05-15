const CourseModel = require("../../modals/Course");
class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const course = await CourseModel.find();
      //console.log(course)
      res.render("admin/dashboard", { n: name, i: image, c: course });
    } catch (error) {
      console.log(error);
    }
  };

  static admincouseview = async (req, res) => {
    try {
      const { name, image, user_id } = req.user;
      // console.log(req.params.id)
      const result = await CourseModel.findById(req.params.id);
      console.log(result);
      res.render("admin/view", { c: result, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static admincoursedelete = async (req, res) => {
    try {
      //delete image code
      const course = await CourseModel.findById(req.params.id);

      await CourseModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AdminController;
