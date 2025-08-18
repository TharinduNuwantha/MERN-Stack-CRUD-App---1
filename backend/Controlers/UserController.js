const UserModel = require('../Models/UserModels');

const getAllUsers = async(req,res) =>{
    let users;

    try {
        users = await UserModel.find();
    }catch(err) {
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message: "No users found"});
    }

    //display all users
    return res.status(200).json({users});
}

const addUser = async(req,res,next) => {
    const {FirstName, LastName, Email, PhoneNumber, Password} = req.body;
    let users;

    try{
        users = new UserModel({
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Password
        });

        await users.save();
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(500).json({message: "Unable to add user"});
    }

    return res.status(200).json({users});
}

const userById = async (req,res,next) => {
    const id = req.params.id;
    let user;
    try{
        user = await UserModel.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    
    return res.status(200).json({user});
}

const updateUSer = async(req, res, next) => {
    let id = req.params.id;
    const {FirstName, LastName, Email, PhoneNumber, Password} = req.body;
    let user;
    try{
        user = await UserModel.findByIdAndUpdate(id,{
            FirstName : FirstName,
            LastName : LastName,
            Email : Email,
            PhoneNumber : PhoneNumber,
            Password : Password
        
        });
        user = await user.save();
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    
    return res.status(200).json({user})
}


const deleteUser = async(req, res, next) =>{
    let id = req.params.id;
    let user;
    try{
        user = await UserModel.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message: "User not found"});
    
    }
    return res.status(200).json({message: "User deleted"});
}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.userById = userById;
exports.updateUSer = updateUSer;
exports.deleteUser = deleteUser;