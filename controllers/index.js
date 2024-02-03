'use strict'



function Index(req,res){

   res.render('index', { title: 'Home' });

}

function About(req,res){

    res.render('about', { title: 'About' });

}
function Contact(req,res){

    res.render('contact', { title: 'Contact' });

}
module.exports={

    Index,
    About,
    Contact
}