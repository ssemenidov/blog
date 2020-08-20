const express = require("express");
const mongoose = require("mongoose");
const ArticleRouter = require("./routes/articles");
const Article = require("./models/article");
const app = express();
mongoose.connect(
  "mongodb+srv://Serge123:sergepass@cluster0.baxqe.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Server start"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/articles", ArticleRouter);
app.get("/", async (req, res) => {
  const articles = await Article.find();
  res.render("articles/index", { articles: articles });
});

app.listen(5000);
