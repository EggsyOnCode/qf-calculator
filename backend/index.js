const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs")
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/ethToUsd/:ethAmt", async (req, res) => {
  const eth = req.params.ethAmt;
  const conversionRate = await fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
  )
    .then((res) => res.json())
    .then((data) => data["data"]["rates"]["USD"])
    .catch((err) => console.log(err));
  const usdEquivalent = eth * conversionRate;
  const result = parseInt(usdEquivalent).toFixed(2);
  res.send(result.toString());
});

app.get("/vitalik-blog", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/assets/vitalik.ca/general/2019/12/07/quadratic.html")
  );
});

app.get('/yt-video',express.static(__dirname + "/assets"));

const port = process.env.PORT || 4000;
app.listen(port, console.log(`server is running at port ${port}`));
