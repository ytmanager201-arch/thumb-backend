const express = require("express");
const axios = require("axios");
const AdmZip = require("adm-zip");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.YOUTUBE_API_KEY;

function extractPlaylistId(url) {
  const match = url.match(/[?&]list=([^&]+)/);
  return match ? match[1] : null;
}

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/download", async (req, res) => {
  const { playlistUrl } = req.body;

  if (!playlistUrl) {
    return res.status(400).json({ error: "Playlist URL required" });
  }

  const playlistId = extractPlaylistId(playlistUrl);

  if (!playlistId) {
    return res.status(400).json({ error: "Invalid Playlist URL" });
  }

  try {
    let videos = [];
    let nextPageToken = "";

    do {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            maxResults: 50,
            playlistId,
            key: API_KEY,
            pageToken: nextPageToken,
          },
        }
      );

      videos.push(...response.data.items);
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    const zip = new AdmZip();

    for (let i = 0; i < videos.length; i++) {
      const videoId = videos[i].snippet.resourceId.videoId;

      const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      const image = await axios.get(thumbUrl, {
        responseType: "arraybuffer",
      });

      zip.addFile(`thumbnail_${i + 1}.jpg`, image.data);
    }

    const zipBuffer = zip.toBuffer();

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=thumbnails.zip",
    });

    res.send(zipBuffer);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
