import express from 'express';
import parser from 'body-parser';
import router from './routes';

const app = express();

app.use(parser.json());
app.use('/api/v1', router);

app.listen(process.env.PORT || 4567);

export default app;
