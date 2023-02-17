require('dotenv').config();
const userLib = require("./backend/lib/userLib");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5030;
const options = {
    extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
    index: ['index.html'],  
}
app.use(express.static("./public/images", options));

// app.use(express.static(__dirname + '/public'));

app.get('/card', function(req, res) {
    res.sendFile(__dirname + '/card.html');
});
app.get('/1', function(req, res) {
    res.sendFile(__dirname + '/1.html');
});
app.get('/resume', function(req, res) {
    res.sendFile(__dirname + '/resume.html');
});
app.get('/weather', function(req, res) {
    res.sendFile(__dirname + '/weather.html');
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {}, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database');
        // TODO : donot create a user if atleast 1 user exist in the table
        //    userLib.createFirstUser(function(err,result){
		//  	if(err){
		//  		// console.error(err);
		//  	}
		//  	else{
		//  		console.log(result);
		//  	}
		//  });
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
		/*userLib.deleteUser("Saivenkat",function(err,result){
			if(err){
				console.error(err);
			}
			else{
				console.log(result);
			}
		});*/
		//   userLib.getUserByFilter({userName: "saivenkat"}, function(err,result){
		// 	if(err){
		//  		console.error(err);
		// 	}
		//  	else{
		// 		console.log(result);
		// 	}
		//  });
		 userLib.getAllUsers(function(err,result){
		 	if(err){
		 		console.error(err);
		 	}
		 	else{
		 		console.log(result);
		 	}
		 });

		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
			console.log(`Server running on http://localhost:${port}`);
		});
		
	}
});