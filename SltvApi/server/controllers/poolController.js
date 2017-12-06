import db from "./../model"

const poolController = {};

poolController.post = (req,res) => {
	const{
		actors,
		averageRating,
		contentRating,
		duration,
		genres,
		imdbRating,
		originalTitle,
		poster,
		posterUrl,
		ratings,
		releaseDate,
		storyLine,
		title,
		year
	} = req.body;

	const pool = new db.Pool({
		actors,
		averageRating,
		contentRating,
		duration,
		genres,
		imdbRating,
		originalTitle,
		poster,
		posterUrl,
		ratings,
		releaseDate,
		storyLine,
		title,
		year
	});

	pool.save().then((newPool)=>{
		res.status(200).json({
			success:true,
			data:newPool
		});
	}).catch((err)=>{
		res.status(500).json({
			message:err
		});
	});
}

poolController.get = (req,res) => {
	db.Pool
		.find({})
		.then((pools)=>{
			return res.status(200).json({
				success:true,
				data:pools
			})
		})
		.catch((err)=>{
			return res.status(500).json({
				message:err
			})
		})
}

export default poolController;