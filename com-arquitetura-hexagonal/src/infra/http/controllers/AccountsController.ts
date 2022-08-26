import AccountsRepository from "../../../application/ports/AccountsRepository";
import AccountService from "../../../application/services/AccountService";
import Http from "../Http";

const ROUTES_PREFIX = '/api/v1/accounts';

export default class AccountsController {
  accountService: AccountService;

  constructor (readonly http: Http, readonly accountRepository: AccountsRepository) {
    this.accountService = new AccountService(accountRepository);
  }

  init () {
    this.http.addRoute('POST', ROUTES_PREFIX + '/deposit', async (params: any, body: any) => {
        await this.accountService.depositIntoAccount(body.accountId, body.amount);
        return '';
    });
    
    this.http.addRoute('POST', ROUTES_PREFIX + '/withdrawal', async (params: any, body: any) => {
      await this.accountService.withdrawAccount(body.accountId, body.amount);
      return '';
    });
    
    this.http.addRoute('POST', ROUTES_PREFIX + '/', async (params: any, body: any) => {
      return this.accountService.createAccount(body.id, body.initialBalance);
    });
    
    this.http.addRoute('GET', ROUTES_PREFIX + '/getCurrentBalance/:id', async (params: any, body: any) => { 
      return this.accountService.getCurrentBalance(params.id);
    });
  }
}
