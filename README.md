# Checkpoint-3-Project
Automated testing for the "employee-manager-v2" web application. Browser automation created using Nightwatch.js.

Website: https://devmountain-qa.github.io/employee-manager-v2/build/index.html

#### Instructions:
Install NodeJS (includes npm): https://nodejs.org/en/download/

Open a terminal or command line and install nightwatch globally on your machine:
```
npm i -g nightwatch
```
Navigate to your local project folder.
Clone the following repository: 
```
git clone https://github.com/JPLABRADOR/Checkpoint-3-Project.git
```
Navigate to the newly cloned directory:
```
cd Checkpoint-3-Project
```
Install chromedriver for the project:
```
npm install chromedriver --save-dev
```
Execute the "Checkpoint-3-Project" automation:
```
nightwatch tests/employeeManagerV2.js
```
