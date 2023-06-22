require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server is up on port ${port}`);
});
