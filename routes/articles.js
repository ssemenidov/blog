const express = require("express");
const Article = require("../models/article");
const router = express.Router();
module.exports = router;
router.get("/", (req, res) => {
  res.send("In articles");
});

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render("articles/show", { article: article });
  } catch {
    res.redirect("/");
  }
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", {
    article: article,
  });
});

router.post(
  "/update/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    console.log("x");
    next();
  },
  saveArticleRedirect("edit")
);

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleRedirect("new")
);

function saveArticleRedirect(path) {
  return async (req, res) => {
    let article = req.article;

    article.title = req.body.title;
    article.descr = req.body.descr;
    article.markdown = req.body.markdown;

    try {
      article = await article.save();
      res.redirect(`/articles/${article.id}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
      console.log(e);
    }
  };
}
router.get("/delete/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});
