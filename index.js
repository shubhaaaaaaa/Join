let express = require("express");
let app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "join_us",
});
app.get("/", function (req, res) {
  var q = "SELECT COUNT(*) AS count FROM users";
  con.query(q, function (err, result) {
    if (err) throw err;
    var count = result[0].count;
    res.render("displayUser", { data: count });
  });
});

app.post("/register", function (req, res) {
  var q = "INSERT INTO users SET?";
  var person = { email: req.body.email };
  con.query(q, person, function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, function () {
  console.log('Server running on port 3000. Access the site by visiting "localhost:3000" on your local browser.');
});
