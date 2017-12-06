import express from "express";

//controller imports
import poolController from "./controllers/poolController";

const routes = express();

//post routes
routes.post("/pool",poolController);

//get routes
routes.get("/pool",poolController);

export default routes;