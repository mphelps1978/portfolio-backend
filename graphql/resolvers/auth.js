const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const secret = process.env.SECRET

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
  },
  login: async ({userName, password}) => {
    const user = await User.findOne({userName: userName})
    if (!user) {
      throw new Error('Invalid Credentials')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) {
      throw new Error('Invalid Credentials')
    }
    const token = jwt.sign(
      { userID: user.id, userName: user.userName },
      secret,
      {
        expiresIn: '1h'
  })
    console.log(user.id)
    return { userID: user.id, token: token, tokenExpiration: 1}


  }
}