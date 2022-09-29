const mongoose=require('mongoose');



const categorySchema= new mongoose.Schema({
    categorysName:{
        type:String,
       
    }
});
const categoryModul=mongoose.model('newcategory',categorySchema);

module.exports=categoryModul;