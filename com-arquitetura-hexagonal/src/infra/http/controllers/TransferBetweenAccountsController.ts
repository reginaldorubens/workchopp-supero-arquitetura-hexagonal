import TransferBetweenAccountsRepository from '../../../application/ports/TransferBetweenAccountsRepository';
import AccountsRepository from '../../../application/ports/AccountsRepository';
import TransferBetweenAccountsService from '../../../application/services/TransferBetweenAccountsService';
import Http from '../Http';

const ROUTES_PREFIX = '/api/v1/transferBetweenAccounts';

export default class TransferBetweenAccountsController {
  transferService: TransferBetweenAccountsService;

  constructor(readonly http: Http, readonly transferBetweenAccountsRepository: TransferBetweenAccountsRepository,
    readonly accountsRepository: AccountsRepository) {
    this.transferService = new TransferBetweenAccountsService(transferBetweenAccountsRepository, accountsRepository);
  }

  init() {
    this.http.addRoute('post', ROUTES_PREFIX + '/', async (params: any, body: any) => {
      await this.transferService.executeTransfer(body.accountFromId, body.accountToId, body.amount);

      return '';
    });
  }
}
