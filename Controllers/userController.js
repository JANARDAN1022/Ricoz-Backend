const asyncerrorhandler = require('../Middlewares/asyncErrorHandler');
const userModel = require('../Models/userModel');

//Add a User  
exports.AddUser = asyncerrorhandler(async(req,res,next)=>{
    const {FirstName,LastName,Email}=req.body;
 
    if(FirstName && LastName && Email){
               const UserExists = await userModel.findOne({
                $or: [
                  { Email: Email },
                ]
              });
               if(UserExists){
                  return next({message:'User already Exists LogIn Instead',statusCode:404});
                }else{
                const user = await userModel.create({
                    FirstName,
                    LastName,
                    Email,
                  });
                if(user){
                     res.status(200).json(user);
                  }else{
                    return next({message:'Server error please try later',statusCode:500});
                  }
           }
    }else{
        return next({message:'Please Provide All Info about the user To Add them',statusCode:403});
    }
 });

 //Update User Profile/Info
exports.UpdateUser = asyncerrorhandler(async(req,res,next)=>{
    const {FirstName,LastName,Email,userId} = req.body;
  
    if(userId){
        const user = await userModel.findById(userId);
        if(user){
    if(FirstName || LastName || Email){
         
    const UpdateDataObject = {};
    
    if(FirstName && user.FirstName!==FirstName){
      UpdateDataObject.FirstName = FirstName
    }
    
    if(LastName && user.LastName!==LastName){
      UpdateDataObject.LastName = LastName
    }
    
    if(Email && user.Email!==Email){
      UpdateDataObject.Email = Email
    }
    
    const updatedUser = await userModel.findByIdAndUpdate(userId,UpdateDataObject,{new:true});
    
    if(updatedUser){
      res.status(200).json({message:'User Updated Successfully',user:updatedUser});
    }else{
      return next({ message: 'Failed to update user profile', statusCode: 500 });
    }
    
    }else{
      return next({ message: 'Please provide Atleast one Field To Update', statusCode: 404 });
    }
    }else{
      return next({ message: 'Please provide a valid user Id', statusCode: 404 });
    }
    }else{
        return next({ message: 'Please provide a valid user Id ', statusCode: 403 });
    }
});


// Get All Users with search feature
exports.getAllUsers = asyncerrorhandler(async(req,res,next)=>{
 const {search} = await req.query;
 const query = {};
 if(search){
 query.$or = [
    { FirstName: { $regex: search, $options: 'i' } },
    { LastName: { $regex: search, $options: 'i' } },
    { Email: { $regex: search, $options: 'i' } }
];
 }
    const AllUsers = await userModel.find(query);
 res.status(200).json(AllUsers);
});    


// Get All Users with search feature
exports.getspecificUser = asyncerrorhandler(async(req,res,next)=>{
    const {userId} = await req.query;
    if(userId){
        const specificUser = await userModel.findById(userId);
         if(specificUser){
        res.status(200).json(specificUser);
         }else{
            return next({ message: 'Please provide a valid user Id', statusCode: 404 });      
         }
    }else{
        return next({ message: 'Please provide a valid user Id', statusCode: 404 });
    }
   });    

