const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const inquirer = require('./lib/inquirer');
clear();

console.log(
    chalk.yellow(
        figlet.textSync('Aquasec', { horizontalLayout: 'full' })
    )
);
const walk = function (dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    var data = { file: file, stat: stat };
                    results.push(data);
                    next();
                }
            });
        })();
    });
};
const run = async () => {
    const filePath = await inquirer.askGithubCredentials();
    walk(filePath.filepath.trim(), function (err, results) {
        if (err) throw err;
        let postData = { filePath: filePath.filepath, results: results}
        axios.post('http://localhost:3000/api/handleRequest/saveFileDetails', postData)
        .then(function (response) {
            chalk.yellow("Files details saved successfully")
        })
        .catch(function (error) {
            chalk.blue("Error in files details saving")
        });
    });
};
run();