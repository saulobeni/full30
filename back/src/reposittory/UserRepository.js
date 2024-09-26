const UserModel = require("../models/UserModel");

const save = async (userData) => {
    const ignore = ['id', 'createdAt', 'updatedAt'];
    let requiredFileds = Object.values(UserModel.getAttributes());
    requiredFileds = requiredFileds.map(field => {
        if(!ignore.includes(field.fieldName) || field.allowNull === false) {
            return field.fieldName
        }
    });

    console.log(requiredFileds);
    if(!Object.getOwnPropertyNames(userData).includes("username")) {
        const error = new Error("Campo username é obrigatorio!")
        error.type = "ClientError";
        throw error;
    }

    return await UserModel.create(userData);
}

module.exports = {
    save
}