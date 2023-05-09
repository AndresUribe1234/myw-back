exports.signUpMsg = (token, email) => {
  return `
  ¡Hola ${email}!

Gracias por crear una cuenta en Max Your Watts. Para finalizar el proceso de registro, por favor ingresa el siguiente código de verificación:

${process.env.URL_FRONT}/authentication/post-token?from=signup&token=${token}&email=${email}


Si tienes alguna pregunta o necesitas ayuda con el proceso de registro, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte en todo lo que necesites.

¡Gracias por unirte a Max Your Watts! Esperamos que disfrutes de nuestra plataforma y todas las funciones que ofrecemos.

Atentamente,
El equipo de Max Your Watts
  `;
};

exports.signUpHTML = (token, email) => {
  return `
  <body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
  <div style="margin: 20px;">
    <p style="font-size: 18px; font-weight: bold;">¡Hola ${email}!</p>
    <p>Gracias por crear una cuenta en Max Your Watts. Para finalizar el proceso de registro, por favor haz clic en el siguiente botón:</p>
    <button  style="cursor: pointer; margin: 5px; margin-left: auto; margin-right: auto; font-size: 16px; padding: 10px 20px; border-radius: 5px; text-align: center; color: white; background-color: #e0ca3c; border: none; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);">
    <a href="${process.env.URL_FRONT}/authentication/post-token?from=signup&token=${token}&email=${email}" style="color: #FFFFFF; text-decoration: none;">Haz clic aquí para confirmar tu cuenta</a>
    </button>
    <a href="${process.env.URL_FRONT}/authentication/post-token?from=signup&token=${token}&email=${email}" style="text-decoration: none;">${process.env.URL_FRONT}/authentication/post-token?from=signup&token=${token}&email=${email}</a>
    <p>Si tienes alguna pregunta o necesitas ayuda con el proceso de registro, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte en todo lo que necesites.</p>
    <p>¡Gracias por unirte a Max Your Watts! Esperamos que disfrutes de nuestra plataforma y todas las funciones que ofrecemos.</p>
    <p style="font-size: 16px; font-weight: bold;">Atentamente,</p>
    <p>El equipo de <span style="font-size: 16px; font-weight: bold; color: #f34213ff;">Max Your Watts</span></p>
  </div>
</body>
  `;
};

exports.changeEmailMsg = (token) => {
  return `Hello world! ${token}`;
};

exports.changeEmailHTML = (token) => {
  return `<div>Hello world! ${token}</div>`;
};

exports.forgotPasswordlMsg = (token, email) => {
  return `
  ¡Hola ${email}!

  Recibimos una solicitud para restablecer la contraseña de tu cuenta en Max Your Watts. Si no realizaste esta solicitud, no te preocupes: tu cuenta sigue siendo segura y no se han realizado cambios.

  Para restablecer tu contraseña, por favor haz clic en el siguiente enlace:

${process.env.URL_FRONT}/authentication/post-token?from=forgot-password&token=${token}&email=${email}

Este enlace te llevará a una página donde podrás crear una nueva contraseña para tu cuenta. Recuerda que este enlace solo es válido por un tiempo limitado, así que asegúrate de restablecer tu contraseña lo antes posible.

Si tienes alguna pregunta o necesitas ayuda con el proceso de restablecimiento de la contraseña, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte en todo lo que necesites.

¡Gracias por ser parte de la comunidad de Max Your Watts!

Atentamente,
El equipo de Max Your Watts
  `;
};

exports.forgotPasswordHTML = (token, email) => {
  return `
  <body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
    <div style="border: 1px solid #ddd; background-color: #f9f9f9; padding: 20px; margin: 20px 0;">
      <h1 style="font-size: 24px; color: #333; margin-top: 0;">¡Hola ${email}!</h1>
      <p style="font-size: 16px; margin: 0 0 10px;">Recibimos una solicitud para restablecer la contraseña de tu cuenta en Max Your Watts. Si no realizaste esta solicitud, no te preocupes: tu cuenta sigue siendo segura y no se han realizado cambios.</p>
      <p style="font-size: 16px; margin: 0 0 10px;">Para restablecer tu contraseña, por favor haz clic en el siguiente botón:</p>
      <button  style="cursor: pointer; margin: 5px; margin-left: auto; margin-right: auto; font-size: 16px; padding: 10px 20px; border-radius: 5px; text-align: center; color: white; background-color: #e0ca3c; border: none; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);">
    <a href="${process.env.URL_FRONT}/authentication/post-token?from=forgot-password&token=${token}&email=${email}" style="color: #FFFFFF; text-decoration: none;">Haz clic aquí para recuperar tu contraseña</a>
    </button>
      <p style="font-size: 16px; margin: 0 0 10px;">Este enlace te llevará a una página donde podrás crear una nueva contraseña para tu cuenta. Recuerda que este enlace solo es válido por un tiempo limitado, así que asegúrate de restablecer tu contraseña lo antes posible.</p>
      <p style="font-size: 16px; margin: 0 0 10px;">Si tienes alguna pregunta o necesitas ayuda con el proceso de restablecimiento de la contraseña, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte en todo lo que necesites.</p>
      <p style="font-size: 16px; margin: 0 0 10px;">¡Gracias por ser parte de la comunidad de Max Your Watts!</p>
      <p style="font-size: 16px; margin: 0;">Atentamente,<br><span style="font-size: 16px; font-weight: bold; color: #f34213ff;">Max Your Watts</span></p>
    </div>
  </body>
  `;
};
