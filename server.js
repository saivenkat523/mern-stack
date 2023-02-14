const express = require('express');
const app = express();
const port = process.env.PORT || 5010;


app.get("/resume", function(req, res){
	//res.send("Iam siavenkat");
	res.sendFile(__dirname+"/resume.html");
});

app.listen(port, function(){
	console.log("Server running on http://localhost:"+port);
	console.log(`Server running on http://localhost:${port}`);
});
