import { StatusCodes } from "http-status-codes";
import Todo from "../models/Todo.js";
import { BadRequestError } from "../utils/error.js";
import mongoose from "mongoose";

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const owner = new mongoose.mongo.ObjectId(req.user);
  const todo = await Todo.create({ title, description, owner });
  if (!todo) throw new BadRequestError("An Error occured creating a new todo");
  res.status(StatusCodes.OK).json({ todo });
};

export const readTodo = async (req, res) => {};

export const readTodos = async (req, res) => {
  const todos = await Todo.find({ owner: req.user.id });
  if (!todos) throw new BadRequestError("There was an error occured!");
  res.status(StatusCodes.OK).json({ todos });
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!todo) throw new BadRequestError("Error in  Updating todo");
  res.status(StatusCodes.OK).json({ todo });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) throw new BadRequestError("Error in Deleting");
  res.status(StatusCodes.OK).json({ todo });
};

export const deleteAll = async (req, res) => {
  const { id } = req.user;
  const todos = await Todo.find({ owner: id });
  todos.map(async ({ _id }) => {
    await Todo.findByIdAndDelete(_id);
  });
  res.status(StatusCodes.OK).json("Deleted!");
};

export const deleteDone = async (req, res) => {
  const { id } = req.user;
  const todos = await Todo.find({ owner: id, status: "2" });
  todos.map(async ({ _id }) => {
    await Todo.findByIdAndDelete(_id);
  });
  res.status(StatusCodes.OK).json("Deleted!");
};
