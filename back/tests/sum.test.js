const sum = require("./sum");

test('Testando função de soma', () => {
    expect(sum(1, 3)).toBe(4);
});