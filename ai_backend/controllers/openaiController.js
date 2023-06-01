const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const multer = require('multer');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });
    const imageUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};
const storage = new multer.diskStorage({
  destination :(req,file,cb)=>{
    cb(null,'public')
  },
  filename:(req,file,cb)=>{
    console.log('file',file);
    cb(null,Date.now()+"-"+file.originalname)
  }
})
const upload = multer({storage:storage}).single('file')

let filepath ;
const uploadimage = async (req, res) => {
  upload(req, res,(err)=>{
    if(err instanceof multer.MulterError){
     return res.status(500).json(err);
    }else if(err){
     return res.status(500).json(err)
    }
    console.log(req.file)
    filepath = req.file.path;
  })
}

const generateAiImage = async (req, res) => {
   console.log(filepath);
   try {
    const response = await openai.createImageVariation(
      fs.createReadStream(filepath),
      4,
      "256x256"
    );
    res.send(response.data.data)
   } catch (error) {
    console.error(error);
   }

};



module.exports = { generateImage,generateAiImage,uploadimage };
