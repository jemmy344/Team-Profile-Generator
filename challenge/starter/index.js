const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.



const employees = [];

// Function to prompt the user to enter the team manager's details
function promptManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please enter the team manager\'s name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Please enter the team manager\'s employee ID:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please enter the team manager\'s email address:',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Please enter the team manager\'s office number:',
    },
  ]).then((answers) => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(manager);
    promptTeam();
  });
}

// Function to prompt the user to select a team member type
function promptTeam() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'teamMember',
      message: 'Please select a team member type:',
      choices: ['Engineer', 'Intern', 'Finish building the team'],
    },
  ]).then((answer) => {
    if (answer.teamMember === 'Engineer') {
      promptEngineer();
    } else if (answer.teamMember === 'Intern') {
      promptIntern();
    } else {
      generateHtml();
    }
  });
}

// Function to prompt the user to enter an engineer's details
function promptEngineer() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please enter the engineer\'s name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Please enter the engineer\'s employee ID:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please enter the engineer\'s email address:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Please enter the engineer\'s GitHub username:',
    },
  ]).then((answers) => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    employees.push(engineer);
    promptTeam();
  });
}

// Function to prompt the user to enter an intern's details
function promptIntern() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please enter the intern\'s name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Please enter the intern\'s employee ID:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please enter the intern\'s email address:',
    },
    {
      type: 'input',
      name: 'school',
      message: 'Please enter the intern\'s school:',
    },
  ]).then((answers) => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    employees.push(intern);
    promptTeam();
  });
}

// Function to generate the HTML file using the rendered template
function generateHtml() {
    const html = render(employees);
  
    // Write the HTML file to the output folder
    fs.writeFile(outputPath, html, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Team profile HTML file generated at ${outputPath}`);
    });
  }

  promptManager();