import express from "express";
import { S3 } from "aws-sdk";

const app = express();

const s3 = new S3({
  accessKeyId: "666d4256d8c1a9113a893cb243c86c91",
  secretAccessKey:
    "e34572c5cd44dadebe14d30992f28e41c50da9f41c5eb4e7c73b218409b74f62",
  endpoint: "https://23a0844c9d627126b3bd7cc8188ad79b.r2.cloudflarestorage.com",
});

app.get("/*", async (req, res) => {
  const host = req.hostname;
  console.log("🚀 ~ app.get ~ host:", host);
  const id = host.split(".")[0];
  console.log("🚀 ~ app.get ~ id:", id);
  const filePath = req.path;
  console.log("🚀 ~ app.get ~ filePath:", filePath);

  const contents = await s3
    .getObject({
      Bucket: "vercel-re",
      Key: `dist/${id}${filePath}`,
    })
    .promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";

  res.set("Content-Type", type);
  res.send(contents.Body);
});

app.listen(3001, () => console.log("server listening on port 3001"));
