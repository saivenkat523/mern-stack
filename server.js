require ("dotenv").config();
const mongoose =require("mongoose");
const express = require('express');
const app = express();
const port = process.env.PORT || 5010;


app.get("/", function(req, res){
	//res.send("Iam siavenkat");
	res.sendFile(__dirname+"/resume.html");
});
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{},function(err){
     if(err)
	 {
		console.error(err);
	 }
	 else
	 {
		console.log("DB connected");
		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
			console.log(`Server running on http://localhost:${port}`);
		});
	 }
});

