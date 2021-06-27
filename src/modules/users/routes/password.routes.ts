import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgoPasswordController from '../controllers/ForgotPasswordControler';

const passwordRouter = Router();
const forgotPasswordController = new ForgoPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

export default passwordRouter;
