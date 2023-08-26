const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
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

app.get("/yt-video", (req, res) => {
  const videoPath = "public/learn-qf.mp4"; // Path to your video file
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, console.log(`server is running at port ${port}`));
