import nodemailer from "nodemailer"

const sendEmail = async (to:string, html : string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "shatabag4749@gmail.com",
            pass: "cxtu bkve gtgv svys",
        },
    });
    await transporter.sendMail({
        from: 'shatabag4749@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password , the link will expired within 10 mins", // Subject line
        text: "", // plain text body
        html: `<b>${html}</b>`, // html body
    });
}


export default sendEmail