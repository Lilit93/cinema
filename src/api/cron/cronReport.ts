import db from '../../db/models';
import { Op } from 'sequelize';
import nodemailer from "nodemailer";
import cron from 'node-cron';
import XLSX from "xlsx";
import path from "path";
import dotenv from 'dotenv';

dotenv.config()

class  UnpaidReport {
        public convertJsonToExcel = async () => {
            console.log('Start Generating Reports')
            const value = await db.Reservations.findAll({
                where: {
                    deleted: true,
                    [Op.and] : [
                        {
                            createdAt: {  [Op.gte]: db.Sequelize.literal("(NOW() AT TIME ZONE 'UTC' + '-24H')"), }
                        },
                        {
                            createdAt: {  [Op.lte]: db.Sequelize.literal("(NOW() AT TIME ZONE 'UTC')"), }
                        }
                    ],
                },
                raw: true,
            })
            const workSheet = XLSX.utils.json_to_sheet(value);
            const workBook = XLSX.utils.book_new();
            let now = new Date();
            const name = `${now.toISOString()}_report.xlsx`

            XLSX.utils.book_append_sheet(workBook, workSheet, "reports")

            const pathToFile = path.resolve(`${__dirname}/../../reports`, name)
            XLSX.writeFile(workBook, pathToFile, {
                bookType: 'xlsx',
                type: 'file'
            });
            const yesterday = new Date(now)
            yesterday.setDate(now.getDate() - 1)
            await db.Reports.create({ pathToFile })
            await this.sendReportToEmail({ name, date: yesterday.toDateString() })
            console.log('Stop Generating Reports')
        }

        public sendReportToEmail = async (reportData) => {
            const mail = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                },
            });
            const options = {
                from: 'test.aument@gmail.com',
                to: "narina@aument.company",
                subject: 'Report Created',
                text: `Report Generated for date: ${reportData.date} with name: ${reportData.name}`
            };

            await mail.sendMail(options, (error) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
            });
        }
}
const report = new UnpaidReport ;

const unpaidReport = cron.schedule('* */1 * * *', async () => {
    await report.convertJsonToExcel();
});

export default unpaidReport;
