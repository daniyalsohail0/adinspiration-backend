"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const db_1 = require("./db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const collectionRoutes_1 = __importDefault(
  require("./routes/collectionRoutes")
);
const savedCollectionRoutes_1 = __importDefault(
  require("./routes/savedCollectionRoutes")
);
const PORT = process.env.PORT;
const main = () => {
  const app = (0, express_1.default)();
  app.listen(PORT, () => {
    console.log(`App Started at Port: ${PORT}.`);
  });
  app.use(body_parser_1.default.json());
  app.use((0, cors_1.default)());
  app.use((0, morgan_1.default)("dev"));
  app.use("/auth", authRoutes_1.default);
  app.use("/api/v1", collectionRoutes_1.default);
  app.use("/api/v1", savedCollectionRoutes_1.default);
  (0, db_1.connectToDatabase)();
};
main();
