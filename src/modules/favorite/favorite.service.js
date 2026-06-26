export const validateDuplicateFavorite = async (userId, tutorialId, FavoriteModel) => {
    const existingFavorite = await FavoriteModel.findOne({
        where: {
            userId, 
            tutorialId
        }
    }); 

    if(existingFavorite){
        throw new Error('O tutorial já está nos favoritos do usuário');
    }
}; 

export const validateUserAuthen = async (userId, userModel) => {
    const user = await userModel.findByPk(userId); 

    if (!user){
        throw new Error('Usuário não está autenticado'); 
    }
}; 

export const validateTutorialId = async (tutorialId) => {
    if(!tutorialId) {
        throw new Error('ID do tutorial é inválido');
    }
}; 

export const validateTutorialExists = async (tutorialId, TutorialModel) => {
    const tutorial = await TutorialModel.findByPk(tutorialId);

    if (!tutorial) {
        throw new Error('O tutorial não foi encontrado');
    }
};

export const addFavorite = async (userId, tutorialId, FavoriteModel, userModel, TutorialModel) => {

    //1. Valida se o usuário está autenticado
    await validateUserAuthen(userId, userModel); 

    //2. Valida se o ID do tutorial é válido
    await validateTutorialId(tutorialId);

    //3. Valida se o tutorial existe
    await validateTutorialExists(tutorialId, TutorialModel);

    //4. Valida se o usuário está tentando favoritar seu próprio tutorial
    await validateOwnFavorite(userId, tutorialId, TutorialModel);

    //5. Valida se o tutorial já está favoritado pelo usuário
    await validateDuplicateFavorite(userId, tutorialId, FavoriteModel);

    //6. Adiciona o tutorial aos favoritos
    const newFavorite = await FavoriteModel.create({
        userId,
        tutorialId
    }); 

    return{
        message: 'O tutorial foi favoritado com sucesso',
        favorite: {
            id: newFavorite.id,
            userId: newFavorite.userId,
            tutorialId: newFavorite.tutorialId
        }
    };
};

export const removeFavorite = async (userId, tutorialId, FavoriteModel) => {
    const favorite = await FavoriteModel.findOne({
        where: {
            userId,
            tutorialId
        }
    });

    if(!favorite){
        throw new Error('O tutorial não está nos favoritos do usuário');
    }

    await favorite.destroy();

    return {
        message: 'O tutorial foi removido dos favoritos com sucesso'
    };
};

export const dailyFavoriteLimit = async (userId, FavoriteModel) => {
    const totalFavoritesToday = await FavoriteModel.count({
        where: {
            userId,
        }
    });

    if (totalFavoritesToday >= 100) {
        throw new Error('O usuário atingiu o limite diário de favoritos');
    }
};

export const validateOwnFavorite = async (userId, tutorialId, TutorialModel) => {
    const tutorial = await TutorialModel.findByPk(tutorialId);

    if (tutorial.userId === userId) {
        throw new Error('Você não pode favoritar seu próprio tutorial');
    }
}; 


 