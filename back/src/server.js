require("dotenv").config();

const express = require('express');
const cors = require("cors");
const app = express();
const port = 3333;

app.use(cors());

app.use(express.json());

const UserController = require('./controllers/UserController');
const UserStyleController = require('./controllers/UserStyleController');
const UserAuth = require('./middlewares/UserAuth');

const PrivateRoutes = express.Router();
const PublicRoutes = express.Router();

PrivateRoutes.use(UserAuth);

PrivateRoutes.get('/users', UserController.list); // Listar todos os usuarios
app.get('/users/:id', UserController.getById); // Exibir um usuario
PublicRoutes.post('/users', UserController.create); // Criar um novo usuario
PrivateRoutes.put('/users/:id', UserController.update); // Atualizar um usuario
PrivateRoutes.delete('/users/:id', UserController.deleteById); // Delete um usuario
PublicRoutes.post('/user/token', UserController.createToken); // Gerar token do usuario

PrivateRoutes.get('/user/:id/uistyle', UserStyleController.list);
PrivateRoutes.put('/user/:id/uistyle', UserStyleController.updateUiStyle);

app.use(PublicRoutes);
app.use(PrivateRoutes);


app.listen(port);