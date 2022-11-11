const express = require("express");
const cors = require("cors");
const app = express();



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./models");
db.sequelize.sync().then(async() => {
  //cria as modalidades na hora que inicia a API, porém, deve ser comentado 
  //ou deletado depois de utilizado pela primeira vez
  /*const debit = {
    modalidade: 'Débito'
  }
  await db.modality.create(debit);

  const credit = {
    modalidade: 'Crédito'
  }
  await db.modality.create(credit);*/
});

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

require("./routes/routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});