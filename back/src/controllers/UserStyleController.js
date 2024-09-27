const UiStyleModel = require("../models/UiStyleModel");

const updateUiStyle = async (request, response) => {
    const userId = request.params.id;
    const body = request.body;

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
            is_hover: false
        };

        if (existingStyle) {
            return existingStyle.update(styleData);
        } else {
            return UiStyleModel.create(styleData);
        }
    });

    try {
        await Promise.all(updatePromises);

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