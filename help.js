const chalk = require('chalk');



const help = () => {
	console.log(

		chalk.hex('#9aaed6')(
			'\n\n',

			'############################__HELP__############################',

			'\n\n',
			
			'[', chalk.hex('#d66865')('set'), '] Setup options',
			'\n',
			'[', chalk.hex('#d66865')('run'), '] Run script',
			'\n',
			'[', chalk.hex('#d66865')('help'), '] Show this menu',
			'\n',
			'[', chalk.hex('#d66865')('options'), '] Show options menu',
			'\n',
			'[', chalk.hex('#d66865')('about'), '] Show about menu',

			'\n\n',

			'################################################################',

			'\n\n'
		)

	);
}


module.exports = help;