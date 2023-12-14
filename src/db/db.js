import mysql from "mysql2/promise";
import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE } from "./../config/config.js";

export const conn = async () => {
	var pool = null;
	try {
		/*
		pool = await mysql.createConnection({
			host: MYSQL_HOST,
			port: MYSQL_PORT,
			password: MYSQL_PASS,
			user: MYSQL_USER,
			database: MYSQL_DATABASE
		});
		*/
		pool = mysql.createPool({
			host: MYSQL_HOST,
			port: MYSQL_PORT,
			password: MYSQL_PASS,
			user: MYSQL_USER,
			database: MYSQL_DATABASE,
			waitForConnections: true,
			connectionLimit: 10,
			maxIdle: 10,
			idleTimeout: 60000,
			queueLimit: 0,
			enableKeepAlive: true,
			keepAliveInitialDelay: 0
		});
	} catch (error) {
		console.log(error);
	}
	return pool;
};