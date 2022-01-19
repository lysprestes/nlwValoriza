import express from 'express';

// @types/express
const app = express();

app.post('/test-post', (req, res) => {
  return res.send('Hello World!');
});

app.listen(3000, () => console.log('Server is running'));