import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { verifyAdmin } from './middlewares/verifyAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post('/tags', verifyAdmin, createTagController.handle);
router.post('/users', createUserController.handle);

export { router };
