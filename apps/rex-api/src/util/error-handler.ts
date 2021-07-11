import { NextFunction, Request, Response } from 'express';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';
import { singleton } from 'tsyringe';

@singleton()
export class ErrorHandler {
	public notFound(req: Request, res: Response, _: NextFunction): void {
		res.status(NOT_FOUND);
		res.json({
			success: false,
			message: 'Requested Resource Not Found',
		});
		res.end();
	}

	public internalServerError(err: any, req: Request, res: Response, _: NextFunction): void {
		res.status(err.status || INTERNAL_SERVER_ERROR);
		res.json({
			message: err.message,
			extra: err.extra,
			errors: err,
		});
		res.end();
	}
}
