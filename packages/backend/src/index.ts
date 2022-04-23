import express from 'express';
const app = express();
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { router } from './routes';
config();

app.use(cors());

const publicDirectoryPath = path.join(__dirname, '../../frontend/build');

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

app.use('/api', router);

app.listen(process.env.PORT, () => {
  return console.log('Server running on ' + process.env.PORT);
});
