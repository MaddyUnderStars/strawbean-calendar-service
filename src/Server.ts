import http from "http";
import express from "express";
import MongoStub from "./mongoStub";
import fs from "fs/promises";
import path from "path";

class Server {
	web: http.Server;
	app: express.Application;

	constructor() {
		this.app = express();
		this.web = http.createServer(this.app);
	}

	start = async (port: number) => {
		await MongoStub.connect();

		await this._importRoutes();

		this.web.listen(port, () => {
			console.log(`listening on port ${port}`);
		});
	};

	_importRoutes = async () => {
		this.app.get("/", (req, res) => {
			res.send(">:D")
		})

		const files = await fs.readdir(path.resolve("build/routes"));
		for (var file of files) {
			if (file.indexOf(".map") !== -1) continue;	//source maps
			const imported = (await import(`./routes/${file}`)).default as express.Router;

			this.app.use(imported);
		}
	};
}

export default Server;