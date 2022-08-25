import express from 'express';
import cors from 'cors';
import AccountController from './controllers/AccountController';
import TransferBetweenAccountsController from './controllers/TransferBetweenAccountsController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
}));

AccountController.init(app);
TransferBetweenAccountsController.init(app);

export default app;
