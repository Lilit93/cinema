import { models }  from '../../db';
import {Op} from "sequelize";
import db from "../../db/models";

class ReportsController {
    private model: any;

    constructor() {
        this.model = models.Reports;
    }
        getListOfReports = async (req, res) => {
            try {
                const { list_size = 10, page = 1 } = req.query;
                const limit = list_size;
                const offset = (page - 1) * list_size;

                const list = await this.model.findAndCountAll({
                    limit,
                    offset,
                });

                res.status(200).send(list);
            } catch (e) {
                res.status(400).send("Something went wrong");
            }
        }

        download = async (req, res) => {
            try {
                const { id } = req.params;

                const file = await this.model.findOne({ where: { id } });

                    if (!file) {
                        res.status(404).send("File not Found");
                        return;
                    }
                    res.download(file.pathToFile);
                    return;
                } catch (e) {
                    res.status(400).send("Something went wrong");
                }
        };

    filterByDate = async (req, res) => {
        try {
            const { start, end } = req.body;
            const value = await db.Reports.findAll({
                where: {
                    [Op.and] : [
                        {
                            createdAt: { [Op.gte]: start }
                        },
                        {
                            createdAt: { [Op.lte]: end }
                        }
                    ],
                },
                order: [
                    ['createdAt', 'ASC'],
                ],
                raw: true,
            })
            res.send(value)
        } catch (e) {
            res.status(400).send("Something went wrong");
        }
    };
}

export default ReportsController;
