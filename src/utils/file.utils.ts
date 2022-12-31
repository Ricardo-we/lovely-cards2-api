import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";

export function writeFileSyncSafe(filePath: string, content: string): string | false{
    try {
        writeFileSync(filePath, content)
        return filePath
    } catch (error) {
        return false
    }
}

export function removeFileSyncSafe(filePath: string): boolean{
    try {
        if(!existsSync(filePath)) return false;
        unlinkSync(filePath);
        return true;        
    } catch (error) {
        return false
    }
}

export function mkdirSyncSafe(filePath: string): string | false{
    try {
        mkdirSync(filePath)
        return filePath
    } catch (error) {
        return false
    }
}
