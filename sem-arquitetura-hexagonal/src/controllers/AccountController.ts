import express from 'express';
import AccountService from '../services/AccountService';

export default class AccountController {
  public static init(app: express.Application) {
    const router = express.Router();
    const accountService = new AccountService();

    router.post('/deposit', async (request, response) => {
      try {
        await accountService.depositIntoAccount(request.body.accountId, request.body.amount);
    
        return response.status(204).send();
      }
      catch( error: any) {
        return response.status(400).send({ error: error.message });
      }
    });
    
    router.post('/withdrawal', async (request, response) => {
      try {
        await accountService.withdrawAccount(request.body.accountId, request.body.amount);
    
        return response.status(204).send();
      }
      catch( error: any) {
        return response.status(400).send({ error: error.message });
      }
    });
    
    router.post('/', async (request, response) => {
      try {
        const newAccount = await accountService.createAccount(request.body.id, request.body.initialBalance);

        return response.status(201).send(newAccount);
      }
      catch( error: any ) {
        return response.status(400).send({ error: error.message });
      }
    });
    
    router.get('/getCurrentBalance/:id', async (request, response) => {
      try {
        const currentBalance = await accountService.getCurrentBalance(request.params.id);
    
        return response.status(200).send({currentBalance});
      }
      catch ( error: any ) {
        return response.status(400).send({ error: error.message });
      }
    });

    app.use('/api/v1/accounts', router);
  }
}
