var express = require('express');
const axios = require('axios');
var app = express();


const port = 8777;
var current_goal = 24000.00;
var time_gone = 0;
var current_bal = 0;
const token = "";
const req_cfg = {
	headers: { Authorization: `Bearer ${token}` }
};
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function(req, res) {
	let cdate = new Date().getTime();
  if(time_gone+60000 < cdate)
  {
  	axios.post('https://money.yandex.ru/api/account-info', {}, req_cfg)
  	.then((ares) => {
  		current_bal = ares.data.balance;
  		time_gone = new Date().getTime()
  		res.json(
  		{
  			goal: current_goal,
  			got: ares.data.balance
  		}); });
  }
  else
  {
  	res.json(
  		{
  			goal: current_goal,
  			got: current_bal
  		});
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))