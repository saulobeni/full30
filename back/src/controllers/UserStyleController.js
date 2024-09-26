const UiStyleModel = require("../models/UiStyleModel");
const UserModel = require("../models/UserModel");

const updateUiStyle = async (request, response) => {
    const userId = request.params.id; // Captura o ID do usuário da rota
    const body = request.body; // Obtém o corpo da requisição

    // Adiciona user_id a cada item do corpo
    const updatedStyles = body.map(item => ({
        ...item,
        user_id: userId, 
    }));

    try {
        await UiStyleModel.bulkCreate(updatedStyles, {
            updateOnDuplicate: ['attribute', 'value', 'is_hover'],
        });

        const result = await UiStyle.findAll({ where: { user_id: userId } });

        return response.json({ result });
    } catch (error) {
        console.error('Erro ao atualizar o estilo da UI:', error);
        return response.status(500).json({ error: 'Houve um problema ao atualizar o estilo da UI.' });
    }
};

const list = async (request, response) => {
    let userId = request.params.id;

    let result = await UiStyleModel.findAll({ where : { user_id: userId } });

    return response.json(result);
}

module.exports = {
    updateUiStyle,
    list
}