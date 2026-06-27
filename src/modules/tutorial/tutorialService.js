export async function createTutorial(tutorialData, TutorialModel) {
    if (!tutorialData.titulo)
        throw new Error("O título é obrigatório");

    if (!tutorialData.descricao)
        throw new Error("A descrição é obrigatória");

    if (!tutorialData.materiais)
        throw new Error("Os materiais são obrigatórios");

    if (!tutorialData.nivel)
        throw new Error("O nivel é obrigatórios");

    if (!tutorialData.videoUrl)
        throw new Error("O URL do video é obrigatório");

    if (!tutorialData.imagemCapa)
        throw new Error("A imagem capa do vídeo é obrigatória");

    if (tutorialData.id !== undefined && tutorialData.id <= 0)
    throw new Error("ID do tutorial é inválido");

    const tutorialExistente = await TutorialModel.findOne({
        where: {
            titulo: tutorialData.titulo, 
            videoUrl: tutorialData.videoUrl
        }
    });

    if (tutorialExistente)
        throw new Error("Já existe um tutorial com esse título e URL do vídeo");
    
    const tutorial = await TutorialModel.create(tutorialData);
    return {
        message: "Tutorial cadastrado com sucesso", tutorial
    };
}

export async function deleteTutorial(id, TutorialModel) {
    const tutorial = await TutorialModel.findByPk(id);
    if (!tutorial)
        throw new Error("Tutorial não encontrado");
    await tutorial.destroy();

    return {
        message: "Tutorial excluído com sucesso"
    };
}