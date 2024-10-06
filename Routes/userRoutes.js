const router = require("express").Router();
const {
    AddUser,
    UpdateUser,
    getAllUsers,
    getspecificUser
} = require("../Controllers/userController");

router.route("/Add").post(AddUser);
router.route("/update").put(UpdateUser);
router.route("/Fetch/All").get(getAllUsers);
router.route("/Fetch/specific").get(getspecificUser);


module.exports = router;
