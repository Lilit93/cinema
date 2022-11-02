import { Request, Response, RequestHandler } from "express";
declare type VladType = 'Vlad';
interface Controller {
    lom: VladType;
    getAll: RequestHandler;
}
declare class ServerController implements Controller {
    readonly lom: "Vlad";
    getAll: (req: Request, res: Response) => void;
    private getServerById;
    protected getServerNameById: RequestHandler;
}
export default ServerController;
