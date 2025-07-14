const express = require("express");
const router = express.Router(); 

const {
  viewRequest,
  updateRequestStatus,
} = require("../AdminController/request");

router.get("/viewRequest", viewRequest);
router.patch("/updateRequestStatus/:id", updateRequestStatus);

module.exports = router;
