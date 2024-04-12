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
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1]; // Asume el formato "Bearer [token]"

      jwt.verify(token, JWT_SECRET, (err, user) => {
          if (err) {
              return res.status(403).send('Token no válido.');
          }

          req.userId = user.id; // Adjunta el ID del usuario a la solicitud
          next(); // Continúa con la siguiente función en la cadena de middlewares
      });
  } else {
      res.status(401).send('Token de autorización no encontrado.');
  }
};

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
        sgMail.setApiKey(''); // Configura esto de manera segura en producción
  
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

        res.json({ message: "Inicio de sesión exitoso", token, utez_community: user.utez_community, user: {
          name: user.nombre,
          username: user.email,
          avatar: user.imagen,
          telefono: user.telefono,
          fechaNacimiento: user.fecha_nacimiento,
          estado: user.estado,
          municipio: user.municipio, // Asegúrate de que esto refleje cómo guardas la imagen en la base de datos
          // Asumiendo que quieres mostrar el correo electrónico como username
          // Agrega aquí cualquier otro dato que necesites
        }  });
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
  // Extrae el token JWT del header de autorización
  const token = req.headers.authorization.split(' ')[1]; // Asume 'Bearer [token]'
  const decoded = jwt.verify(token, JWT_SECRET);

  // Extrae el ID del usuario (instructor) del token decodificado
  const instructorId = decoded.id;

  const { title, category, level, description, applicant_requirements, courseImage } = req.body;

  // Incluye el instructor_id en tu consulta SQL
  const query = `INSERT INTO cursos (title, category, level, description, applicant_requirements, image, instructor_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [title, category, level, description, applicant_requirements, courseImage, instructorId], (err, result) => {
      if (err) {
          console.error('Error al crear el curso:', err);
          return res.status(500).send('Error al crear el curso');
      }
      return res.status(200).send('Curso creado con éxito');
  });
});


app.get('/total-sales', async (req, res) => {
  const query = `SELECT SUM(ventas) AS totalVentas FROM cursos`;
  db.query(query, (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar las ventas totales');
      }
      res.json(result[0]);
  });
});


app.get('/total-courses', async (req, res) => {
  const query = `SELECT COUNT(*) AS totalCursos FROM cursos`;
  db.query(query, (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar el total de cursos');
      }
      res.json(result[0]);
  });
});


app.get('/community-count', async (req, res) => {
  const query = `SELECT utez_community, COUNT(*) AS count FROM usuarios GROUP BY utez_community`;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar la comunidad');
      }
      res.json(results);
  });
});

app.get('/instructors', (req, res) => {
  const query = `SELECT * FROM usuarios WHERE utez_community = 'profesor'`;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar los instructores');
      }
      res.json(results);
  });
});

app.get('/recent-courses', (req, res) => {
  const query = `SELECT * FROM cursos ORDER BY created_at DESC LIMIT 4`;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar los cursos recientes');
      }
      res.json(results);
  });
});

app.get('/students', (req, res) => {
  const query = `SELECT * FROM usuarios WHERE utez_community IN ('estudiante', 'egresado', 'publico')`;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar los estudiantes');
      }
      res.json(results);
  });
});

app.get('/instructors', (req, res) => {
  // Asegúrate de ajustar la consulta SQL según tu esquema de base de datos y tus necesidades
  const query = `
      SELECT id, nombre, municipio, email, imagen AS image 
      FROM usuarios 
      WHERE utez_community = 'profesor'
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error al consultar los instructores:', err);
          return res.status(500).send('Error al obtener los instructores');
      }
      // Asegúrate de que la estructura de los datos enviados coincide con lo que espera tu componente React
      res.json(results);
  });
});

app.post('/update-course-status', (req, res) => {
  const { id, status, precio } = req.body; // Asegúrate de recibir el precio aquí

  if (status === 'aprobado' && precio != null) {
    const query = 'UPDATE cursos SET status = ?, precio = ? WHERE id = ?';

    db.query(query, [status, precio, id], (err, result) => {
      if (err) {
          console.error('Error al actualizar el estado y precio del curso:', err);
          return res.status(500).send('Error al actualizar el curso');
      }
      res.send('Curso actualizado con éxito');
    });
  } else {
    // Si solo estás actualizando el estado, omite la actualización del precio
    const query = 'UPDATE cursos SET status = ? WHERE id = ?';

    db.query(query, [status, id], (err, result) => {
      if (err) {
          console.error('Error al actualizar el estado del curso:', err);
          return res.status(500).send('Error al actualizar el curso');
      }
      res.send('Curso actualizado con éxito');
    });
  }
});



app.get('/courses', (req, res) => {
  const query = `SELECT cursos.*, usuarios.nombre as instructor_name, usuarios.imagen as instructor_image FROM cursos JOIN usuarios ON cursos.instructor_id = usuarios.id`;
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error al consultar los cursos:', err);
          return res.status(500).send('Error al obtener los cursos');
      }
      res.json(results);
  });
});

app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categorias';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error al consultar las categorías:', err);
          return res.status(500).send('Error al obtener las categorías');
      }
      res.json(results);
  });
});

// Endpoint para agregar una nueva categoría
app.post('/categories', (req, res) => {
  const { categoria } = req.body;
  const query = 'INSERT INTO categorias (categorias) VALUES (?)';
  db.query(query, [categoria], (err, result) => {
      if (err) {
          console.error('Error al agregar la categoría:', err);
          return res.status(500).send('Error al agregar la categoría');
      }
      res.status(201).send('Categoría agregada con éxito');
  });
});


// Endpoint para eliminar una categoría
app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM categorias WHERE id = ?';

  db.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error al eliminar la categoría:', err);
          return res.status(500).send('Error al eliminar la categoría');
      }
      res.send('Categoría eliminada con éxito');
  });
});


// Endpoint para actualizar una categoría
app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const query = `UPDATE categorias SET categorias = ? WHERE id = ?`;

  db.query(query, [name, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar la categoría:', err);
      return res.status(500).send('Error al actualizar la categoría');
    }
    res.send('Categoría actualizada con éxito');
  });
});

app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.status(200).send({ message: 'Estudiante eliminado con éxito.' });
    } else {
      res.status(404).send({ message: 'Estudiante no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error);
    res.status(500).send({ message: 'Error al eliminar el estudiante.' });
  }
});

app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, celular } = req.body;
  try {
    const [result] = await db.promise().query('UPDATE usuarios SET nombre = ?, email = ?, celular = ? WHERE id = ?', [nombre, email, celular, id]);
    if (result.affectedRows > 0) {
      res.status(200).send({ message: 'Estudiante actualizado con éxito.' });
    } else {
      res.status(404).send({ message: 'Estudiante no encontrado.' });
    }
  } catch (error) {
    console.error('Error al actualizar el estudiante:', error);
    res.status(500).send({ message: 'Error al actualizar el estudiante.' });
  }
});

app.put('/instructors/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, celular } = req.body;
  
  try {
    await db.promise().query('UPDATE usuarios SET nombre = ?, email = ?, celular = ? WHERE id = ?', [nombre, email, celular, id]);
    res.send('Instructor actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el instructor:', error);
    res.status(500).send('Error al actualizar el instructor');
  }
});

app.delete('/instructors/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await db.promise().query('UPDATE usuarios SET status = "Desactivado" WHERE id = ?', [id]);
    res.send('Instructor eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el instructor:', error);
    res.status(500).send('Error al eliminar el instructor');
  }
});

app.get('/student-count', (req, res) => {
  const query = `SELECT COUNT(*) AS studentCount FROM usuarios WHERE utez_community IN ('estudiante', 'egresado', 'publico')`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al consultar el número de estudiantes');
    }
    res.json(results[0]);
  });
});

app.get('/course-count', (req, res) => {
  const query = 'SELECT COUNT(*) AS courseCount FROM cursos';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al consultar el número de cursos');
    }
    res.json(results[0]);
  });
});


app.get('/best-selling-courses', (req, res) => {
  const query = 'SELECT title, ventas AS sales, precio AS amount, image FROM cursos ORDER BY ventas DESC LIMIT 5';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al consultar los cursos más vendidos');
    }
    res.json(results);
  });
});

app.get('/api/cursos', (req, res) => {
  const query = 'SELECT * FROM cursos';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error al consultar los cursos:', err);
          return res.status(500).send('Error al obtener los cursos');
      }
      res.json(results);
  });
});

app.get('/user/profile', async (req, res) => {
  // Extrae el token JWT del header de autorización
  const token = req.headers.authorization.split(' ')[1]; // Asume 'Bearer [token]'
  const decoded = jwt.verify(token, JWT_SECRET);

  // Extrae el ID del usuario del token decodificado
  const userId = decoded.id;

  try {
    const [rows] = await db.promise().query('SELECT nombre, apellidos, email, celular, fecha_nacimiento, estado, municipio, imagen FROM usuarios WHERE id = ?', [userId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    res.status(500).send('Error al obtener los datos del usuario');
  }
});

app.put('/user/profile', async (req, res) => {
  // Extrae el token JWT del header de autorización y obtiene el ID del usuario
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const userId = decoded.id;

  const { nombre, apellidos, celular, fecha_nacimiento, estado, municipio, imagen } = req.body;

  try {
    await db.promise().query('UPDATE usuarios SET nombre = ?, apellidos = ?, celular = ?, fecha_nacimiento = ?, estado = ?, municipio = ?, imagen = ? WHERE id = ?', [nombre, apellidos, celular, fecha_nacimiento, estado, municipio, imagen, userId]);
    res.send('Perfil actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    res.status(500).send('Error al actualizar el perfil del usuario');
  }
});

app.put('/user/updateemail', verifyToken, async (req, res) => {
  const { email } = req.body;
  // Asumiendo que tienes una función para obtener el ID del usuario a partir del token JWT
  const userId = req.userId; // o extraído directamente del token en un middleware anterior

  if (!email) {
    return res.status(400).send('El correo electrónico es requerido.');
  }

  try {
    const [result] = await db.promise().query('UPDATE usuarios SET email = ? WHERE id = ?', [email, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).send('Usuario no encontrado.');
    }

    res.send('Correo electrónico actualizado con éxito.');
  } catch (error) {
    console.error('Error al actualizar el correo electrónico:', error);
    res.status(500).send('Error al actualizar el correo electrónico.');
  }
});


app.put('/user/updatepassword', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId; // o extraído directamente del token en un middleware anterior

  if (!currentPassword || !newPassword) {
    return res.status(400).send('La contraseña actual y la nueva contraseña son requeridas.');
  }

  try {
    const [user] = await db.promise().query('SELECT password FROM usuarios WHERE id = ?', [userId]);

    if (user.length === 0) {
      return res.status(404).send('Usuario no encontrado.');
    }

    // Verifica la contraseña actual
    const isMatch = bcrypt.compareSync(currentPassword, user[0].password);
    if (!isMatch) {
      return res.status(401).send('La contraseña actual es incorrecta.');
    }

    // Actualiza la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    await db.promise().query('UPDATE usuarios SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.send('Contraseña actualizada con éxito.');
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).send('Error al actualizar la contraseña.');
  }
});






  

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
