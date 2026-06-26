import {describe, it, expect, beforeEach} from 'vitest'; 
import * as favoriteService from '../favorite.service.js'; 
import { where } from 'sequelize';
import { id } from 'happy-dom/lib/PropertySymbol.js';

describe('Favorite Service - Favoritos', () => {
    let MockFavoriteModel; 
    let MockUserModel;
    let MockTutorialModel;

    beforeEach(() => {
        MockFavoriteModel = {
            findOne: vi.fn(), 
            create: vi.fn()
        };

        MockUserModel = {
            findByPk: vi.fn()
        }; 

        MockTutorialModel = {
            findByPk: vi.fn()
        };
    });

    //Teste 1 - Impedir de favoritar o mesmo tutorial mais de uma vez 
    it('Deve retornar erro se o tutorial já estiver favorito nos favoritos', async () => {

        //Simula um usuario autenticado
        MockUserModel.findByPk.mockResolvedValue({ id: 1});

        //Simula um tutorial existente
        MockTutorialModel.findByPk.mockResolvedValue({ id: 10});

        //Simula que o tutorial já está favoritado
        MockFavoriteModel.findOne.mockResolvedValue({ id: 1, userId: 1, tutorialId: 10 });

        await expect(favoriteService.addFavorite(1, 10, MockFavoriteModel, MockUserModel, MockTutorialModel))
        .rejects
        .toThrow('O tutorial já está nos favoritos do usuário');

    }); 

    //Teste 2 - Adicionar um tutorial aos favoritos com sucesso
    it('Deve adicionar um tutorial aos favoritos com sucesso', async () => {

        //Simula que o usuário está autenticado
        MockUserModel.findByPk.mockResolvedValue({ id: 1 });

        //Simula que o tutorial existe
        MockTutorialModel.findByPk.mockResolvedValue({ id: 10 });
        
        //Simula que o tutorial não está favoritado
        MockFavoriteModel.findOne.mockResolvedValue(null); 

        //Simula a criação de um favorito 
        MockFavoriteModel.create.mockResolvedValue({ id: 1, userId: 1, tutorialId: 10 });

        const result = await favoriteService.addFavorite(1, 10, MockFavoriteModel, MockUserModel, MockTutorialModel);

        expect(MockFavoriteModel.findOne)
        .toHaveBeenCalledWith({
            where: {
                userId: 1,
                tutorialId: 10
            }
        });

        expect(MockFavoriteModel.create)
        .toHaveBeenCalledWith({
            userId: 1,
            tutorialId: 10
        });

        expect(result).toEqual({
            message: 'O tutorial foi favoritado com sucesso', 
            favorite: {
                id: 1, 
                userId: 1,
                tutorialId: 10
            }
        });
    });

    //Teste 3 - Impedir de favoritar um tutorial sem estar autenticado
    it('Deve retornar erro se o usuário não estiver autenticado', async () => {
        
        MockUserModel.findByPk.mockResolvedValue(null);

        await expect(favoriteService.addFavorite(1, 10, MockFavoriteModel, MockUserModel, MockTutorialModel)
        )
        .rejects
        .toThrow('Usuário não está autenticado');
    }); 

    //Teste 4 - Impedir de favoritar um tutorial que não existe 
    it('Deve retornar erro se o tutorial não existir', async () => {

        //Simula que o usuário está autenticado
        MockUserModel.findByPk.mockResolvedValue({ id: 1 });

        //Simula que o tutorial não existe
        MockTutorialModel.findByPk.mockResolvedValue(null);

        await expect(favoriteService.addFavorite(1, 10, MockFavoriteModel, MockUserModel, MockTutorialModel)
        )
        .rejects
        .toThrow('O tutorial não foi encontrado');
    }); 

    //Teste 5 - Remover um tutorial dos favoritos com sucesso
    it('Deve remover um tutorial dos favoritos com sucesso', async () => {
        
        const mockDestroy = vi.fn(); 

        //Simula um favorito existente
        MockFavoriteModel.findOne.mockResolvedValue({
            id: 1,
            userId: 1,
            tutorialId: 10,
            destroy: mockDestroy
        }); 

        const result = await favoriteService.removeFavorite(1, 10, MockFavoriteModel);

        //Verifica se o favorito foi achado 
        expect(MockFavoriteModel.findOne)
        .toHaveBeenCalledWith({
            where: {
                userId: 1,
                tutorialId: 10
            }
        });

        expect(mockDestroy).toHaveBeenCalled();

        expect(result.message).toContain('removido dos favoritos');
    }); 

    //Teste 6 - Impedir de remover um tutorial dos favoritos se ele não estiver nos favoritos do usuário
    it('Deve retornar erro se o tutorial não estiver nos favoritos', async () => {

        MockFavoriteModel.findOne.mockResolvedValue(null);

        await expect(favoriteService.removeFavorite(1, 10, MockFavoriteModel))
        .rejects
        .toThrow('O tutorial não está nos favoritos do usuário');
    });

    //Teste 7 - Impedir de favoritar um tutorial se o usuário ultrapassar o limite diário de favoritos
    it('Deve retornar erro se o usuário ultrapassar o limite diário de favoritos', async () => {

        //Simula que o usuário já favoritou 100 tutoriais hoje 
        MockFavoriteModel.count = vi.fn(); 

        MockFavoriteModel.count.mockResolvedValue(100);

        await expect(favoriteService.dailyFavoriteLimit(1, MockFavoriteModel))
        .rejects
        .toThrow('O usuário atingiu o limite diário de favoritos');
    });

    //Teste 8 - Impedir de favoritar o próprio tutorial
    it('Deve retornar erro se o usuário tentar favoritar seu próprio tutorial', async () => {
        
        MockUserModel.findByPk.mockResolvedValue({ id: 1});

        MockTutorialModel.findByPk.mockResolvedValue({ id: 10, userId: 1});

        await expect(favoriteService.addFavorite(1, 10, MockFavoriteModel, MockUserModel, MockTutorialModel))
        .rejects
        .toThrow('Você não pode favoritar seu próprio tutorial');

    });

    //Teste 9 - Impedir de favoritar um tutorial caso o usuário não esteja autenticado 
    it('Deve retornar erro se o usuário não estiver autenticado', async() => {
        
        await expect(favoriteService.addFavorite(null, 10, MockFavoriteModel, MockUserModel, MockTutorialModel))
        .rejects
        .toThrow('Usuário não está autenticado');
    });

    //Teste 10 - Impedir de favoritar caso o ID do tutorial seja inválido
    it('Deve retornar erro se um tutorial com ID inválido for favoritado', async () => {

        MockUserModel.findByPk.mockResolvedValue({ id: 1 });

        await expect(favoriteService.addFavorite(1, null, MockFavoriteModel, MockUserModel, MockTutorialModel))
        .rejects
        .toThrow('ID do tutorial é inválido');
    })
}); 