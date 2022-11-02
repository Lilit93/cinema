"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerController {
    constructor() {
        this.lom = 'Vlad';
        this.getAll = (req, res) => {
            res.status(200).json();
        };
        this.getServerById = (req, res) => {
            const { id } = req.query;
            res.status(200).json();
        };
        this.getServerNameById = (req, res) => {
            res.status(200).json();
        };
    }
}
exports.default = ServerController;
//# sourceMappingURL=controller_server.js.map