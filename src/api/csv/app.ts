import converter from 'json-2-csv';
import fs from 'fs';
import db from '../../db/models'

 const csv =  async function () {
    const value = await db.Reservations.findAll({ raw: true })
    console.log(value, '---->>>>')


     converter.json2csv(value, (err, csv) => {
         if (err) {
             throw err
         }

         fs.writeFileSync('two.csv', csv)
         console.log(csv)
     }, {
         emptyFieldValue: 'Not exists',
         delimiter: {
             field: ',',
             wrap: "",
         }
     })

 }
csv()





