const express = require("express");
const {
  handlePostTodo,
  handleGetAllTodos,
  handleDeleteTodo,
  handleEditTodo,
} = require("../controllers/todoController");

const router = express.Router();


router.route("/")
    .post(handlePostTodo)
    .get(handleGetAllTodos);

router.route("/:id")
    .delete(handleDeleteTodo)
    .put(handleEditTodo);

module.exports = router;
