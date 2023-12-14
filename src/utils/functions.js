import { conn } from "./../db/db.js";

const estimarSexo = (nombres) => {
	let totalNombres = nombres.length;
	let resp = {
		nombres: totalNombres,
		masculinos: nombres.filter(n => n.sexo === "M").length,
		femeninos: nombres.filter(n => n.sexo === "F").length,
		sexo: "N",
		exactitud: 0
	};
	if(resp.masculinos !== resp.femeninos) {
		if(resp.masculinos > resp.femeninos) {
			resp.sexo = "M";
			resp.exactitud = ((resp.masculinos * 100) / resp.nombres);
		} else {
			resp.sexo = "F";
			resp.exactitud = ((resp.femeninos * 100) / resp.nombres);
		}
	}
	return resp;
};

export const existInNames = async (value) => {
	const result = {
		valor: value,
		apellidos: null,
		nombres: null,
		sexo: null,
		exactitud: 0,
		desgloce: []
	};
	try {
		const pool = await conn();
		if(pool) {
			const palabras = value.toString().split(" ");

			var buffer = "";
			for(let index = 0; index < palabras.length; index++) {
				const palabra = palabras[index];
				buffer = buffer + `, '${palabra}'`;
			}
			buffer = buffer.substring(2);
			let [rows, fields] = await pool.query(`SELECT * FROM nombres WHERE nombre IN (${buffer})`);
			pool.end();
			buffer = [];
			for(let index = 0; index < palabras.length; index++) {
				let palabra = palabras[index];
				let encontrada = rows.filter(r => r.nombre.toUpperCase() === palabra.toUpperCase());
				buffer.push({
					palabra: palabra,
					encontrada: encontrada.length > 0 ? true : false,
					sexo: encontrada.length > 0 ? encontrada[0].sexo : "N"
				});
			}
			result.desgloce = buffer;

			let apellidos = buffer.filter(v => ((v.sexo === 'N') || (v.sexo === 'A')));
			apellidos = apellidos.map(a => a.palabra);
			apellidos = apellidos.join(" ");
			result.apellidos = apellidos;

			let nombres = buffer.filter(v => ((v.sexo === 'F') || (v.sexo === 'M')));

			let sexo = estimarSexo(nombres);
			result.sexo = sexo.sexo;
			result.exactitud = sexo.exactitud.toFixed(2);

			nombres = nombres.map(a => a.palabra);
			nombres = nombres.join(" ");
			result.nombres = nombres;
		}
	} catch (error) {
		console.log("Error en existInNames", error);
	}

	return result;
};