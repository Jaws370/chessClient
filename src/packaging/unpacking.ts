import { ServerStatus } from "../types/serverStatus";

export const unpack = (data: string): ServerStatus => {
    return JSON.parse(data);
}