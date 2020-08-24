const bcrypt = require('bcryptjs')

const User = require('../../models/user')

module.exports = {

  createUser: args => {
    return User.findOne({ userName: args.UserInput.userName })
      .then(user => {
        if (user) {
          throw new Error('Username in use.');
        }
        return bcrypt.hash(args.UserInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          userName: args.UserInput.userName,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch(err => {
        throw err;
      });
  }
}