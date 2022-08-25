import express from 'express';
import TransferBetweenAccountsService from '../services/TransferBetweenAccountsService';

export default class TransferBetweenAccountsController {
  public static init(app: express.Application) {
    const router = express.Router()
    const transferService = new TransferBetweenAccountsService();

    router.post('/', async (request, response) => {
      try {
        const transferData = request.body;
        await transferService.executeTransfer(transferData.accountFromId, transferData.accountToId, transferData.amount);

        response.status(204).send();
      }
      catch( error: any ) {
        return response.status(400).send({ error: error.message });
      }
    });

    app.use('/api/v1/transferBetweenAccounts', router);
  }
}
