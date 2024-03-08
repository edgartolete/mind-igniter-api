import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Response } from 'express';
import { ResponseTypes } from './constants';

type PBKDF = { key: string; salt: string };

export const secure = {
	salt: (num: number) => {
		return crypto.randomBytes(num).toString('hex');
	},
	hash: async (text: string) => {
		return await bcrypt.hash(text, 10);
	},
	compare: async (text: string, hash: string) => {
		return await bcrypt.compare(text, hash);
	},
	generatePBKDF2Key: (text: string, salt: string = crypto.randomBytes(16).toString('hex')): Promise<PBKDF> => {
		const iterations = 10000;
		const keyLength = 64;

		return new Promise((resolve, reject) => {
			crypto.pbkdf2(text, salt, iterations, keyLength, 'sha256', (err, derivedKey) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve({ key: derivedKey.toString('hex'), salt: salt });
				}
			});
		});
	},
	encrypt: (text: string, key16Bytes: string) => {
		const iv = crypto.randomBytes(12);
		const cipher = crypto.createCipheriv('aes-256-gcm', key16Bytes, iv);
		const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
		const tag = cipher.getAuthTag();
		const result = iv.toString('hex') + encrypted.toString('hex') + tag.toString('hex');
		return result;
	},
	decrypt: (text: string, key16Bytes: string) => {
		const ivHex = text.slice(0, 24);
		const encryptedText = text.slice(24, -32);
		const tagHex = text.slice(-32);

		const iv = Buffer.from(ivHex, 'hex');
		const encrypted = Buffer.from(encryptedText, 'hex');
		const tag = Buffer.from(tagHex, 'hex');

		const decipher = crypto.createDecipheriv('aes-256-gcm', key16Bytes, iv);
		decipher.setAuthTag(tag);

		let decrypted = decipher.update(encrypted);
		decrypted = Buffer.concat([decrypted, decipher.final()]);

		return decrypted.toString('utf8');
	}
};

export const JsonResponse = {
	success: (res: Response, message = 'Request Successful', content: any = null) => {
		res.status(200);
		res.json({ result: ResponseTypes.success, message, content });
	},
	nothingAffected: (res: Response, message = 'Nothing Affected.', content: any = null) => {
		res.status(200);
		res.json({ result: ResponseTypes.failed, message, content });
	},
	incompleteData: (res: Response, message = 'One or more required information is missing.', content: any = null) => {
		res.status(422);
		res.json({ result: ResponseTypes.invalid, message, content });
	},
	unauthorized: (
		res: Response,
		message: string = 'Required credentials are not provided/invalid.',
		content: any = null
	) => {
		res.status(401);
		res.json({ result: ResponseTypes.unauthorized, message, content });
	},
	failed: (res: Response, message = 'Request Failed.', content: any = null) => {
		res.status(200);
		res.json({ result: ResponseTypes.failed, content, message });
	},
	error: (res: Response, err: unknown) => {
		res.status(500);
		if (err instanceof Error) {
			res.json({
				result: err.name,
				message: err.message,
				content: err.stack
			});
		} else {
			res.json({
				result: ResponseTypes.error,
				message: 'Try Catch Error. Error not Instance of Error',
				content: err
			});
		}
	}
};
