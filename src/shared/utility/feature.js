import emailjs from "emailjs-com"
import crypto from 'crypto'

export const sendPwdMail = (email, username, pwd) => {
    const to = {
        user: username,
        userMail: email,
        emailContent: `您的密碼是${pwd}，請盡快更新密碼喔。`
    }

    return emailjs.send('service_tsohue', 'template_tsohue', to, 'user_pyJr7gdRppzt655pNAPHz').then(
        (response) => Promise.resolve(response),
        (error) => Promise.reject(error)
    )
}

export const encrypt = (info) => {
    const s = crypto.createHmac('sha256', ';r∂ewƒ∂øß]')
        .update(info)
        .digest('hex');
    console.log("encrypt0", s)
    console.log("encrypt1", crypto.createHmac('sha256', ';r∂ewƒ∂øß]')
        .update(info)
        .digest('hex'))

    return s
}