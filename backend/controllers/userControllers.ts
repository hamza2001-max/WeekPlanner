const userModel = require("../models/userModel");
const signup = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const newUser = await userModel.signup(email, password);
    res.status(200).json(newUser.email);
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async(req:any, res:any) => {
  const {email, password} = req.body;
  try{
    const user = userModel.login(email, password);
    res.status(200).json(user.email);
  }catch(error){
    res.status(400).json(error);
  }
}
module.exports = {signup, login};
