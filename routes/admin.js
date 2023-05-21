const express = require('express');

const router = express.Router();
const fs=require(`fs`); 
 
router.post('/', (req, res, next)=>{
    const msg = req.body.message
    fs.writeFile('message.txt', `${req.body.username}: ${req.body.message}`+'\n', { flag: 'a+' }, (err)=>{
        console.log(err);
    });
    res.redirect('/');   
})


router.get('/', (req, res, next)=>{
    fs.readFile('message.txt', (err, data)=>{
        const msg=data.toString()+'<form action="/" onsubmit="document.getElementById(`username`).value=localStorage.getItem(`username`)" method="POST"><input type="text" name="message" placeholder="message"><input type="hidden" name="username" id="username"><br><button type="submit">Send</button></form>';
        res.send(msg);
    })

})

router.get('/login',(req, res, next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="GET"><input type="text" name="username" id="username"><br><button type="submit">Login</button></form>');
});


module.exports=router;
