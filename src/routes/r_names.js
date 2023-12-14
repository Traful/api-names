import { Router } from "express";
import { getDataName } from "../controllers/c_names.js";

const rNames = Router();

//[GET]
rNames.get("/names/proccess/:name", getDataName);


export default rNames;