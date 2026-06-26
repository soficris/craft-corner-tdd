import {describe, it, expect, beforeEach} from 'vitest'; 
import * as commentService from '../comment.service.js'; 
import { where } from 'sequelize';
import { id } from 'happy-dom/lib/PropertySymbol.js';

describe('Comment Service', () => {
    let MockCommentModel;

    beforeEach( () => {
        MockCommentModel = {
            create: vi.fn(), 
            findByPk: vi.fn(),
            update: vi.fn()
        };
    }); 


    //1. Teste para não permitir comentários vazios 
    it('Não deve permitir comentário vazio', async () => {

        await expect(
            commentService.createComment(
                {
                    content: ''
                },
                MockCommentModel
            )
        )
        .rejects
        .toThrow('O comentário precisa conter conteúdo');

        expect(MockCommentModel.create)
        .not.toHaveBeenCalled();

    });

    //2. Teste para atualizar comentário 

    it('Deve atualizar comentário existente', async () => {

        MockCommentModel.findByPk.mockResolvedValue({
            id: 1, 
            content: 'Comentário antigo'
        }); 

        MockCommentModel.update.mockResolvedValue([1]);

        await commentService.updateComment( 1, 
            { content: 'Comentário atualizado'}, 
            MockCommentModel
        );

        expect(MockCommentModel.findByPk)
        .toHaveBeenCalledWith(1);

        expect(MockCommentModel.update)
        .toHaveBeenCalledWith( 
            { content: 'Comentário atualizado' },
            { where: { id: 1 } }
        ); 
    });

});
