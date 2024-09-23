const expmodel = require('../Models/Exp-model');
const mongoose= require('mongoose')

exports.save = async (req, res) => {
    try {
      const { userid, type, description, amount, date } = req.body; 
  
     
      if (!userid) {
        return res.status(400).send({ message: 'User ID is required' });
      }
  
      const expense = new expmodel({ userid, type, description, amount, date  });
      await expense.save();
      res.send('Expense saved successfully');
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  };

module.exports.update = async (req, res) => {
  try {
      const {_id,type, description, amount, date } = req.body;

      await expmodel.findByIdAndUpdate(_id,{type, description, amount,date})
      console.log("updated successfully...");
      res.send("updated successfully")
  } catch (error) {
      console.error("Error updating error expense:", error);
      res.status(500).send({ message: "An error occurred while updating the expense." });
  }
};

module.exports.Delete= async (req, res) => {
  try {
      const {_id} = req.body;

      await expmodel.findByIdAndDelete(_id)
     
      console.log("deleted successfully...");
      res.send("deleted successfully")
  } catch (error) {
      console.error("Error deleting error expense:", error);
      res.status(500).send({ message: "An error occurred while deleting the expense." });
  }
};

module.exports.getExpenses = async (req, res) => {
    const userId = req.params.userId;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: 'Invalid user ID' });
    }
  
    try {
      const expenses = await expmodel.find({ userid: userId });
      res.status(200).send(expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).send({ message: 'An error occurred while fetching expenses.' });
    }
  };
