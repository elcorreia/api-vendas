import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productController = new ProductsController();

productsRouter.get('/', productController.index);
productsRouter.get('/:id', productController.show);
productsRouter.post('/', productController.create);
productsRouter.put('/:id', productController.update);
productsRouter.delete('/:id', productController.delete);

export default productsRouter;
