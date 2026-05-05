export const register = async(data, UserModel) => {
    const {username, email, password, confirmPassword, fullName} = data; 

    if(password !== confirmPassword) {
        throw new Error('As senhas não coincidem'); 
    }

    return {
        message: 'Usuário registrado com sucesso'
    }
}