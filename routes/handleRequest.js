const express = require('express');
const router = express.Router();
const path = require("path");
const response = require('../lib/response');
const fs = require('fs');
router
    .post('/saveFileDetails', async function (req, res) {
        let fileWrittenData = await fs.writeFileSync(path.resolve(process.cwd(), 'data/data.json'), JSON.stringify(req.body));
        if (!fileWrittenData) {
            return response(
                res,
                { message: "Error in file writing. Please try again." },
                "Error",
                422
            );
        } else {
            return response(
                res,
                { message: "File details saved successfully." },
                "Success",
                200
            );
        }
    })
    .get("/getFileDetails", (req, res) => {
        
    });
module.exports = router;