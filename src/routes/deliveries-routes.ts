import { DeliveriesController } from "@/controllers/deliveries-controller";
import { DeliveriesStatusController } from "@/controllers/delivery-status-controller";
import { Router } from "express";
import { EnsureAuthenticator } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(EnsureAuthenticator, verifyUserAuthorization(["sale"]));
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);

export { deliveriesRoutes };
