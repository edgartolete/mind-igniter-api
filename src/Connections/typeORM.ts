import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';
import { Signs } from '../Utils/constants';
import dotenv from 'dotenv';
import { User } from '../Models/userModel';
import { Module } from '../Models/moduleModel';
import { Set } from '../Models/setModel';
import { Question } from '../Models/questionModel';
import { Record } from '../Models/recordModel';
dotenv.config();

const environment = process.env.API_ENV || 'local';

/**
 * ### METHODS DO NOT USE IN PRODUCTION ###
 * dropSchema - Set to true to drop schema if getting an issue, then turn back to false once done. Sometimes there will be an issue with Constraints like Foreign key which this will be useful.
 * synchronize - Set to true to automatically sync database table changes.Use migrations instead.
 */

const localConnection = {
	type: 'mysql',
	host: process.env.LOCAL_DB_HOST,
	username: process.env.LOCAL_DB_USER,
	password: process.env.LOCAL_DB_PASS,
	database: process.env.LOCAL_DB_NAME,
	port: process.env.LOCAL_DB_PORT,
	logging: false,
	poolSize: 10,
	dropSchema: false,
	synchronize: true,
	entities: [User, Module, Set, Question, Record],
	migrations: []
} as DataSourceOptions;

const prodConnection = {
	type: 'mysql',
	host: process.env.PROD_DB_HOST,
	username: process.env.PROD_DB_USER,
	password: process.env.PROD_DB_PASS,
	database: process.env.PROD_DB_NAME,
	port: process.env.PROD_DB_PORT,
	logging: false,
	poolSize: 10,
	dropSchema: false,
	synchronize: false, // do not set to true, use migration instead
	entities: [User, Module, Set, Question, Record],
	migrations: [
		// 'dist/database/migrations/1696156148740-generate.js', // added users
	]
} as DataSourceOptions;

const connection: DataSourceOptions =
	{
		local: localConnection,
		production: prodConnection
	}[environment] ?? localConnection;

export const dataSource = new DataSource(connection);

export function initializeTypeORM() {
	dataSource
		.initialize()
		.then(() => {
			console.log(`${Signs.okay} TypeORM connected to the database`);
			dataSource.runMigrations();
		})
		.catch(err => {
			console.log(`${Signs.error} TypeORM Error connecting to the database: ${err}`);
		});
}

export function stopTypeORM() {
	if (dataSource.isInitialized) {
		dataSource.destroy();
	}
}
