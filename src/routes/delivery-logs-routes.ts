import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { Router } from "express";
import { EnsureAuthenticator } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveryLogsController = new DeliveryLogsController();
const deliveryLogsRoutes = Router();

deliveryLogsRoutes.post(
  "/",
  EnsureAuthenticator,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
);
deliveryLogsRoutes.get(
  "/:delivery_id/show",
  EnsureAuthenticator,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.show
);

export { deliveryLogsRoutes };
