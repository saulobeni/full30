const UiStyleModel = require("../models/UiStyleModel");
const UserModel = require("../models/UserModel");

const updateUiStyle = async (request, response) => {
    const userId = request.params.id; // Captura o ID do usuário da rota
    const body = request.body; // Obtém o corpo da requisição

    // Cria um array de estilos a partir do objeto recebido
    const updatedStyles = [];

    // Itera sobre as chaves do objeto recebido
    for (const [key, value] of Object.entries(body)) {
        updatedStyles.push({
            user_id: userId,
            attribute: key, // Usando a chave do objeto como atributo
            value: typeof value === 'object' ? JSON.stringify(value) : value, // Converte para string se for um objeto
            is_hover: false // Definindo um valor padrão
        });
    }

    try {
        await UiStyleModel.bulkCreate(updatedStyles, {
            updateOnDuplicate: ['value', 'is_hover'], // Atualiza valor e hover em caso de duplicata
        });

        const result = await UiStyleModel.findAll({ where: { user_id: userId } });

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