import AccountsRepository from "../../../application/ports/AccountsRepository";
import AccountService from "../../../application/services/AccountService";
import Http from "../Http";
import HttpResponse from '../HttpResponse';

const ROUTES_PREFIX = '/api/v1/accounts';

export default class AccountsController {
  accountService: AccountService;

  constructor (readonly http: Http, readonly accountRepository: AccountsRepository) {
    this.accountService = new AccountService(accountRepository);
  }

  init () {
    this.http.addRoute('POST', ROUTES_PREFIX + '/deposit', async (params: any, body: any) => {
        await this.accountService.depositIntoAccount(body.accountId, body.amount);
        return new HttpResponse('', 204);
    });
    
    this.http.addRoute('POST', ROUTES_PREFIX + '/withdrawal', async (params: any, body: any) => {
      await this.accountService.withdrawAccount(body.accountId, body.amount);
      return new HttpResponse('', 204);
    });
    
    this.http.addRoute('POST', ROUTES_PREFIX + '/', async (params: any, body: any) => {
      return new HttpResponse(await this.accountService.createAccount(body.id, body.initialBalance), 201);
    });
    
    this.http.addRoute('GET', ROUTES_PREFIX + '/getCurrentBalance/:id', async (params: any, body: any) => { 
      return new HttpResponse({currentBalance: await this.accountService.getCurrentBalance(params.id)}, 200);
    });
  }
}
