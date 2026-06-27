import { describe, it, expect, beforeEach, vi } from "vitest";
import * as tutorialService from "../tutorialService.js";

describe("Tutorial Service - Cadastro de Tutorial", () => {
    let MockTutorialModel;

    beforeEach(() => {
        MockTutorialModel = {
            findOne: vi.fn(),
            create: vi.fn(), 
            findByPk: vi.fn()
        };
    });

    //Teste 1 - Criar um tutorial com todos os requisitos com sucesso
    it("Deve cadastrar um tutorial com sucesso", async() => {
        MockTutorialModel.findOne.mockResolvedValue(null); 
        MockTutorialModel.create.mockResolvedValue({ id:1, titulo: "Crochê para iniciantes" }); 

        const result = await tutorialService.createTutorial({ 
            titulo: "Crochê para Iniciantes", 
            descricao: "Tutorial de crochê para iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            nivel: "Iniciante", 
            videoUrl: "video.mp4", 
            duracao: 20, 
            imagemCapa: "croche.png"
        }, MockTutorialModel); 

        expect(MockTutorialModel.create).toHaveBeenCalled(); 
        expect(result.message).toBe("Tutorial cadastrado com sucesso");
        expect(result.tutorial).toHaveProperty("id");
    }); 

    //Teste 2 - Impedir de cadastrar um tutorial sem o título
    it("Deve retornar erro quando o título estiver vazio", async () => {
        await expect(tutorialService.createTutorial({
            descricao: "Tutorial de crochê para iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            nivel: "Iniciante", 
            videoUrl: "video.mp4", 
            duracao: 20, 
            imagemCapa: "croche.png"
            }, MockTutorialModel)
        )
        .rejects
        .toThrow("O título é obrigatório");
    });

    //Teste 3 - Impedir de cadastrar um tutorial sem a descrição
    it("Deve retornar erro quando a descrição estiver vazia", async () => {
        await expect(tutorialService.createTutorial({
            titulo: "Crochê para Iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            nivel: "Iniciante", 
            videoUrl: "video.mp4", 
            duracao: 20, 
            imagemCapa: "croche.png"
        }, MockTutorialModel)
        )
        .rejects
        .toThrow("A descrição é obrigatória");
    });

    //Teste 4 - Impedir de cadastrar um tutorial sem os materias utilizados
    it("Deve retornar erro quando os materiais estiverem vazio", async () => {
        await expect(tutorialService.createTutorial({
            titulo: "Crochê para Iniciantes",
            descricao: "Tutorial de crochê para iniciantes",  
            nivel: "Iniciante", 
            videoUrl: "video.mp4", 
            duracao: 20, 
            imagemCapa: "croche.png"
        }, MockTutorialModel)
        )
        .rejects
        .toThrow("Os materiais são obrigatórios");
    });

    //Teste 5 - Impedir de cadastrar um tutorial sem o nível dele
    it("Deve retornar erro quando o nivel estiver vazio", async() => {
        await expect(tutorialService.createTutorial({
            titulo: "Crochê para Iniciantes", 
            descricao: "Tutorial de crochê para iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            videoUrl: "video.mp4", 
            duracao: 20, 
            imagemCapa: "croche.png"
        }, MockTutorialModel)
        )
        .rejects
        .toThrow("O nivel é obrigatórios");
    }); 

    //Teste 6 - Impedir de cadastrar um tutorial sem o URL do vídeo 
    it("Deve retornar erro quando o URL do vídeo estiver vazio", async() => {
        await expect(tutorialService.createTutorial({
            titulo: "Crochê para Iniciantes", 
            descricao: "Tutorial de crochê para iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            nivel: "Iniciante", 
            duracao: 20, 
            imagemCapa: "croche.png"
        }, MockTutorialModel)
        )
        .rejects
        .toThrow("O URL do video é obrigatório");
    })

    //Teste 7 - Impedir de cadastrar um tutorial sem a imagem de capa 
    it("Deve retornar erro quando a imagem capa estiver vazia", async() => {
        await expect(tutorialService.createTutorial({
            titulo: "Crochê para Iniciantes", 
            descricao: "Tutorial de crochê para iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            nivel: "Iniciante", 
            videoUrl: "video.mp4", 
            duracao: 20
        }, MockTutorialModel)
        )
        .rejects
        .toThrow("A imagem capa do vídeo é obrigatória");
    });

    //Teste 8 - Permitir excluir um tutorial
    it("Deve excluir um tutorial com sucesso", async () => {
        const mockDestroy = vi.fn();
        MockTutorialModel.findByPk.mockResolvedValue({
            id: 1,
            destroy: mockDestroy
        });

        const result = await tutorialService.deleteTutorial(1, MockTutorialModel);

        expect(MockTutorialModel.findByPk).toHaveBeenCalledWith(1);
        expect(mockDestroy).toHaveBeenCalled();
        expect(result).toEqual({ message: "Tutorial excluído com sucesso" });
    });

    //Teste 9 - Impedir cadastrar um tutorial com um ID inválido
    it("Deve retornar erro se o ID do tutorial for inválido", async () => {
        await expect(tutorialService.createTutorial({
            id: -1,
            titulo: "Crochê para Iniciantes", 
            descricao: "Tutorial de crochê para iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            nivel: "Iniciante", 
            videoUrl: "video.mp4", 
            duracao: 20, 
            imagemCapa: "croche.png"
            }, MockTutorialModel)
        )
        .rejects
        .toThrow("ID do tutorial é inválido");
    });

    //Teste 10 - Impedir cadastrar um tutorial com título e URL já cadastrados
    it("Deve retornar erro se já existir um tutorial com o mesmo título e URL", async () => {
        MockTutorialModel.findOne.mockResolvedValue({
            id: 1,
            titulo: "Crochê para Iniciantes",
            videoUrl: "video.mp4"
        });

        await expect(tutorialService.createTutorial({
            titulo: "Crochê para Iniciantes", 
            descricao: "Tutorial de crochê para iniciantes", 
            materiais: "Fio de algodão, agulha, tesoura e contador de carreiras", 
            nivel: "Iniciante", 
            videoUrl: "video.mp4", 
            duracao: 20, 
            imagemCapa: "croche.png"
            }, MockTutorialModel)
        )
        .rejects
        .toThrow("Já existe um tutorial com esse título e URL do vídeo");
    });

}); 
