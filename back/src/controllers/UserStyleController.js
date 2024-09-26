const UiStyleModel = require("../models/UiStyleModel");

const updateUiStyle = async (request, response) => {
    const userId = request.params.id; // Captura o ID do usuário da rota
    const body = request.body; // Obtém o corpo da requisição

    // Itera sobre as chaves do objeto recebido
    const updatePromises = Object.entries(body).map(async ([key, value]) => {
        const existingStyle = await UiStyleModel.findOne({
            where: {
                user_id: userId,
                attribute: key
            }
        });

        const styleData = {
            user_id: userId,
            attribute: key,
            value: typeof value === 'object' ? JSON.stringify(value) : value,
            is_hover: false // Definindo um valor padrão
        };

        if (existingStyle) {
            // Se o estilo existir, atualiza
            return existingStyle.update(styleData);
        } else {
            // Se não existir, cria um novo
            return UiStyleModel.create(styleData);
        }
    });

    try {
        // Executa todas as promessas de atualização/criação
        await Promise.all(updatePromises);

        // Busca todos os estilos do usuário após as atualizações
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