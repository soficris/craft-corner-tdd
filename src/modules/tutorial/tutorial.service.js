export const validateTutorialVideo = (video) => {
    if (!video) {
        throw new Error('Vídeo é obrigatório');
    }

};

export const createTutorial = async (tutorialData, TutorialModel) => {

    validateTutorialVideo(
        tutorialData.video
    );

    return await TutorialModel.create(
        tutorialData
    );
};