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
  host: 'localhost',
  user: 'root',
  password: 'Hater1021993_',
  database: 'sigeca',
  port: 3306
});

// Endpoint para registrar un nuevo usuario
app.post('/signup', (req, res) => {
    const { nombre, apellidos, utez_community, fecha_nacimiento, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    const query = `INSERT INTO usuarios (nombre, apellidos, utez_community, fecha_nacimiento, email, password) VALUES (?, ?, ?, ?, ?, ?)`;
  
    db.query(query, [nombre, apellidos, utez_community, fecha_nacimiento, email, hashedPassword], (err, result) => {
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
  console.log('Email:', email);

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al iniciar sesión');
    }
    if (results.length > 0) {
      const user = results[0];
      
        const token = jwt.sign(
          { id: user.id, email: user.email, utez_community: user.utez_community },
          JWT_SECRET,
          { expiresIn: '8h' } 
        );

        res.json({ message: "Inicio de sesión exitoso", token, utez_community: user.utez_community, user: {
          name: user.nombre,
          username: user.email,
        }  });
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

app.get('/course-count', verifyToken, async (req, res) => {
  const instructorId = req.userId; // Obtenido del middleware verifyToken que añade el userId a req
  const query = 'SELECT COUNT(*) AS courseCount FROM cursos WHERE instructor_id = ?';
  db.query(query, [instructorId], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar el número de cursos');
      }
      res.json(results[0]);
  });
});

// Endpoint modificado para obtener los cursos más vendidos de un instructor específico
app.get('/best-selling-courses', verifyToken, async (req, res) => {
  const instructorId = req.userId;
  const query = 'SELECT title, ventas AS sales, precio AS amount, image FROM cursos WHERE instructor_id = ? ORDER BY ventas DESC LIMIT 5';
  db.query(query, [instructorId], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error al consultar los cursos más vendidos');
      }
      res.json(results);
  });
});

app.get('/api/cursos', (req, res) => {
  const query = `
    SELECT cursos.*, usuarios.nombre as instructor_name, usuarios.imagen as instructor_image 
    FROM cursos 
    JOIN usuarios ON cursos.instructor_id = usuarios.id;
  `;
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

const crypto = require('crypto');


app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');
  const expirationDate = new Date();
  expirationDate.setUTCHours(expirationDate.getUTCHours() + 1);
  const formattedExpirationDate = expirationDate.toISOString().replace('Z', '').split('.')[0];

  
  // Aquí, actualiza tu base de datos con el token y la fecha de expiración para el usuario con el correo electrónico dado
  const query = "UPDATE usuarios SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?";
  db.query(query, [token, formattedExpirationDate, email], (err, result) => {
    if (err) {
          console.error(err);
          return res.status(500).send('Error en el servidor.');
      }
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey('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'); // Configura esto de manera segura en producción
      
      // Dentro de la misma función después de actualizar la base de datos con el token
      const resetUrl = `http://localhost:3000/reset-password/${token}`; // Asegúrate de cambiar esto por la URL correcta de tu frontend
      const msg = {
          to: email,
          from: 'sigeca.utez@gmail.com',
          subject: 'Recuperación de contraseña',
          text: `Estás recibiendo este correo porque tú (o alguien más) ha solicitado el restablecimiento de la contraseña de tu cuenta.\n\n` +
                `Por favor haz clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso:\n\n` +
                `${resetUrl}\n\n` +
                `Si no solicitaste esto, por favor ignora este correo y tu contraseña permanecerá sin cambios.\n`
      };
      
      sgMail.send(msg).then(() => {
          console.log('Correo de recuperación enviado');
          res.status(200).send('Correo de recuperación enviado');
      }).catch((error) => {
          console.error(error);
          res.status(500).send('Error al enviar el correo electrónico');
      });
        });
});

app.post('/reset-password', (req, res) => {
  const { token, password } = req.body;
  const connection = db.promise();
  console.log("Token recibido:", token);
  console.log("Fecha y hora actual del servidor:", new Date());

  // Primero, verifica que el token exista y no haya expirado
  const query = 'SELECT * FROM usuarios WHERE resetPasswordToken = ? AND resetPasswordExpires > UTC_TIMESTAMP()';
  
  connection.query(query, [token])
      .then(([results]) => {
          if (results.length === 0) {
              throw new Error('Token de restablecimiento de contraseña inválido o expirado.');
          }
          const user = results[0];

          // Si el token es válido, hashea la nueva contraseña y actualiza al usuario
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);

          return connection.query('UPDATE usuarios SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?', [hashedPassword, user.id]);
      })
      .then(() => {
          res.send({ message: 'La contraseña ha sido actualizada con éxito.' });
      })
      .catch((error) => {
          console.error('Error al restablecer la contraseña:', error);
          res.status(500).send({ message: error.message || 'Error al restablecer la contraseña.' });
      });
});


app.put('/update-course/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, precio, level, category, status, instructor_id } = req.body;

  if (!id || !title || !description || precio === undefined || !level || !category || !status || !instructor_id) {
      return res.status(400).send('Faltan datos necesarios para la actualización.');
  }

  const query = `
      UPDATE cursos SET
      title = ?,
      description = ?,
      precio = ?,
      level = ?,
      category = ?,
      status = ?,
      instructor_id = ?
      WHERE id = ?;
  `;

  db.query(query, [title, description, precio, level, category, status, instructor_id, id], (err, result) => {
      if (err) {
          console.error('Error al actualizar el curso:', err);
          return res.status(500).send('Error al actualizar el curso');
      }

      if (result.affectedRows === 0) {
          return res.status(404).send('Curso no encontrado');
      }

      res.send('Curso actualizado con éxito');
  });
});


// Endpoint para eliminar un curso
app.delete('/delete-course/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
      return res.status(400).send('Falta el ID del curso para eliminar.');
  }

  const query = 'DELETE FROM cursos WHERE id = ?';

  db.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error al eliminar el curso:', err);
          return res.status(500).send('Error al eliminar el curso');
      }

      if (result.affectedRows === 0) {
          return res.status(404).send('Curso no encontrado');
      }

      res.send('Curso eliminado con éxito');
  });
});



app.get('/courses/:id', (req, res) => {
  const { id } = req.params;  // Extrae el ID del curso desde la URL

  // Consulta SQL para obtener todos los detalles del curso específico
  const query = `
      SELECT c.*, u.nombre AS instructor_name, u.imagen AS instructor_image 
      FROM cursos c 
      JOIN usuarios u ON c.instructor_id = u.id
      WHERE c.id = ?;
  `;

  // Ejecuta la consulta en la base de datos
  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error al consultar el curso:', err);
          return res.status(500).send('Error al obtener los detalles del curso');
      }
      if (results.length > 0) {
          res.json(results[0]);  // Devuelve el curso encontrado
      } else {
          res.status(404).send('Curso no encontrado');  // No se encontró el curso con el ID proporcionado
      }
  });
});

function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id; // Asegúrate de que el 'id' es parte del payload del token cuando lo generas
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
}

app.post('/enroll', verifyToken, async (req, res) => {
  console.log('Inscripción en curso:', req.body);
  const { cursoId } = req.body;
  const token = req.headers.authorization.split(' ')[1];  // Asume 'Bearer [token]'
  const userId = getUserIdFromToken(token);

  // Inicia una transacción para manejar las operaciones de la base de datos
  const connection = await db.promise().getConnection();
  await connection.beginTransaction();

  try {
    // Verificar que el curso existe y está disponible para inscripción
    const [curso] = await connection.query('SELECT * FROM cursos WHERE id = ? AND status = "aprobado"', [cursoId]);
    if (curso.length === 0) {
        await connection.rollback();
        return res.status(404).send('Curso no encontrado o no disponible para inscripción.');
    }

    // Verificar que el usuario es un estudiante
    const [usuario] = await connection.query('SELECT * FROM usuarios WHERE id = ? AND utez_community = "estudiante"', [userId]);
    if (usuario.length === 0) {
        await connection.rollback();
        return res.status(403).send('Solo los estudiantes pueden inscribirse en cursos.');
    }

    // Inscribir al estudiante en el curso
    const [inscripcion] = await connection.query('INSERT INTO inscripciones (usuario_id, curso_id) VALUES (?, ?)', [userId, cursoId]);
    if (inscripcion.affectedRows === 0) {
        await connection.rollback();
        return res.status(500).send('Error al inscribir en el curso.');
    }

    // Actualizar las ventas del curso
    const nuevoTotalVentas = curso[0].ventas + curso[0].precio;
    const [updateVentas] = await connection.query('UPDATE cursos SET ventas = ? WHERE id = ?', [nuevoTotalVentas, cursoId]);
    if (updateVentas.affectedRows === 0) {
        await connection.rollback();
        return res.status(500).send('Error al actualizar las ventas del curso.');
    }

    // Commit de la transacción
    await connection.commit();
    res.send('Inscripción realizada con éxito y ventas actualizadas!');
  } catch (error) {
    console.error('Error durante la inscripción:', error);
    await connection.rollback();
    res.status(500).send('Error durante la inscripción.');
  } finally {
    connection.release();
  }
});



app.get('/course-enrollments/:cursoId', verifyToken, async (req, res) => {
  const { cursoId } = req.params;
  const userId = req.userId; // Suponiendo que esto es extraído del token JWT

  // Verificar que el curso pertenece al instructor
  const [course] = await db.promise().query('SELECT id FROM cursos WHERE id = ? AND instructor_id = ?', [cursoId, userId]);
  if (course.length === 0) {
      return res.status(404).send('Curso no encontrado o no es de su propiedad.');
  }

  // Obtener estudiantes inscritos
  const query = `
      SELECT u.nombre, u.apellidos, u.email, i.fecha_inscripcion
      FROM inscripciones i
      JOIN usuarios u ON i.usuario_id = u.id
      WHERE i.curso_id = ?
  `;
  db.query(query, [cursoId], (err, results) => {
      if (err) {
          console.error('Error al obtener inscripciones:', err);
          return res.status(500).send('Error al obtener los estudiantes inscritos');
      }
      res.json(results);
  });
});

// Suponiendo que tienes una tabla llamada `inscripciones` que tiene `usuario_id` y `curso_id`
app.get('/api/mis-cursos', verifyToken, async (req, res) => {
  const userId = req.userId; // Asegúrate de que el userId se obtiene correctamente, según tu autenticación

  const query = `
    SELECT c.* FROM cursos c
    JOIN inscripciones i ON c.id = i.curso_id
    WHERE i.usuario_id = ?;
  `;

  try {
    const [rows] = await db.promise().query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los cursos inscritos:', error);
    res.status(500).send('Error al obtener los cursos inscritos');
  }
});

app.get('/api/estudiantes-inscritos', verifyToken, async (req, res) => {
  try {
    // Asumiendo que 'req.userId' contiene el ID del instructor, ajusta según tu implementación
    const query = `
      SELECT u.nombre, u.email, c.title as curso_nombre
      FROM inscripciones i
      JOIN usuarios u ON u.id = i.usuario_id
      JOIN cursos c ON c.id = i.curso_id
      WHERE c.instructor_id = ?
    `;
    const [rows] = await db.promise().query(query, [req.userId]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send('No se encontraron estudiantes inscritos.');
    }
  } catch (error) {
    console.error('Error al obtener los estudiantes inscritos:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.get('/api/instructor/students', verifyToken, (req, res) => {
  const instructorId = req.userId;

  const sql = `
      SELECT u.id, u.nombre, u.email, u.imagen, c.title AS courseTitle, i.fecha_inscripcion
      FROM usuarios u
      JOIN inscripciones i ON u.id = i.usuario_id
      JOIN cursos c ON c.id = i.curso_id
      WHERE c.instructor_id = ?;
  `;

  db.query(sql, [instructorId], (error, results) => {
      if (error) {
          console.error('Error fetching enrolled students:', error);
          return res.status(500).json({ error: 'Error fetching enrolled students' });
      }
      res.json(results);
  });
});







  

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
