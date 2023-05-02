const mongoose = require('mongoose');

exports.isValidId = (req,res,next)=>{
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      next();
    } else {
      const err = new Error('Invalid ObjectId');
      err.status = 400;
      next(err);
    }

}