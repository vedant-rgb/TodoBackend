import mongoose from "mongoose";
import { title } from "process";

interface TodoI{
    title:String;
    description:String;
}

interface TodoDocument extends mongoose.Document{
    title:String;
    description:String;
}

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    }
});

interface todoModelInterface extends mongoose.Model<TodoDocument>{
    set(x:TodoI):TodoDocument
};

todoSchema.statics.set=(x:TodoI)=>{
    return new Todo(x);
};

const Todo = mongoose.model<TodoDocument,todoModelInterface>(
    "Todo",
    todoSchema
);

Todo.set({
    "title":"Some Title",
    "description":"Some descripton"
});

export {Todo};