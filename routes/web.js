const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const CourseController = require("../controller/CourseController");
const auth = require("../middleware/auth");
const AdminController = require("../controller/admin/AdminController");

//Admin conroller route path
router.get("/admin/dashboard", auth, AdminController.dashboard);
router.get("/admin/courseview/:id", auth, AdminController.admincouseview);
router.get("/admin/coursedelete/:id", auth, AdminController.admincoursedelete);

// user controoler route path
router.get("/", UserController.login);
router.get("/home", auth, UserController.home);
router.get("/register", UserController.register);
router.post("/insert", UserController.insert);
router.post("/verifylogin", UserController.verifylogin);
router.get("/logout", UserController.logout);
router.get("/profiledashboard", auth, UserController.profiledashboard);
router.get("/changepass", auth, UserController.displaychangepassword);
router.post("/userchangepassword", auth, UserController.updatepassword);
router.get("/editprofile", auth, UserController.editprofile);
router.post("/profileupdate", auth, UserController.updateprofile);

// bca coures route path
router.get("/bca", auth, CourseController.course_bca);
router.post("/insertbca", auth, CourseController.insertbca);
router.get("/displaybca", auth, CourseController.displaybca);
router.get("/bca/courseview/:id", auth, CourseController.bcacourseview);
router.get("/bca/courseedit/:id", auth, CourseController.bcacouresedit);

//Mca course route path
router.get("/mca", auth, CourseController.course_mca);
router.post("/insertmca", auth, CourseController.insertmca);
router.get("/displaymca", auth, CourseController.displaymca);

//btech course route path
router.get("/btech", auth, CourseController.course_btech);
router.post("/insertbtech", auth, CourseController.insertbtech);
router.get("/displaybtech", auth, CourseController.displaybtech);

module.exports = router;
