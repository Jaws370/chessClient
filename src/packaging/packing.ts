import { ClientStatus } from "../types/clientStatus";

export const pack = (data: ClientStatus) => {
    return JSON.stringify(data);
}