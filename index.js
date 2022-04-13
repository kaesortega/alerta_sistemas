var nodemailer = require('nodemailer');
var https = require('https');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 587, false for other ports
    requireTLS: true,
    auth: {
        type: "login",
        pass: '', 
        user: ''
    }
});

const MESSAGE = `El servidor de ${process.env.SYSTEM_URL} se cayo`;
const MAILOPTIONS = {
    from: 'kaesortega@gmail.com',
    to: 'desarrollo@britanico.edu.pe',
    subject: `El servidor de ${process.env.SYSTEM_URL} se cayo`,
    text: `El servidor de ${process.env.SYSTEM_URL} se cayo`
}

var id = setInterval(()=> {
    https.get(process.env.SYSTEM_URL, (resp) => {
        console.log(resp.statusCode);
        
        if (resp.statusCode != 200){
            transporter.sendMail(MAILOPTIONS, (err, info) => {
                if(err){
                    console.log(err);
                } else {
                    console.log("Email enviado: " + info.response);
                }
            });
            clearInterval(id);
        }

    });
},5000);
