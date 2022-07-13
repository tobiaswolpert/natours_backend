const express = require("express");
const reviewController = require("../controllers/reviewController");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router({ mergeParams: true });

//All routes below that line of code can only be accessed when you are logged in
router.use(authenticationController.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authenticationController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .delete(
    authenticationController.restrictTo("user", "admin"),
    reviewController.deleteReview
  )
  .patch(
    authenticationController.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .get(reviewController.getReview);

module.exports = router;
