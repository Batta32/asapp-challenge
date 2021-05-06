import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
    const salt: string = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const validatePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};