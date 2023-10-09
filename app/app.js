const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 80; // Cambia el puerto según tus necesidades

app.use(express.json());

const gmailAPP = "vxivurzznjeuwzmj";
const contraseñaAPP = "programpruebas0@gmail.com";

// Configuración del transporte de correo
const sendEmail = {};

sendEmail.recouverPassword = (userEmail, codeEmail) => {
  const url = `http://localhost:5173/changePassword?v=${codeEmail}`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailAPP,
      pass: contraseñaAPP,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Configura los datos del correo electrónico
  const mailOptions = {
    from: `Empleos Formosa <${gmailAPP}>`,
    to: userEmail,
    subject: 'Cambiar la contraseña de la cuenta',
    html: `
    <div class="divEmpFSA">
      <img class="imgEmpFSA" src="https://www.argentina.gob.ar/sites/default/files/escudo-formosa-definitivo.jpg" alt="Escudo de la provincia de Formosa">
        <fieldset class="fieldsetEmpFSA">
          <legend class="legendEmpFSA">Cambiar Contraseña</legend>
          <a href="${url}"><input type="button" id="buttonSubmit" value="Cambiar Contraseña"></a>
        </fieldset>
        <p>Cualquier consulta o falla encontrada en el uso del servicio Empleos Formosa, por favor informarlo vía email al <a href="mailto:EmpleosFormosa@gmail.com.ar">EmpleosFormosa@gmail.com.ar</a></p>
    </div>
    <style>
      .divEmpFSA {
        justify-content: center;
        background-color: white;
        text-align: center;
      }
      .imgEmpFSA {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
        width: 320px;
      }
      .fieldsetEmpFSA {
        border: 2px solid #ddd;
        padding: 20px;
        border-radius: 5px;
      }
      
      .legendEmpFSA {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 10px;
      }

      #buttonSubmit {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      }
    </style>
    `
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
};

sendEmail.confirmEmail = (userEmail, codeEmail) => {
  const url = `http://localhost:5173/confirmEmail?v=${codeEmail}`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailAPP,
      pass: contraseñaAPP,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Configura los datos del correo electrónico
  const mailOptions = {
    from: `Empleos Formosa <${gmailAPP}>`,
    to: userEmail,
    subject: 'Confirmacion de correo electronico',
    html: `
    <div class="divEmpFSA">
      <img class="imgEmpFSA" src="https://www.argentina.gob.ar/sites/default/files/escudo-formosa-definitivo.jpg" alt="Escudo de la provincia de Formosa">
        <fieldset class="fieldsetEmpFSA">
          <legend class="legendEmpFSA">Confirmacion de Correo</legend>
          <a href="${url}"><input type="button" id="buttonSubmit" value="Confirmar Correo Electronico"></a>
        </fieldset>
        <p>Cualquier consulta o falla encontrada en el uso del servicio Empleos Formosa, por favor informarlo vía email al <a href="mailto:EmpleosFormosa@gmail.com.ar">EmpleosFormosa@gmail.com.ar</a></p>
    </div>
    <style>
      .divEmpFSA {
        justify-content: center;
        background-color: white;
        text-align: center;
      }
      .imgEmpFSA {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
        width: 320px;
      }
      .fieldsetEmpFSA {
        border: 2px solid #ddd;
        padding: 20px;
        border-radius: 5px;
      }
      
      .legendEmpFSA {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 10px;
      }

      #buttonSubmit {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      }
    </style>
    `
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
};

// Ruta para enviar correos
app.post('/enviar-correo', (req, res) => {
  const { remitente, destinatario, asunto, mensaje, usuario, contraseña } = req.body;

  // Configura el transporte de correo
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: usuario,
      pass: contraseña,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Configura los datos del correo electrónico
  const mailOptions = {
    from: remitente || 'Anónimo',
    to: destinatario,
    subject: asunto || 'Asunto por defecto',
    text: mensaje || 'Mensaje por defecto',
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
      res.status(500).json({ mensaje: 'Error al enviar el correo.' });
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.json({ mensaje: 'Correo electrónico enviado con éxito.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
