const UserModel = require('../models/UserModel');
const UserRepository = require('../reposittory/UserRepository');
const jwt = require('jsonwebtoken');

const list = async (request, response) => {
    let result = await UserModel.findAll({
        order: [
            ["updatedAt", "ASC"]
        ]
    });
    response.json(result);
}

const getById = async (request, response) => {
    let id = request.params.id;
    let user = await UserModel.findOne({
        where: { id }
    });

    return response.json(user);
}

const create = async (request, response) => {
    let body = request.body;

    try {
        await UserModel.create(body);
        return response.json({
            message: "Cadastrado com sucesso"
        });
    } catch(error) {
        console.log(Object.getOwnPropertyNames(error));
        return response.json({
            message: error.message
        })
    }
}

const update = async (request, response) => {
    
    let id = request.params.id;
    let body = request.body;

    await UserModel.update(body, {
        where: { id }   
    })
    
    response.json({
        message: "Atualizado com sucesso " + id
    })
}

const deleteById = async (request, response) => {
    await UserModel.destroy({
        where: {id}
    })

    return response.json({
        message: "Usuario deletado com sucesso!"
    });
}

const createToken = async (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    let currentUser = await UserModel.findOne({
        where: {
            email,
            password
        }
    });

    if (!currentUser) {
        return response.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    let token = jwt.sign({ id: currentUser.id }, process.env.SECRET, { expiresIn: '1h' });

    return response.json({ token, userId: currentUser.id });
}


module.exports = {
    list,
    create,
    update,
    getById,
    deleteById,
    createToken
}