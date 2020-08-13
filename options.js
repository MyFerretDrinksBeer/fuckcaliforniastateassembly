const chalk = require('chalk');




const options = {
	
	firstName: '',
	lastName: '',
	address: '',
	city: '',
	email: '',
	message: '',
	show: () => {
		console.log(
			chalk.hex('#9aaed6')(
				'\n\n',
				
				'############################__OPTIONS__#########################',

				'\n\n',
				
				'First [', chalk.hex('#d66865')(options.firstName), ']',
				'\n',
				'Last [', chalk.hex('#d66865')(options.lastName), ']',
				'\n',
				'Address [', chalk.hex('#d66865')(options.address), ']',
				'\n',
				'City [', chalk.hex('#d66865')(options.city), ']',
				'\n',
				'Email [', chalk.hex('#d66865')(options.email), ']',
				'\n',
				'Message [', chalk.hex('#d66865')(options.message), ']',

				'\n\n',

				'################################################################',

				'\n\n'
			)
		);
	}

}



module.exports = options;