import { Router } from "express";

import InvoiceController from "../controller/Invoice.controller.js";

// import { validator } from "../middleware";
export const router: Router = Router();

router.post("/", InvoiceController.createInvoice);
// router.post("/", validator(createCategoryJoi), InvoiceController.createInvoice);
router.get("/", InvoiceController.getInvoice);
router.get("/detail", InvoiceController.inovoiceUserDetails);
router.get("/stats", InvoiceController.getStats);

router.get("/:id", InvoiceController.getInvoiceById);

router.patch("/:id", InvoiceController.updateInvoice);
router.delete("/:id", InvoiceController.deleteInvoice);
