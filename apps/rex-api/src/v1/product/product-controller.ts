import * as Joi from 'joi';
import { Product, Transaction } from '@solid-octo-couscous/model';
import { green, red } from 'chalk';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { isEmpty as _isEmpty, isNil as _isNil } from 'lodash';
import { BAD_REQUEST, GONE, INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { ValidationError } from 'joi';

import { SqlLiteDatabase } from '../../database/sql-lite-database';

@autoInjectable()
export class ProductController {
	private readonly baseTransaction: Transaction<Product> = {
		success: false,
		data: {} as Product,
	};

	private readonly productIdValidator = Joi.object().keys({
		productId: Joi.number().required().min(0),
	});

	private readonly updateProductValidator = Joi.object().keys({
		id: Joi.number().required(),
		color: Joi.string().optional(),
		cost: Joi.number().optional(),
		name: Joi.string().optional(),
		retired: Joi.number().optional(),
		size: Joi.string().optional(),
	});

	private readonly createProductValidator = Joi.object().keys({
		color: Joi.string().required(),
		cost: Joi.number().required(),
		name: Joi.string().required(),
		retired: Joi.number().required(),
		size: Joi.string().required(),
	});

	constructor(public sqlLiteDataBase?: SqlLiteDatabase) {}

	public readonly findOne = async ({ params }: Request, response: Response) => {
		try {
			const { error } = this.productIdValidator.validate(params);
			if (!_isEmpty(error)) {
				this.badRequest(response, error);
			} else {
				this.sqlLiteDataBase.database.serialize(() => {
					const query = this.sqlLiteDataBase.productFindOnPrimaryKey.replace('?', params.productId);

					console.log(green(`[Server] executing query: ${query}`));

					this.sqlLiteDataBase.database.get(query, (error: Error | null, row) => {
						console.log(green(`[Server] found product ${JSON.stringify(row)}`));

						response.status(OK).send({
							success: true,
							data: {
								color: row?.color,
								cost: row?.cost,
								id: row?.id,
								name: row?.name,
								retired: row?.retired,
								size: row?.size,
							} as Product,
						});

						// we only care about the first result in this case, so i'm returning early.
						return;
					});
				});
			}
		} catch (err) {
			this.internalServerError(response, err);
		}
	};

	public readonly update = ({ body }: Request, response: Response) => {
		try {
			const { error } = this.updateProductValidator.validate(body);

			if (!_isEmpty(error)) {
				this.badRequest(response, error);
			} else {
				this.sqlLiteDataBase.database.serialize(() => {
					const query = this.sqlLiteDataBase.database.productFindOnPrimaryKey.replace('?', body.id);

					console.log(green(`[Server] executing query: ${query}`));

					this.sqlLiteDataBase.database.get(query, (error: Error | null, row) => {
						this.gone(row, response);

						console.log(green(`[Server] found product ${JSON.stringify(row)}`));

						const { id, color, cost, name, retired, size } = body as Product;
						const updatedProduct = {
							...row,
							...{ id, color, cost, name, retired, size },
						} as Product;

						const stmt = this.sqlLiteDataBase.database.prepare(this.sqlLiteDataBase.productUpdateStatement);

						stmt.run(
							updatedProduct?.color,
							updatedProduct?.name,
							updatedProduct?.retired,
							updatedProduct?.size,
							updatedProduct?.cost,
							updatedProduct?.id
						);
						stmt.finalize();

						response.status(OK).send({
							success: true,
							data: {
								color: updatedProduct?.color,
								cost: updatedProduct?.cost,
								id: updatedProduct?.id,
								name: updatedProduct?.name,
								retired: updatedProduct?.retired,
								size: updatedProduct?.size,
							} as Product,
						});

						// we only care about the first result in this case, so i'm returning early.
						return;
					});
				});
			}
		} catch (error) {
			this.internalServerError(response, error);
		}
	};

	public readonly remove = async ({ params }: Request, response: Response) => {
		try {
			const { error } = await this.productIdValidator.validateAsync(params);

			if (!_isEmpty(error)) {
				this.badRequest(response, error);
			} else {
				this.sqlLiteDataBase.database.serialize(() => {
					// begin preparing to remove on primary key.
					const stmt = this.sqlLiteDataBase.database.prepare(this.sqlLiteDataBase.productDeleteOnPrimaryKey);

					console.log(green(`[Server] executing query: ${this.sqlLiteDataBase.productDeleteOnPrimaryKey}`));

					stmt.run(params.productId);
					stmt.finalize();

					const queryForRemovedData = this.sqlLiteDataBase.productFindOnPrimaryKey.replace(
						'?',
						params.productId
					);

					console.log(green(`[Server] executing query: ${queryForRemovedData}`));

					this.sqlLiteDataBase.database.get(queryForRemovedData, (error: Error | null, row) => {
						console.log(green(`[Server] product was not found. ${JSON.stringify(row)}`));

						response.status(OK).send({ success: true, data: { id: params.productId } });

						// we only care about the first result in this case, so i'm returning early.
						return;
					});
				});
			}
		} catch (error) {
			console.log(red(`[Server] ${error})`));
			response.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
		}
	};

	public readonly create = async ({ body }: Request, response: Response) => {
		try {
			const { error } = this.createProductValidator.validate(body);

			if (!_isEmpty(error)) {
				this.badRequest(response, error);
			} else {
				this.sqlLiteDataBase.database.serialize(() => {
					// begin creating an insert statement.
					console.log(green(`[Server] executing query: ${this.sqlLiteDataBase.productInsertStatement}`));
					const stmt = this.sqlLiteDataBase.database.prepare(this.sqlLiteDataBase.productInsertStatement);
					stmt.run(body.color, body.name, body.retired, body.size, body.cost);
					stmt.finalize();
					// begin going to find the newly inserted value from the database.
					console.log(green(`[Server] executing query: ${this.sqlLiteDataBase.productFindOnMaxPrimaryKey}`));

					this.sqlLiteDataBase.database.get(
						this.sqlLiteDataBase.productFindOnMaxPrimaryKey,
						(error: Error | null, row) => {
							console.log(green(`[Server] found product: ${JSON.stringify(row)}`));

							response.status(OK).send({
								success: true,
								data: {
									color: row?.color,
									cost: row?.cost,
									id: row?.id,
									name: row?.name,
									retired: row?.retired,
									size: row?.size,
								} as Product,
							});

							// we only care about the first result in this case, so i'm returning early.
							return;
						}
					);
				});
			}
		} catch (error) {
			await this.internalServerError(response, error);
		}
	};

	private readonly gone = (row: any, response: Response) => {
		if (_isNil(row)) {
			console.log(red(`[Server] Resource was not found and was ${JSON.stringify(row)}`));

			response.status(GONE).send({
				...this.baseTransaction,
				message: 'Resource is gone',
			} as Transaction<Product>);
		}
	};

	private readonly badRequest = async (response: Response, error: ValidationError | undefined) => {
		console.log(red(`[Server] Invalid data format was sent to the server ${JSON.stringify(error?.details)}`));

		response.status(BAD_REQUEST).send({
			...this.baseTransaction,
			message: 'Bad Request',
		} as Transaction<Product>);
	};

	private readonly internalServerError = async (response: Response, error: Error) => {
		console.log(red(`[Server] Internal server error was: ${error}`));
		response.status(INTERNAL_SERVER_ERROR).send({
			...this.baseTransaction,
			message: 'Internal Server Error',
		} as Transaction<Product>);
	};
}
