const expressHandler = require("express-async-handler");
const axios = require("axios");
const cheerio = require("cheerio");

const Quiniela_cdad = require("../db/modelQuiniela");
const Loto5plus = require("../db/modelLoto5plus");

const getQuiniela_cdad = expressHandler(async (req, res) => {
  // const news = await Quiniela_cdad.find();

  // if (!news) {
  //   res.status(500).json({ error: "No news found" });
  // }

  res.status(200).json("OK");
});

// const getOneQuiniela_cdad = expressHandler(async (req, res) => {
//   const news = await Quiniela_cdad.findById(req.params.id);

//   if (!news) {
//     res.status(500).json({ error: "No news found" });
//   }
//   res.status(200).json(news);
// });

const postQuiniela_cdad = expressHandler(async (req, res) => {
  const quiniela_cdad = {
    tipo: req.body.tipo,
    anio: req.body.anio,
    mes: req.body.mes,
    dia: req.body.dia,
  };
  const { tipo, anio, mes, dia } = quiniela_cdad;

  const axiosResponse = await axios.request({
    method: "GET",
    url: `https://quiniela.loteriadelaciudad.gob.ar/resultadosQuiniela/descarga.php?sorteo=${anio}/${mes}/QNL51${tipo}${anio}${mes}${dia}.xml`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  // parsing the HTML source of the target web page with Cheerio
  if (axiosResponse.data) {
    const $ = cheerio.load(axiosResponse.data);
    // initializing the data structures
    // that will contain the scraped data
    const scrapedQuiniela = {
      _id: parseInt($("Sorteo").text()),
      fecha: $("FechaSorteo").text(),
      tipo: $("Modalidad").text(),
      suerte: {
        N01: $("Suerte").find("N01").text(),
        N02: $("Suerte").find("N02").text(),
        N03: $("Suerte").find("N03").text(),
        N04: $("Suerte").find("N04").text(),
        N05: $("Suerte").find("N05").text(),
        N06: $("Suerte").find("N06").text(),
        N07: $("Suerte").find("N07").text(),
        N08: $("Suerte").find("N08").text(),
        N09: $("Suerte").find("N09").text(),
        N10: $("Suerte").find("N10").text(),
        N11: $("Suerte").find("N11").text(),
        N12: $("Suerte").find("N12").text(),
        N13: $("Suerte").find("N13").text(),
        N14: $("Suerte").find("N14").text(),
        N15: $("Suerte").find("N15").text(),
        N16: $("Suerte").find("N16").text(),
        N17: $("Suerte").find("N17").text(),
        N18: $("Suerte").find("N18").text(),
        N19: $("Suerte").find("N19").text(),
        N20: $("Suerte").find("N20").text(),
      },
      letras: $("Suerte").find("letras").text(),
    };

    // Almacenar en base de datos MongoDB
    const quiniela_cdad_DB = await Quiniela_cdad.insertMany(scrapedQuiniela);

    if (!quiniela_cdad_DB) {
      res.status(500).json({ message: "Nothing Posted" });
    }
    res.status(200).json(quiniela_cdad_DB);
    // res.status(200).json(scrapedQuiniela);
  } else console.log("No existe el sorteo soliciado");
});

/**
 * Solicitudes CRUD Loto 5 Plus
 */
const postLoto5Plus = expressHandler(async (req, res) => {
  const loto5Plus = {
    anio: req.body.anio,
    mes: req.body.mes,
    dia: req.body.dia,
  };
  const { anio, mes, dia } = loto5Plus;

  const axiosResponse = await axios.request({
    method: "GET",
    url: `https://loto5.loteriadelaciudad.gob.ar/resultadosLoto5/descarga.php?sorteo=${anio}/${mes}/LT551X${anio}${mes}${dia}.xml`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  // parsing the HTML source of the target web page with Cheerio
  if (axiosResponse.data) {
    const $ = cheerio.load(axiosResponse.data);
    // initializing the data structures
    // that will contain the scraped data
    const scrapedLoto5Plus = {
      _id: parseInt($("Sorteo").text()),
      fecha: $("FechaSorteo").text(),
      Loto: {
        N01: $("Suerte").find("N01").text(),
        N02: $("Suerte").find("N02").text(),
        N03: $("Suerte").find("N03").text(),
        N04: $("Suerte").find("N04").text(),
        N05: $("Suerte").find("N05").text(),
      },
      Win5: {
        Ganadores: $("Ganadores").find("Ganadores01").text(),
        Premio: $("Pozos").find("Premio01").text(),
      },
      Win4: {
        Ganadores: $("Ganadores").find("Ganadores02").text(),
        Premio: $("Pozos").find("Premio02").text(),
      },
      Win3: {
        Ganadores: $("Ganadores").find("Ganadores03").text(),
        Premio: $("Pozos").find("Premio03").text(),
      },
    };

    // Almacenar en base de datos MongoDB
    const loto5Plus_DB = await Loto5plus.insertMany(scrapedLoto5Plus);

    if (!loto5Plus_DB) {
      res.status(500).json({ message: "Nothing Posted" });
    }
    res.status(200).json(loto5Plus_DB);
    // res.status(200).json(scrapedLoto5Plus);
  } else console.log("No existe el sorteo soliciado");
});

// const  updatequiniela_cdad = expressHandler(async (req, res) => {
//     const quiniela_cdad = await News.findByIdUpdate(
//         req.params.id,
//         {
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password
//         },
//         {
//             new:true,
//         }
//         );

//     if (!quiniela_cdad) {
//       res.status(500).json({ "message": "No Id Matched" });
//     }
//     res.status(200).json(quiniela_cdad);
//   });

// const  deleteNews = expressHandler(async (req, res) => {
//   const quiniela_cdad = await News.findByIdAndDelete(req.params.id);

//   if (!quiniela_cdad) {
//     res.status(500).json({ "message": "No Id Matched" });
//   }
//   res.status(200).json(quiniela_cdad);
// });

module.exports = { getQuiniela_cdad, postQuiniela_cdad, postLoto5Plus };
