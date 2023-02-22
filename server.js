require("dotenv").config();
const userLib = require("./backend/lib/userLib");
const TodoLib= require("./backend/lib/todoLib");
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = process.env.PORT || 5010;
const options = {
	extensions:['htm','html','css','js','ico','jpg','jpeg','png','svg','pdf'],
	index:['index.html'],
}
app.use(express.static("public",options));
app.use(express.json());
app.get("/card", function(req, res){
	res.sendFile(__dirname+"/card.html");
});
app.get("api/todo",function(req,res)
{
	TodoLib.getAllTodos(function(err,todos){
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({staus:"success",data:todos});
		}
	});
});
app.post("api/todo",function(req,res)
{
	const todo=req.body;
	TodoLib.createTodos(function(err,todos){
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({staus:"success",data:todos});
		}
	});
});
app.put("/api/todo/:todoid",function(req,res)
{
	const todo=req.body;
	const todoid=req.params.todoid;
	TodoLib.updateTodoByid(todoid,todo,function(err,todo)
	{
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({staus:"success",data:todos});
		}
	});
});
app.delete("/api/todo/:todoid",function(req,res)
{
    const todoid=req.params.todoid;
	TodoLib.deleteTodoById(todoid,function(err,todo){
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({staus:"success",data:todos});
		}
	});
});

app.get("/resume", function(req, res){
	res.sendFile(__dirname+"/resume.html");
});

app.get("/1", function(req, res){
	res.sendFile(__dirname+"/1.html");
});
app.get("/weather", function(req, res){
	res.sendFile(__dirname+"/weather.html");
});
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{},function (err){
	if(err){
		console.error(err);
	}
	else{
		console.log("DB Connected");
		// TODO: donot create user if atleast 1 user exist int the table
		// userLib.createFirstUser(function(err,res){
		// 	if(err){
		// 		// console.error(err);
		// 	}
		// 	else{
		// 		console.log(res);
		// 	}
		// });
		// userLib.createUser({userName: "beingzero", yearOfGraduation: 2025},function(err,result){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		// userLib.updateUser(function(err,result){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		userLib.deleteUser("saivenkat",function(err,result){
			if(err){
				console.error(err);
			}
			else{
				console.log(result);
			}
		});
		// userLib.getUserByFilter({userName: "saivenkat"}, function(err,result){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		// userLib.getAllUsers(function(err,result){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });

		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
			console.log(`Server running on http://localhost:${port}`);
		});
		
	}
});