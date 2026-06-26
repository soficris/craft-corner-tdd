import {describe, it, expect, beforeEach} from 'vitest'; 
import * as tutorialService from '../tutorial.service.js'; 
import { where } from 'sequelize';
import { id } from 'happy-dom/lib/PropertySymbol.js';

describe('Tutorial Service', () => {

    let MockTutorialModel;

    beforeEach( () => {
        MockTutorialModel = {
            create: vi.fn(), 
            findByPk: vi.fn(),
            update: vi.fn()
        };
    });

    //1. Teste para não permitir tutorial sem vídeo
    it('não deve criar tutorial sem vídeo', async () => {

    await expect( tutorialService.createTutorial
        (
            {
                title: 'Node.js',
                description: 'Curso completo'
            },
            MockTutorialModel
        )
    )
    .rejects
    .toThrow('Vídeo é obrigatório');

    expect(MockTutorialModel.create)
    .not
    .toHaveBeenCalled();

});
})