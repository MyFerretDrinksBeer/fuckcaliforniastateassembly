const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');
const figlet = require('figlet');
const options = require('./options.js');
const help = require('./help.js');


const sleep = (ms) => {return new Promise(resolve => {setTimeout(resolve, ms)})}

const question = () => {
	let q = {
		name: 'base',
		type: 'input',
		message: 'fuck-the-assembly_>>'
	}
	return inquirer.prompt(q);
}


const ask = async () => {
	let base = await question();

	run(base.base)
}


const welcome = () => {
	console.log(
		chalk.hex('#d1b397')(figlet.textSync('FuckTheAssembly', {horizontalLayout: 'full'})),
		'\n\n',
		
		chalk.hex('#9ec993')('[', chalk.hex('#d66865')(1), '] Options' ),
		'\n',
		chalk.hex('#9ec993')('[', chalk.hex('#d66865')(2), '] Help' ),
		'\n',
		chalk.hex('#9ec993')('[', chalk.hex('#d66865')(3), '] About' ),
		'\n'
	);
}


const run = (base) => {
	
	//Show options
	if(base == 'options' || base == '1'){
		options.show();
	}

	//Show help
	if(base == 'help' || base == '2'){
		help();
	}

	//Show about
	if(base == 'about' || base == '3'){
		about();
	}
	
	//Set options
	if(base == 'set'){
		setOptions();
		return;
	}

	//Run script
	if(base == 'run'){

		//Error checker 
		if(errChecker()){
			go();
		}
	}

	//Check for errors
	if(base !== 'options' && base !== '1' && base !== 'help' && base !== '2' && base !== 'about' && base !== '3' && base !== 'set' && base !== 'run'){
		console.log(
			chalk.red('Error: Command not recognized. Run "help" to see more.')
		);
	}

	ask();
}


const go = async () => {

	const browser = await puppeteer.launch({ headless: false, executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe ' });
	const page = await browser.newPage();

	fs.readFile('./urls.txt', 'utf8', (err, data) => {
		if(err){
			console.log(err)
		}else{
			let arr = data.split(',');
			const zips = ['95453', '93721', '94583', '94022', '95667', '90405', '92008', '94612', '92675', '90301', '91746', '90026', '92878', '91754', '92821', '94102', '92602', '95035', '95670', '95758', '93401', '95959', '92806', '92647', '95202', '95366', '93309', '94533', '91502', '91364', '95993', '90241', '92236', '90248', '92101', '92101', '95354', '94520', '91711', '93010', '90037', '95113', '90230', '95746', '93551', '94903', '93101', '95014', '92128', '93291', '92270', '95814', '92507', '94402', '90503', '91401', '92345', '90815', '93710', '92612', '94541', '92835', '91730', '90712', '92401', '91331', '93901', '91710', '91791', '93301', '90013', '91355', '95060', '94102', '92071', '92025', '92101', '94612', '95501', '92562']


			arr.forEach((url, index) => {
				
				setTimeout(async() => {

					//Go to rep contact page
					await page.goto(url);

					//Fill in info

					//Name
					await page.type('#txtFirstName', options.firstName)
					await page.type('#txtLastName', options.lastName)

					//Address
					await page.type('#txtAddress', options.address)

					//City
					await page.type('#txtCity', options.city)

					//City
					await page.type('#txtZip',zips[index])

					//Email
					await page.type('#txtEmail', options.email)

					//Message
					await page.type('#ContactForm > table > tbody > tr:nth-child(12) > td:nth-child(2) > textarea', options.message);

					//Submit button
					await page.click('#submitButton');

					await sleep(1000);

					console.log(
						chalk.cyan('Message number..... ' + index + ' sent!')
					);

				}, index*2000)
			});
		}
	});
}


const setOptions = async () => {

	console.log('\n')
	
	const askFirst = () => {
		let q = {
			name: 'base',
			type: 'input',
			message: 'First Name: '
		}
		return inquirer.prompt(q);
	}

	const askLast = () => {
		let q = {
			name: 'base',
			type: 'input',
			message: 'Last Name: '
		}
		return inquirer.prompt(q);
	}

	const askAddress = () => {
		let q = {
			name: 'base',
			type: 'input',
			message: 'Address: '
		}
		return inquirer.prompt(q);
	}

	const askCity = () => {
		let q = {
			name: 'base',
			type: 'input',
			message: 'City: '
		}
		return inquirer.prompt(q);
	}

	const askEmail = () => {
		let q = {
			name: 'base',
			type: 'input',
			message: 'Email: '
		}
		return inquirer.prompt(q);
	}

	const askMessage = () => {
		let q = {
			name: 'base',
			type: 'input',
			message: 'Message: '
		}
		return inquirer.prompt(q);
	}


	let firstName = await askFirst();
	options.firstName = firstName.base;
	let lastName = await askLast();
	options.lastName = lastName.base;
	let address = await askAddress();
	options.address = address.base;
	let city = await askCity();
	options.city = city.base;
	let email = await askEmail();
	options.email = email.base;
	let message = await askMessage();
	options.message = message.base;

	console.log(
		chalk.hex('#9ec993')('\n\n', 'All options are set and ready to go. Run "options/1" to view them or run "run" to start the script...', '\n\n') 
	);

	ask();


}	


const errChecker = () => {
	if(options.firstName == '' || 
		options.lastName == '' ||
		options.address == '' ||
		options.city == '' ||
		options.email == '' ||
		options.message == ''){

		console.log(
			'\n\n',
			chalk.red('Error: You must fill out all options before running script'),
			'\n\n'
		);
		
		return false;

	}else{
		return true;
	}
}


const about = () => {
	console.log(
		'\n\n',
		chalk.cyan('California State Assembly members refuse to allow fiber optic cable to be ran to my neck of the woods. So fuck the California State Assembly, and spam their offices with your message.'),
		'\n\n'
	);
}




//On load
(() => {
	welcome();
	ask();
})()
