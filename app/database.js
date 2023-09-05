const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.set('useFindAndModify', true)
mongoose.connect(config.database_token, { 
		useNewUrlParser: true, 
		useUnifiedTopology: true 
	}).then(() => {
        console.log('✔ Database Connected')
    }).catch((err) => {
        console.error('✘ MONGODB ERROR: ', err.message)
    })
