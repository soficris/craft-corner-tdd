import bcrypt from 'bcryptjs';

export const createUser = async (userData, UserModel, bcrypt) => {
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return await UserModel.create({
        ...userData,
        password: hashedPassword
    });
}

export const loginUser = async(email, password, UserModel, bcrypt) => {

    const user = await UserModel.findOne({ where: {email}}); 

    if(!user){
        throw new Error('Credenciais inválidas');
    }

    await validateUserAuthentication(password, user, bcrypt);
    return user;
}; 

export const validateUserAuthentication =async (password, user, bcrypt) => {

    const passwordMatch = await bcrypt.compare(password, user.password );

    if (!passwordMatch) {
        throw new Error('Credenciais inválidas');
    }

};