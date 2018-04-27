const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const {Page} = require("../models");
const {addPage} = require('../views');
const {wikiPage} = require('../views');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/', (rec, res) => {
  res.send('placerholder');
});

router.post('/', async (rec, res) => {
  const page = new Page({
    title: rec.body.title,
    content: rec.body.content
  })
  Page.beforeValidate((page, optionsObject) => {
  page.slug = generateSlug(page.title)
})
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }

})

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  console.log(wikiPage)
  try {
    const pageServed = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    // res.json(pageServed);
    res.send(wikiPage(pageServed));
  } catch (error) {
      console.log(error);
  }
});

module.exports = router;
