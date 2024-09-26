
const UserValidate = require("./UserValidate");

test("UserValidate deve retornar uma erro", () => {
    let resultado = UserValidate({});
    expect(resultado).toBe("Email é obrigatorio!")
});

test("UserValidate deve retornar true", () => {
    let resultado = UserValidate({
        email: "123"
    });
    expect(resultado).toBe(true);
})