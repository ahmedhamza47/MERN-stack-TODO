const { Signup, Login } = require("../Signup");
const { userVerification } = require("../Middleware/AuthMiddleware");
const { SaveTodo, DeleteTodo, GetTodo } = require("../TODO");
const { init } = require("../API/init");
// const { getCards } = require("../Middleware/Cards");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.use("/", userVerification);
// router.get("/cards", getCards);
router.get("/getTodo", GetTodo);
router.post("/save", SaveTodo);
router.delete("/delete", DeleteTodo);
router.get("/init", init);
module.exports = router;
