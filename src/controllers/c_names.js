import { existInNames } from "./../utils/functions.js";

export const getDataName = async (req, res) => {
	let resp = {
		ok: true,
		msg: "",
		data: null
	};

	try {
		resp.data = await existInNames(req.params.name);
	} catch (error) {
		resp.ok = false;
		resp.msg = error.message;
	}

	res.status(resp.ok ? 200 : 409).json(resp);
};