import { Router } from "express";
import customer from "./customer";

const routes = Router();

customer(routes);

export default routes;