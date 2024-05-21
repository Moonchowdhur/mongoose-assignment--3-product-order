import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProdutRoute } from './app/modules/products/product.route';
import { OrderRoute } from './app/modules/orders/order.route';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', ProdutRoute);

app.use('/api/orders', OrderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
