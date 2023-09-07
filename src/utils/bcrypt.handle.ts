import {hash, compare} from "bcryptjs"

const encrypt = async (passPlain: string) => {
    const passwordHash = await hash(passPlain, 8);
    return passwordHash;
};
const verified = async (passPlain: string, passHash: string) => {
    const isCorrect = await compare(passPlain,passHash);
    return isCorrect;
};

export {encrypt, verified};