/** this route will allow users to authenticate users */

import express, { Router } from 'express';
import { authController } from '../Controllers/authController';

const router: Router = express.Router({ mergeParams: true });

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.post('/refresh', authController.refresh);

router.post('/logout', authController.logout);

router.post('/forgot-request', authController.forgotRequest);

router.post('/forgot-verify', authController.forgotVerify);

router.post('/forgot-approved', authController.forgotApproved);

router.all('/*', (req, res) => {
	return res.json({ message: 'Invalid route' });
});

export { router as authRouter };
