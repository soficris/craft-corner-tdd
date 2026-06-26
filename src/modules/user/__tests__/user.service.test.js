import {describe, it, expect, beforeEach} from 'vitest'; 
import * as userService from '../user.service.js'; 
import { where } from 'sequelize';
import { id } from 'happy-dom/lib/PropertySymbol.js';

describe('User Service - Usuários', () => {
    let MockUserModel;
    let MockBcrypt;

    beforeEach( () => {
        MockUserModel = {
            findOne: vi.fn(), 
            create: vi.fn()
        };
        MockBcrypt = {
            hash: vi.fn(), 
            compare: vi.fn()
        };
    })

    //1. Teste para criptografia de senha 
    it('Deve criptografar a senha do usuário ao criar um novo usuário', async () => {

        // Simula a função de hash do bcrypt para retornar uma senha criptografada
        MockBcrypt.hash.mockResolvedValue('hashedPassword');

        // Chama a função de criação de usuário com os mocks
        await userService.createUser(
            { 
                name: 'Sofia', 
                email: 'sofia@example.com', 
                password: 'plainPassword' 
            }, 
            MockUserModel, MockBcrypt
        );

        // Verifica se a função de hash foi chamada com a senha correta e o número de saltos
        expect(MockBcrypt.hash)
        .toHaveBeenCalledWith('plainPassword', 10);

        //Verifica ao criar o usuário, os dados estão corretos
        expect(MockUserModel.create)
        .toHaveBeenCalledWith({
            name: 'Sofia', 
            email: 'sofia@example.com', 
            password: 'hashedPassword'
        });
    })

    //2. Teste para impedir login com senha incorreta
    it('Deve impedir login com senha incorreta', async () => {

        // Simula a busca do usuário no banco de dados
        MockUserModel.findOne.mockResolvedValue({
            id: 1,
            email: 'sofia@example.com',
            password: 'hashedPassword'
        }); 

        // Simula a comparação de senha, retornando false para indicar senha incorreta
        MockBcrypt.compare.mockResolvedValue(false);

        // Tenta fazer login com a senha incorreta e espera que lance um erro
        await expect(
            userService.loginUser(
                'sofia@example.com',
                'wrongPassword',
                MockUserModel,
                MockBcrypt
            )
        ) 
        .rejects
        .toThrow('Credenciais inválidas'); 

        expect(MockUserModel.findOne)
        .toHaveBeenCalledWith({ where: { email: 'sofia@example.com' } });

        expect(MockBcrypt.compare)
        .toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
    }); 
});