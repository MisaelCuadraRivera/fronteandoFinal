const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

// Clave secreta para JWT, en producción usa una variable de entorno
const JWT_SECRET = 'chimuelo';

app.use(cors());

// Aquí es donde body-parser empieza a procesar el cuerpo de la solicitud
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
2

const db = mysql.createPool({
  host: 'roundhouse.proxy.rlwy.net',
  user: 'root',
  password: 'cIcIQUkvDoldLqzVZoONwlaIeqXWldmZ',
  database: 'railway',
  port: 55336
});

// Endpoint para registrar un nuevo usuario
app.post('/signup', (req, res) => {
    const { nombre, apellidos, sexo, fecha_nacimiento, celular, idioma_indigena, nivel_educacion, estado, municipio, descubrimiento, discapacidad, utez_community, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    const query = `INSERT INTO usuarios (nombre, apellidos, sexo, fecha_nacimiento, celular, idioma_indigena, nivel_educacion, estado, municipio, descubrimiento, discapacidad, utez_community, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(query, [nombre, apellidos, sexo, fecha_nacimiento, celular, idioma_indigena, nivel_educacion, estado, municipio, descubrimiento, discapacidad, utez_community, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario');
      } else {
        // El usuario se ha registrado con éxito, ahora enviar el correo electrónico de bienvenida
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey('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'); // Configura esto de manera segura en producción
  
        const msg = {
          to: email, // Utiliza el correo electrónico del usuario recién registrado
          from: 'sigeca.utez@gmail.com', // Tu correo verificado en SendGrid
          templateId: 'd-167ccabda7464295914f0054e9274bfa',
          subject: 'Bienvenido a SIGECA',
          // Aquí puedes añadir 'dynamic_template_data' si tu plantilla lo requiere
        };
  
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent');
            res.status(200).send('Usuario registrado con éxito y correo enviado');
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
          });
      }
    });
  });
  
// Endpoint para iniciar sesión
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al iniciar sesión');
    }
    if (results.length > 0) {
      const user = results[0];
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { id: user.id, email: user.email, utez_community: user.utez_community },
          JWT_SECRET,
          { expiresIn: '8h' } 
        );

        res.json({ message: "Inicio de sesión exitoso", token, utez_community: user.utez_community });
      } else {
        res.status(401).send("Correo electrónico o contraseña incorrectos");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  });
});

//Endpoint para crear un nuevo curso
app.post('/create-course', (req, res) => {
  console.log('Cuerpo de la solicitud recibida:', req.body);
  // Asume que 'req.body' ya contiene todos los datos necesarios, incluida la imagen en Base64
    const { title, category, level, description, applicant_requirements, courseImage } = req.body;
  
    // Aquí, courseImage es una cadena en Base64 que representa la imagen del curso
    // No necesitas procesar archivos con multer para este enfoque
  
    // Inserta la nueva información en la base de datos
    const query = `INSERT INTO cursos (title, category, level, description, applicant_requirements, image) VALUES (?, ?, ?, ?, ?, ?)`;
  
    db.query(query, [title, category, level, description, applicant_requirements, courseImage], (err, result) => {
      if (err) {
        console.error('Error al crear el curso:', err);
        return res.status(500).send('Error al crear el curso');
      }
      return res.status(200).send('Curso creado con éxito');
    });
});

  

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
