const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const tokenGenerator = (id:string) => {
  return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '3d'});
}
const signup = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const newUser = await userModel.signup(email, password);
    let token = tokenGenerator(newUser._id);
    const newAccount = {email, token};
    res.status(200).json(newAccount);
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async(req:any, res:any) => {
  const {email, password} = req.body;
  try{
    const user = userModel.login(email, password);
    let token = tokenGenerator(user._id);
    res.status(200).json({email, token});
  }catch(error:any){
    res.status(400).json({error: error.message});
  }
}
module.exports = {signup, login};
