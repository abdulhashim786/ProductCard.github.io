const express=require("express");
const app=express();
const bodyParser=require('body-parser');
 require('./modols/config/configration');
 const cardModul=require('./modols/cardModols/card');
const { findByIdAndUpdate } = require("./modols/cardModols/card");
const categoryModul=require('./modols/cardModols/categorys');
 

const port=process.env.PORT || 8080 ;
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','hbs');
app.use(express.static('.'));

app.get('/',async (req,res)=>{ 
   
  let findCategory=await categoryModul.find({});
 res.render('index',{category:findCategory});
});

app.post('/',async (req,res)=>{
  //  const name=req.body.productName;
    const {categoryId,categoryName,productId,productName}=req.body;
    console.log(categoryId);
    try{
        if(categoryId && categoryName && productId && productName){
        let newCard=await new cardModul({
            category_id:categoryId,categoryName:categoryName,
        product_id:productId,productName:productName});
        newCard.save();

        console.log(newCard);
        res.status(200).redirect('/');
        }
        else{
            res.status(401).json({message:"pleas enter all deatiles"});
        }

    }
    catch(error){
        res.status(401).json({message:"hii"});
    }
});


app.get('/card',async (req,res)=>{
    let findCard=await cardModul.find({}); 
    res.render('productCard',{data:findCard})
});

app.get('/card/:id',async (req,res)=>{
    const id =req.params.id;

    let findCard=await cardModul.findOne({product_id:id});
    if(!findCard)
    {
        res.send({message:"data not have.."});
    } 
    else{
    res.render('productid',{data:findCard})
    }
});


app.get('/edit/:id',async (req,res)=>{
  try{
    let id= await cardModul.findById({_id:req.params.id},{new:true});
  
   res.render('editcard',{ids:id});
    
 
}catch(err){
res.status(401).send(err);

}
  //  let id= req.params.id;
  // res.render('editcard',{ids:id});
});

app.post('/edit/:id',async (req,res)=>{
  const {productName,categoryName}=req.body; 
  //const findid=req.params.id;
  try{
     
      console.log(productName +" "+categoryName);
      if(productName || categoryName)
      {
        let updateDate=await cardModul.findByIdAndUpdate({_id:req.params.id},{productName:productName, categoryName:categoryName},{ new: true, runValidators: true });
         if(!updateDate)
         {
          res.status(401).send('not update...');
         }
         else{
          res.status(200).redirect('/card'); 
         }
        
      }
      else{
        res.status(401).send('pleas enter a product name...');
      }
   
  }
  catch(error){
    res.status(401).send(error);
  }
  });


  app.get('/delete/:id',async (req,res)=>{
    let deletes=await cardModul.findByIdAndDelete({_id:req.params.id});
    res.redirect('/card');
  });



  app.post('/category',async (req,res)=>{
   
    let newCate=await new categoryModul({categorysName:req.body.categoryNew});
    newCate.save();
    if(newCate)
    {
      console.log('category addd...');
      res.status(200).redirect('/');
    }
    else{
      res.status(401).send('not add category ');
    }
  });





app.listen(port,()=>{
console.log(`this is my port ${port}`);
});