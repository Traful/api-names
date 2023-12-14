import puppeteer from "puppeteer";
import { conn } from "./db/db.js";
import { getDataNames } from "./utils/scrap.js";

export const getDataNames = async () => {
	const browser = await puppeteer.launch({
		headless: "new"
	});
	const page = await browser.newPage();
	await page.goto("https://buenosaires.gob.ar/areas/registrocivil/nombres/busqueda/imprimir.php#");
	const items = await page.evaluate(() => {
		let tBodyRows = document.querySelector("table.contenido").tBodies[0].rows;
		let buffer = [];
		for(let index = 0; index < tBodyRows.length; index++) {
			const element = tBodyRows[index];
			buffer.push({
				nombre: element.cells[0].innerHTML,
				sexo: element.cells[1].innerHTML
			});
		}
		return buffer;
	});
	await browser.close();
	return items;
};

export const saveNames = async () => {
	const pool = await conn();
	if(pool) {
		try {
			const names = await getDataNames();
			if(names && names.length > 0) {
				await pool.query("TRUNCATE TABLE nombres");
				console.log(`Iniciando la carga de ${names.length} nombres.`);
				for(let index = 0; index < names.length; index++) {
					const name = names[index];
					await pool.execute("INSERT INTO nombres SET nombre = ?, sexo = ?", [name.nombre, name.sexo]);
				}
			}
		} catch (error) {
			console.log(error.sqlMessage || error.message || "Ocurrió un error al intentar la consulta");
			return false;
		}
	}
	return true;
};