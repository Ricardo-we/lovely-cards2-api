import bcrypt from "bcrypt";

export function encryptWord(plainText: string){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
}

export function comparePlainToEncrypted(plainText: string, hashedText: string){
    return bcrypt.compareSync(plainText, hashedText); 
}   

export function getRandomNumbers(size: number = 4){
    let randomCode = "";
    for(let i = 0; i <= size; i++) randomCode += Math.floor(Math.random()*10);
    return randomCode.slice(0, size);
}