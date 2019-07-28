import express from 'express';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './route/userRoute';

require('dotenv').config();

const app = express();

const port = process.env.PORT || 9000;


app.use(express.json());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(morgan('combined'));
app.use(cors());


app.get('/', (req, res) => {
    res.send('Server started');
});


// server
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Started On Port ${port}`);
});
  
export default app;
