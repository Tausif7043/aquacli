const inquirer = require('inquirer');

module.exports = {
  askGithubCredentials: () => {
    const questions = 
      {
        name: 'filepath',
        type: 'input',
        message: 'Enter the path of directory or file:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter path of directory or file.';
          }
        }
      }
    ;
    return inquirer.prompt(questions);
  },
};