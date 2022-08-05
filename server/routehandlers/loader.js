const controllers = require('../../DB/controllers/controllers.js');

const loaderVerify = (req, res) => {
	res.sendFile("/home/ubuntu/atelierAPI/loaderIOToken/loaderio-16c0dcbe1fe23c8766d06c7ca6c010e2.txt", null, (err) => {
		if (err) {
			next(err);
		} else {
			console.log("File sent:");
		}
	});
};

module.exports = loaderVerify;