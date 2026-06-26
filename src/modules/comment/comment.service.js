export const createComment = async (commentData, commentModel) => {
    validateCommentContent(commentData.content);

    return await commentModel.create(commentData);
}; 

export const validateCommentContent = (content) => {
    if (!content || content.trim() === '') {
        throw new Error('O comentário precisa conter conteúdo');
    }
}

export const validateCommentExists = async (commentId, commentModel) => {

    const comment = await commentModel.findByPk(commentId);

    if (!comment) {
        throw new Error('Comentário não encontrado');
    }
}; 

export const updateComment = async (commentId, data, commentModel) => {

    await validateCommentExists(commentId, commentModel);

    return await commentModel.update( data, { where: { id: commentId } });
}; 