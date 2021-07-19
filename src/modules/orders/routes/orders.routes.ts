import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array()
        .required()
        .items(
          Joi.object()
            .keys({
              id: Joi.string().uuid().required(),
              quantity: Joi.number().integer().positive().required(),
            })
            .required(),
        ),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
