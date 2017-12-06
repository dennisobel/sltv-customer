import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const poolSchema = new Scema({
	actors:[{
		type: String
	}],
	averageRating:Number,
	contentRating:String,
	duration:String,
	genres:[{
		type:String
	}],
	imdbRating:Number,
	originalTitle:String,
	poster:String,
	posterUrl:String,
	ratings:[{
		type:Number
	}],
	releaseDate:String,
	storyLine:String,
	title:String,
	year:String
})

const Pool = mongoose.model("Pool",poolSchema);
export default Post;