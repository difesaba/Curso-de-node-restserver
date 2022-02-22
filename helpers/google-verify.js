const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("970808193177-8g10t5npki0vam2g1aor38r2v40qbo4b.apps.googleusercontent.com");

async function googleVerify(token = '') {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const {name , picture, email } = ticket.getPayload();
    return {
        nombre: name , 
        img: picture, 
        correo: email
    }
}

module.exports = {
    googleVerify
}