const handleProfileGet = (req, res, db) => {
   const { id } = req.params;
   let found = true;
   db.select('*').from('users').where({id})
     .then(user => {
        if (user.length) {
           res.json(user[0]);
        } else {
           res.status(400).json('No such user');
        }
     })
     .catch(err => res.status(400).json('Not able to get user profile'));
}

module.exports = {
   handleProfileGet
}