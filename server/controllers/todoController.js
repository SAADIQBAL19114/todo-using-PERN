const { todo, users } = require("../sequelize/models");

const handlePostTodo = async (req, res) => {
  const { description, status, userId } = req.body;
  try {
    const user = await users.findOne({ where: { id: userId } });
    if (user != undefined) {
      const todos = await todo.create({ description, status, userId });
      return res.json({
        message: "Data Retrieved",
        data: todos,
      });
    } else {
      return res.status(400).json({
        message: "no user in the database",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const handleGetAllTodos = async (req, res) => {
  try {
    const todos = await todo.findAll();
    if (todos != "") {
      return res.json({
        message: "Data Retrieved",
        data: todos,
      });
    } else {
      return res.status(400).json({
        message: "no post in the database",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const handleDeleteTodo = async (req,res) => {
    const id = req.params.id;
    try {
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Id must be a number",
        });
      }
      const todos = await todo.findOne({where:{id}});
      if (todos == null) {
        res.status(400).json({
          message: "Please provide a valid id ",
        });
      } else {
        await todos.destroy()
        res.status(200).json({
          message: "Post deleted successfully",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
}

const handleEditTodo = async (req, res) => {
  const id = req.params.id;
  const {description, status, userId} = req.body
  try {
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Id must be a number",
      });
    }
    const todos = await todo.findOne({ where: { id } });
    if (todos == null) {
      res.status(400).json({
        message: "Please provide a valid id ",
      });
    } else if 
      (todos.description !== description || todos.status !== status){
        todos.description = description
        todos.status = status
        todos.save()
        res.status(201).json({
                message:"Post has been updated",
                data:todos
            })
      }else{
            res.status(400).json({
                message:"You did not change any thing",
                error:null,
            })
        }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}
module.exports = {
  handlePostTodo,
  handleGetAllTodos,
  handleDeleteTodo,
  handleEditTodo,
};
