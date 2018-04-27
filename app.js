const express = require("express");
const morgan = require("morgan");
const app = express();
const userRoute = require('./routes/users');
const wikiRoute = require('./routes/wiki');
const models = require('./models');
const PORT = 1337;
// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const init = async () => {
  try {
    await models.db.sync({force: true});
    app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
  } catch (error){
    console.log(error);
  }
};


app.use('/wiki', wikiRoute);
app.use('/users', userRoute);
app.get('/', (req, res) => {
  res.redirect('/wiki');
})

init();
