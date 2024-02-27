"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = require("aws-sdk");
const app = (0, express_1.default)();
const s3 = new aws_sdk_1.S3({
    accessKeyId: "666d4256d8c1a9113a893cb243c86c91",
    secretAccessKey: "e34572c5cd44dadebe14d30992f28e41c50da9f41c5eb4e7c73b218409b74f62",
    endpoint: "https://23a0844c9d627126b3bd7cc8188ad79b.r2.cloudflarestorage.com",
});
app.get("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const host = req.hostname;
    console.log("🚀 ~ app.get ~ host:", host);
    const id = host.split(".")[0];
    console.log("🚀 ~ app.get ~ id:", id);
    const filePath = req.path;
    console.log("🚀 ~ app.get ~ filePath:", filePath);
    const contents = yield s3
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
}));
app.listen(3001, () => console.log("server listening on port 3001"));
