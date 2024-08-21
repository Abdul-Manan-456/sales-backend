import express, { Router } from "express";
const indexRouter: Router = express.Router();

import { router as authRouter } from "./auth.routes.js";
import { router as categoryRouter } from "./category.routes.js";
import { router as invoiceRouter } from "./invoice.routes.js";
import { router as userRouter } from "./user.routes.js";
const routes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/category",
    router: categoryRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/invoice",
    router: invoiceRouter,
  },
];
routes.forEach((route) => {
  indexRouter.use(route.path, route.router);
});
export default indexRouter;
