import { NextFunction, Request, Response } from "express";

import { InvoiceService } from "../services";
import logger from "../utils/winston";
class InvoiceController {
  constructor() {}

  // ------------------ CREATE --------------------
  async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InvoiceService.createInvoice(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  // ------------------ GET ALL --------------------

  async getInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InvoiceService.getInvoice(req);
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  // ------------------ User Details Invoice --------------------

  async inovoiceUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InvoiceService.invoiceUserDetail(req);
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  // ------------------ GET BY ID --------------------

  async getInvoiceById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InvoiceService.getInvoiceById(
        req.params.id as any,
      );
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  // ------------------ UPDATE --------------------

  async updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InvoiceService.updateInvoice(
        req.params.id as any,
        req.body,
      );
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  // ------------------ DELETE --------------------

  async deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InvoiceService.deleteInvoice(req.params.id as any);
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
}

export default new InvoiceController();
