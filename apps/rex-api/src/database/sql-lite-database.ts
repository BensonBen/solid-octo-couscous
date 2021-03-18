import { Product } from '@solid-octo-couscous/model';
import { Database } from 'sqlite3';
import { isEmpty as _isEmpty } from 'lodash';
import { red, green } from 'chalk';
import { singleton } from 'tsyringe';

@singleton()
export class SqlLiteDatabase {
	private readonly databaseMode: string | ':memory:' = ':memory:';
	private readonly logger = console.log;
	private readonly loggerPrefix: string = '[SqlLiteDatabase]'

	private readonly productTableName: string = 'Products';
	private readonly primaryColumn: keyof Product = 'id';
	private readonly colorColumn: keyof Product = 'color';
	private readonly costColumn: keyof Product = 'cost';
	private readonly nameColumn: keyof Product = 'name';
	private readonly retiredColumn: keyof Product = 'retired';
	private readonly sizeColumn: keyof Product = 'size';

	private readonly createProductSchema: string = `
  CREATE TABLE IF NOT EXISTS ${this.productTableName} (
    ${this.primaryColumn} ${'INTEGER'} PRIMARY KEY AUTOINCREMENT,
    ${this.colorColumn} ${'TEXT'} NOT NULL,
    ${this.nameColumn} ${'TEXT'} NOT NULL,
    ${this.retiredColumn} ${'INTEGER'} DEFAULT 0,
    ${this.sizeColumn} ${'INTEGER'} DEFAULT 0,
    ${this.costColumn} ${'INTEGER'} DEFAULT 0
  );`;

	public readonly productFindOnMaxPrimaryKey: string = `SELECT * FROM ${this.productTableName} WHERE ${this.primaryColumn}=(SELECT MAX(${this.primaryColumn}) FROM ${this.productTableName});`;
	public readonly productInsertStatement: string = `INSERT INTO ${this.productTableName} (${this.colorColumn}, ${this.nameColumn}, ${this.retiredColumn}, ${this.sizeColumn}, ${this.costColumn}) VALUES(?, ?, ?, ?, ?);`;
	public readonly productUpdateStatement: string = `UPDATE ${this.productTableName} SET ${this.colorColumn}=?, ${this.nameColumn}=?, ${this.retiredColumn}=?, ${this.sizeColumn}=?, ${this.costColumn}=? WHERE ${this.primaryColumn} = ?;`;
	public readonly productDeleteOnPrimaryKey: string = `DELETE FROM ${this.productTableName} WHERE ${this.primaryColumn} =?;`;
	public readonly productFindOnPrimaryKey: string = `SELECT * FROM ${this.productTableName} WHERE ${this.primaryColumn} =?;`;
	public database: Database;

	private readonly dummyData: Array<Omit<Product, 'id'>> = [
		{
			color: 'blue',
			cost: 1,
			name: 'whoa',
			retired: 1,
			size: 'small',
		},
		{
			color: 'blue',
			cost: 1,
			name: 'whoa',
			retired: 1,
			size: 'large',
		},
	];

	constructor() {
		this.database = new Database(this.databaseMode, (error: Error | null) => {
			if (_isEmpty(error)) {
				this.logger(green(`${this.loggerPrefix} Successfully connected to the database.`));
			} else {
				this.logger(
					red(
						`${this.loggerPrefix} Something went wrong creating the databse: ${(error || { stack: null }).stack ?? 'message stack was nullish.'
						}`
					)
				);
			}
		});

		this.populate();
	}

	private readonly populate = (): void => {
		this.database.serialize(() => {
			this.database.run(this.createProductSchema);
			const stmt = this.database.prepare(this.productInsertStatement);
			this.dummyData.forEach(product => {
				stmt.run(product.color, product.name, product.retired, product.size, product.cost);
			});
			stmt.finalize();
		});
	}
}
