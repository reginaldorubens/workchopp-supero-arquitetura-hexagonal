import Http from "./Http";
import Hapi from "@hapi/hapi";

export default class HapiHttp implements Http {
    server: Hapi.Server;

    constructor () {
        this.server = Hapi.server({});
    }

    convertUrl (url: string) {        
        const urlWithConvertedParameters = this.convertUrlParameters(url);
        return urlWithConvertedParameters.replace(/\$/g, "");
    }

    convertUrlParameters(url: string) {
        let urlParts = url.split('/');
        for (let p = 0; p < urlParts.length; p++) {
            if (urlParts[p].indexOf(':') >= 0) {
                urlParts[p] = '{' + urlParts[p].replace(':', '') + '}';
            }
        }

        return urlParts.join('/');
    }

	setMiddleware(fn: any): void {
		throw new Error("Method not implemented.");
	}

    async addRoute(method: string, url: string, fn: any): Promise<void> {
        this.server.route({
            method,
            path: this.convertUrl(url),
            handler: async function (request: any, h: any) {
                try {
                    const data = await fn(request.params, request.payload);
                    return data;
                }
                catch( e: any) {
                    return h.response({error: e.message}).code(400);
                }
            }
        });
    }

    async listen(port: number): Promise<void> {
        this.server.settings.port = port;
        await this.server.start();
    }
}
