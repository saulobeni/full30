const LinkModel = require("../models/LinkModel");

const createLink = async (request, response) => {
    const userId = request.params.id;
    const { label, url, title, description } = request.body;

    try {
        // Verifica se os dados obrigatórios estão presentes
        if (!label || !url) {
            return response.status(400).json({ error: 'Os campos "label" e "url" são obrigatórios.' });
        }

        // Cria um novo link
        const newLink = await LinkModel.create({
            user_id: userId,
            label,
            url,
            title,
            description
        });

        return response.status(201).json(newLink);
    } catch (error) {
        console.error('Erro ao criar o link:', error);
        return response.status(500).json({ error: 'Houve um problema ao criar o link.' });
    }
};

const list = async (request, response) => {
    const userId = request.params.id;

    try {
        // Busca todos os links para o usuário específico
        const result = await LinkModel.findAll({ where: { user_id: userId } });

        // Verifica se há resultados
        if (result.length === 0) {
            return response.status(404).json({ message: 'Nenhum link encontrado para este usuário.' });
        }

        return response.json(result);
    } catch (error) {
        console.error('Erro ao listar os links:', error);
        return response.status(500).json({ error: 'Houve um problema ao listar os links.' });
    }
};

module.exports = {
    createLink,
    list
};
