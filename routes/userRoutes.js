const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

const { route } = require("./tourRoutes");

router.post("/signup", authenticationController.signup);
router.post("/login", authenticationController.login);
router.post("/forgotPassword", authenticationController.forgotPassword);
router.patch("/resetPassword/:token", authenticationController.resetPassword);

//Router based middleware, middleware will protect all the routes from here on and below but not the routes above this line of code.
router.use(authenticationController.protect);

router.patch("/updateMyPassword", authenticationController.updatePassword);

router.get(
  "/me",

  userController.getMe,
  userController.getUser
);

router.patch(
  "/updateMe",

  userController.updateMe
);

router.delete(
  "/deleteMe",

  userController.deleteMe
);

//Will protect the routes below that they can only be accessed by a user with role: admin
router.use(authenticationController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
