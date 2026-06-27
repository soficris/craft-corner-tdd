import request from "supertest";
import express from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import tutorialRoutes from "../tutorialRoutes.js";
import * as tutorialService from "../tutorialService.js";
vi.mock("../tutorialService.js");

const app = express();
app.use(express.json());
app.use("/tutorial", tutorialRoutes);

describe("Tutorial Routes - Cadastro de Tutoriais", () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    //Teste 1 - Cadastrar o tutorial com sucesso 
    it("Deve cadastrar um tutorial com sucesso", async () => {
        tutorialService.createTutorial.mockResolvedValue({
            message: "Tutorial cadastrado com sucesso",
            tutorial: {
                id: 1,
                titulo: "Crochê"
            }
        });

        const response = await request(app)
            .post("/tutorial")
            .send({
                titulo: "Crochê",
                descricao: "Tutorial",
                materiais: "Linha",
                nivel: "Iniciante",
                videoUrl: "video.mp4",
                duracao: 20,
                imagemCapa: "img.png"
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Tutorial cadastrado com sucesso");
    });

    //Teste 2 - Erro ao tentar cadastrar com o titulo vazio
    it("Deve retornar 400 quando o título estiver vazio", async () => {
        tutorialService.createTutorial.mockRejectedValue(
            new Error("Título é obrigatório")
        );

        const response = await request(app)
            .post("/tutorial")
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Título é obrigatório");
    });

    //Teste 3 - Erro ao tentar cadastrar com a descrição vazia
    it("Deve retornar 400 quando a descrição estiver vazia", async () => {
        tutorialService.createTutorial.mockRejectedValue(
            new Error("Descrição é obrigatória")
        );

        const response = await request(app)
            .post("/tutorial")
            .send({});
        expect(response.status).toBe(400);
    });

    //Teste 4 - Erro ao tentar cadastrar com os materiais vazio
    it("Deve retornar 400 quando materiais estiverem vazios", async () => {
        tutorialService.createTutorial.mockRejectedValue(
            new Error("Materiais são obrigatórios")
        );

        const response = await request(app)
            .post("/tutorial")
            .send({});
        expect(response.status).toBe(400);
    });

    //Teste 5 - Erro ao tentar cadastrar com o nível vazio 
    it("Deve retornar 400 quando o nível estiver vazio", async () => {
        tutorialService.createTutorial.mockRejectedValue(
            new Error("Nível é obrigatório")
        );

        const response = await request(app)
            .post("/tutorial")
            .send({});
        expect(response.status).toBe(400);
    });

    //Teste 6 - Erro ao tentar cadastrar com o URl do vídeo vazio
    it("Deve retornar 400 quando a URL do vídeo estiver vazia", async () => {
        tutorialService.createTutorial.mockRejectedValue(
            new Error("URL do vídeo é obrigatória")
        );

        const response = await request(app)
            .post("/tutorial")
            .send({});
        expect(response.status).toBe(400);
    });

    //Teste 7 - Erro ao tentar cadastrar um tutorial que já existe
    it("Deve retornar 400 quando já existir um tutorial igual", async () => {
        tutorialService.createTutorial.mockRejectedValue(
            new Error("Já existe um tutorial com esse título e URL")
        );

        const response = await request(app)
            .post("/tutorial")
            .send({});
        expect(response.status).toBe(400);
    });

    //Teste 8 - Exclui um tutorial com sucesso
    it("Deve excluir um tutorial com sucesso", async () => {
        tutorialService.deleteTutorial.mockResolvedValue({
            message: "Tutorial excluído com sucesso"
        });

        const response = await request(app)
            .delete("/tutorial/1");
        expect(response.status).toBe(200);
        expect(response.body.message).toContain("excluído");
    });

    //Teste 9 - Erro ao tentar excluir um tutorial que não existe
    it("Deve retornar 404 ao excluir tutorial inexistente", async () => {
        tutorialService.deleteTutorial.mockRejectedValue(
            new Error("Tutorial não encontrado")
        );

        const response = await request(app)
            .delete("/tutorial/1");
        expect(response.status).toBe(404);
    });

    //Teste 10 - Verifica se o Service está sendo chamado com sucesso
    it("Deve chamar o createTutorial do Service", async () => {
        tutorialService.createTutorial.mockResolvedValue({
            message: "Tutorial cadastrado com sucesso"
        });

        const body = {
            titulo: "Crochê",
            descricao: "Tutorial",
            materiais: "Linha",
            nivel: "Iniciante",
            videoUrl: "video.mp4",
            duracao: 20,
            imagemCapa: "img.png"
        };

        await request(app)
            .post("/tutorial")
            .send(body);
        expect(tutorialService.createTutorial).toHaveBeenCalled();
    });
})