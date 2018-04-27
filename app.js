const express = require("express");
const morgan = require("morgan");
const userRoute = require('./routes/user');
const wikiRoute = require('./routes/wiki');
const app = express();
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
app.use('/user', userRoute);

init();
