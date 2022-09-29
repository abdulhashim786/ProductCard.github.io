const mongoose=require('mongoose');



const cardSchema=mongoose.Schema({
    category_id:{
        type:String,
       
    },
    categoryName:{
        type:String,
       
    },
    product_id:{
        type:String,
       
    },
    productName:{
        type:String,
        
    }
});

const cardModul=mongoose.model('newcards',cardSchema);

module.exports=cardModul;
