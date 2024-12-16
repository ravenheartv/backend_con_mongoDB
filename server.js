require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000;

// Opcional: Configuración del usuario y contraseña desde variables de entorno
const USER = process.env.USER || "";
const PASSWORD = process.env.PASSWORD || "";

// Conexión a MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/Juegitos`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.log("Error al conectar a MongoDB:", err));

// Esquema genérico de juegos
const juegoSchema = new mongoose.Schema({
  titulo: String,
  desarrollador: String,
  "fecha_lanzamiento": String,
  plataformas: [String]
});

// Rutas
// Ruta para obtener los juegos de una categoría específica
app.get("/juegos/categoria/:categoria", async (req, res) => {
  const categoria = req.params.categoria;

  try {
    // Verifica si la categoría existe en la base de datos
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes(categoria)) {
      return res.status(404).send("La categoría solicitada no existe.");
    }

    // Obtiene los documentos de la colección correspondiente
    const juegos = await mongoose.connection.collection(categoria).find().toArray();
    res.json(juegos);
  } catch (error) {
    res.status(500).send("Error al obtener los juegos de la categoría: " + error);
  }
});

// Ruta para listar todas las categorías disponibles
app.get("/", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const categorias = collections.map(c => c.name); // Extrae solo los nombres
    res.json(categorias);
  } catch (error) {
    res.status(500).send("Error al obtener las colecciones: " + error);
  }
});

// Servidor en ejecución
app.listen(port, () => {
  console.log(`Servidor lanzado en http://localhost:${port}`);
});
