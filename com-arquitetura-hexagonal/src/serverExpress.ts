import ExpressHttp from "./infra/http/ExpressHttp";
import PostgresqlConnection from './infra/database/PostgresqlConnection';
import AccountsRepositoryPostgresSQL from './infra/repositories/database/AccountsRepositoryPostgresSQL';
import TransferBetweenAccountsRepositoryPostgresSQL from './infra/repositories/database/TransferBetweenAccountsRepositoryPostgresSQL';
import AccountsController from './infra/http/controllers/AccountsController';
import TransferBetweenAccountsController from './infra/http/controllers/TransferBetweenAccountsController';

const PORT = 3000;

const http = new ExpressHttp();
const dbConnection = new PostgresqlConnection();
const accountsRepository = new AccountsRepositoryPostgresSQL(dbConnection);
const transferBetweenAccountsRepository = new TransferBetweenAccountsRepositoryPostgresSQL(dbConnection);
const accountsController = new AccountsController(http, accountsRepository);
accountsController.init();
const transferBetweenAccountsController = new TransferBetweenAccountsController(http, transferBetweenAccountsRepository, accountsRepository);
transferBetweenAccountsController.init();

http.listen(3000);
console.log(`App running on port: ${PORT}.`);
