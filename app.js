const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const activityRouter = require('./routes/activityRoute');
const cors = require('cors');

mongoose
  .connect(`mongodb://admin:admin_12345@ds315359.mlab.com:15359/activity-db`, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/activities', activityRouter);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log('server has started');
});
