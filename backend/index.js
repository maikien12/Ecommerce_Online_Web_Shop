const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const Stripe = require('stripe')

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

//Mongodb connection
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmpassword: String,
    image: String,
  });
//
const userModel = mongoose.model("user", userSchema);

//API

app.get("/", (req, res) => {
    res.send("Server is running");
  });
//sing up
app.post("/singup", (req,res) => {
    // console.log(req.body)
    const { email } = req.body

    userModel.findOne({ email: email })
    .then((result) => {
      if (result) {
        res.send({message: "Email id is already registered", alert : false})
      }
       else {
        const data = userModel(req.body)
        const save = data.save()
        res.send({message: "successfully sign up", alert : true})
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err)
    })

  
})

//login
app.post('/login',(req, res) =>{
    // console.log(req.body)
    const { email } = req.body
    userModel.findOne({ email: email })
    .then((result) => {
      if (result) {
        const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            image:  result.image,
        };
        console.log(dataSend)

        res.send({message: "Login is successfully", alert : true, data : dataSend });
      }
       else {
    
        res.send({message: "Email is not avaiable, please sign up", alert : false});
      }
    })
    // .catch((err) => {
    //   console.error(err)
    //   res.status(500).send(err)
    // })


});

// product Section
const schemaProduct = mongoose.Schema({
  name : String,
  category : String,
  image : String,
  price : String,
  description : String,
});
const productModel = mongoose.model("product", schemaProduct)

//save product
//api 
app.post("/uploadProduct", async(req, res) => {
  // console.log(req.body)
  const data = productModel(req.body)
  const datasave = await data.save()
 
  res.send({message : "Upload Successfully "})
})

//
app.get("/product", async(req,res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

//payment get way
console.log(process.env.STRIPE_SECRET_KEY )

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY )

app.post("/checkout-payment", async(req, res) => {
    

   try{
    const params = {
        submit_type : "pay",
        mode : "payment",
        payment_method_types : ["card"],
        billing_address_collection : "auto",
        shipping_options : [{shipping_rate : "shr_1ND2GUBcnapUt9VUM8w1Ptnc"}],

        line_items : req.body.map((item) => {
          return {
            price_data : {
              currency : "usd",
              product_data : {
                  name : item.name
                  // images : [item.image],
              },
              unit_amount : item.price * 10,
            },
            adjustable_quantity : {
              enabled : true,
             
            },
            quantity : item.qty
          }
        }),

        success_url : `${process.env.FRONTEND_URL}/success`,
        cancel_url : `${process.env.FRONTEND_URL}/cancel`,

    }
    
    const session = await stripe.checkout.sessions.create(params)
    res.status(200).json(session.id)
   }
   catch (err){
      res.status(err.statusCode || 500).json(err.message)
   }
})



app.listen(PORT,() => console.log("server is running at port: " + PORT))

