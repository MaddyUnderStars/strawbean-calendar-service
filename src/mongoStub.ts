import { Db, MongoClient } from "mongodb";

class MongoStub {
	mongo: MongoClient;
	db?: Db;

	constructor(url: string) {
		this.mongo = new MongoClient(url);
	}

	connect = async () => {
		this.mongo.connect();
		this.db = this.mongo.db(process.env.DB);
	}
}

export default new MongoStub(process.env.MONGO_URL as string);