const Clarifai = require('clarifai');


const app = new Clarifai.App({
   apiKey: '26e57b4aeaff438aa2cc53775d7dad3b'
});

handleImageUrl = (req, res) => {
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => { res.json(data)})
      .catch(err => res.status(400).json('Unable to get detail from API'))
}

handleImage = (req, res, db) => {
   const { id } = req.body;
   let found = false;

   db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
     res.json(entries[0]);
  })
  .catch(err => res.json('Unable to get entries'))
}

module.exports = {
   handleImage,
   handleImageUrl
}