import Http from "./Http";
import express from "express";
import cors from "cors";
import HttpResponse from "./HttpResponse";

export default class ExpressHttp implements Http {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: false}));
		this.app.use(cors({
			origin: '*'
		}));
	}

	setMiddleware(fn: any): void {
		this.app.use(function (req: any, res: any, next: any) {
			try {
				fn(req.params, req.body, req.headers);
				next();
			} catch (e) {
				res.status(400).end();
			}
		});	
	}

	addRoute(method: string, url: string, callback: Function): void {
		this.app[method.toLowerCase()](url, async (req: any, res: any) => {
			try {
				const response: HttpResponse = await callback(req.params, req.body);
				res.status(response.statusCode).json(response.body);
			} catch (e: any) {
				res.status(400).json({ error: e.message });
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port);
	}
}
