const express = require('express')
const router = express.Router()
const Cafe = require('../models/cafe')
const User = require('../models/user')

router.post('/add', async(req,res)=>{
  try {
   const{name, url,about}= req.body
   let newCafe = await Cafe.create({
     name:name, url:url, about:about
   }) 
   res.status(200).json({sucsess:true, newCafe})
   
  } catch (error) {
    res.status(404).json({ succes: false, msg: error.message });

  }
})

router.get('/allcafe', async(req,res)=>{
  // console.log('allCafe');
  try {
    let allCafe = await Cafe.find()
    res.status(200).json(allCafe)
  } catch (error) {
    res.status(404).json({ succes: false, msg: error.message });

  }
})

router.get('/:id', async (req,res)=>{
  // console.log("oneCafe");
  try {
    const{id}= req.params
    const oneCafe = await Cafe.findById(id)
    res.status(200).json(oneCafe)
  } catch (error) {
    res.status(404).json({ succes: false, msg: error.message });

  }

})
router.put('/star', async(req,res)=>{
  try {
    const{newRating, id}=req.body
    const starCafe = await Cafe.findById(id)
    starCafe.newRating = newRating
     await starCafe.save()
    res.status(200).json(starCafe)
  } catch (error) {
    res.status(404).json({ succes: false, msg: error.message });

  }
})

router.put('/updeteCard' , async(req,res)=>{
  try {
    const{id,nameCard,aboutCard}=req.body
    const updateCafe = await Cafe.findById(id)
    updateCafe.name = nameCard
    updateCafe.about = aboutCard
      await updateCafe.save()
      res.status(200).json(updateCafe)
  } catch (error) {
    res.status(404).json({ succes: false, msg: error.message });

  }
})


router.delete('/delete', async(req,res)=> {
  try {
    const{id}= req.body
    await Cafe.findByIdAndDelete(id)
    res.status(201).json(id)
  } catch (error) {
    res.status(404).json({ succes: false, msg: error.message });

  }
})



const accessTokenSecret = 'youraccesstokensecret';
router.post('/login', async(req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = User.find(u => { return u.username === username && u.password === password });

  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

      res.json({
          accessToken
      });
  } else {
      res.send('Username or password incorrect');
  }
});








module.exports=router
