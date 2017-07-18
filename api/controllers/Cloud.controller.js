const router = require('express').Router();
const skipperS3 = require('skipper-s3');
const cors = require('cors');

router.use('/uploadImage', cors(), require('skipper')(), (req, res, next) => {
	return new Promise((res, rej) => {
		let upstream = req.file('image');
		let filesInUpload = upstream._files,
			settings = {
				allowedTypes: ['image/jpeg', 'image/png'],
				maxBytes: 10000000
			};

		// validity checks on file
		if (filesInUpload.length !== 1) {
			upstream.fatalIncomingError(new Error("only one image can be uploaded at a time"));
		}
		
		let fileUploadStream = filesInUpload[0].stream;

		// check file type
		if (!settings.allowedTypes.includes(fileUploadStream.headers['content-type']))
			upstream.fatalIncomingError(new Error("only jpeg, png format supported"));
		
		// check file size
		if (fileUploadStream.byteCount > settings.maxBytes)
			upstream.fatalIncomingError(new Error("file to big, max 10mb"));

		upstream.upload({
			adapter: skipperS3,
			key: "AKIAI7I3QVQP5EC333NQ",
			secret: "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",
			endpoint: "s3-eu-west-1.amazonaws.com",
			bucket: "mappick-pic",
			maxBytes: settings.maxBytes // fail safe for the validation
		}, (err, uploadedFiles) => {
			if (err)
				return rej(err);
			return res(uploadedFiles)
		});
	})
	.then(uploadedFiles => {
		console.log(`uploaded image successfully`);
		return res.json(200, { uploadedImageUrl: uploadedFiles[0].extra.Location });
	})
	.catch((err) => res.json(500, err));
});

module.exports = router;