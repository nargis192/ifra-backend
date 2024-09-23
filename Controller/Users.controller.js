const usermodel = require('../Models/User-model');
const bcrypt = require('bcryptjs')

module.exports.signup = async (req, res) => {
  try {
    const { Name, Email, Password} = req.body;
    const hashpassword = await bcrypt.hash(Password, 10)
    const newuser = await usermodel.create({ Name, Email, Password:hashpassword});
    res.status(200).send(newuser);
    console.log(`In signup: ${newuser}`);
  } catch (error) {
    console.log('Error in signup page:', error);
    res.status(500).send({ Message: 'Signup page error' });
  }
};


module.exports.login = async (req, res) => {
    try {
      const { Email, Password } = req.body;
      const user = await usermodel.findOne({ Email });
  
      if (user) {
        const isMatch = await bcrypt.compare(Password, user.Password);
  
        if (isMatch) {
          return res.status(200).send({ userId: user._id, user });
        } else {
          return res.status(401).send({ Message: 'Invalid password' });
        }
  
      } else {
        return res.status(404).send({ Message: 'User does not exist' });
      }
  
    } catch (error) {
      console.log('Error in login page:', error);
      return res.status(500).send({ Message: 'Login page error' });
    }
  };
  

