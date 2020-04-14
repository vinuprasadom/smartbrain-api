const saltRounds = 10;

handleRegister = (req, res, db, bcrypt) => {
   const { name, email, password } = req.body;
   if (!name  || !email || !password || password.length < 4) {
      return res.status(400).json('Incorect form submission');
   }
   const hash = bcrypt.hashSync(password, saltRounds);
   db.transaction(trx => {
      trx.insert({
         hash: hash,
         email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
         return trx('users')
            .returning('*')
            .insert({
               name: name,
               email: loginEmail[0],
               joined: new Date()
            })
            .then(user => {
               res.json(user[0]);
            })
      })
      .then(trx.commit)
      .catch(trx.rollback)
   })
   .catch(err => res.status(400).json('Unable to register'));
}

module.exports = {
   handleRegister
}