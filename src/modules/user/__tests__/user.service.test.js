import {describe, it, expect, beforeEach} from 'vitest'; 
import * as UserService from '../user.service.js'; 

describe('User Service - Cadastro',() => {
    let mockUserModel; 

    beforeEach(() => {
        mockUserModel = {
            findOne: vi.fn(), 
            create: vi.fn()
        };
    }); 

    it('deve retornar um erro se as senhas forem diferentes', async () => {
        const data = {
            username: 'soficris', 
            email: 'soficris@example.com',
            password: 'password123',
            confirmPassword: 'password321',
            fullName: 'Sofia Cristina'
        };

        await expect(UserService.register(data, mockUserModel))
        .rejects
        .toThrow('As senhas não coincidem');
    })
}); 