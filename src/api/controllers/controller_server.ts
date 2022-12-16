import { Request, Response, RequestHandler } from "express";

interface globalServerEntity  {
    id: string,
}
interface ServerEntity  extends globalServerEntity {
    name: string,
    status: string
}

type Servers = Array<ServerEntity>;
type VladType = 'Vlad';

interface Controller {
    lom: VladType
    getAll: RequestHandler
}

class ServerController implements Controller {
    public readonly lom = 'Vlad' as VladType;
    public getAll = (req: Request, res: Response ): void => {
        res.status(200).json();
    }
    private getServerById = (req: Request, res: Response ): void => {
        const { id } = req.query;
        res.status(200).json();
    }
    protected getServerNameById: RequestHandler = (req, res ): void => {
        res.status(200).json();
    }
}
export default ServerController;
