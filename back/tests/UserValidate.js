
function UserValidate(dadosDoUsuario) {
    if(!dadosDoUsuario.email) {
        return false;
    }

    return true;
}

module.exports = UserValidate
