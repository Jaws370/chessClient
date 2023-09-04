import { ServerStatus } from "../types/ServerStatus";
import { StarterPackage } from "../types/StarterPackage";

export const unpackSS = (data: string): ServerStatus => {
    return JSON.parse(data);
}

export const unpackSP = (data: string): StarterPackage => {
    return JSON.parse(data);
}