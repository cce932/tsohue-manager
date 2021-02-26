import emailjs from "emailjs-com"
import crypto from "crypto"

export const sendPwdMail = (email, username, account, pwd) => {
  const receiver = {
    user: username,
    userMail: email,
    emailContent: `歡迎加入作伙大家族。\n您的帳號為${account}，密碼為${pwd}，請盡快變更密碼喔。`,
  }

  return emailjs
    .send("service_tsohue", "template_tsohue", receiver, "user_pyJr7gdRppzt655pNAPHz")
    .then(
      (response) => Promise.resolve(response),
      (error) => Promise.reject(error)
    )
}

export const encrypt = (info, key = ";r∂ewƒ∂øß]") => {
  console.log("pass", crypto.createHmac("sha256", key).update(info).digest("hex"))
  return crypto.createHmac("sha256", key).update(info).digest("hex")
}
