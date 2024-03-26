"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    //  res.setHeader("Access-Control-Allow-Origin", "*");
    //   res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "GET, POST, PUT, PATCH, DELETE",
    //   );
    //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header('Access-Control-Allow-Origin', CLIENT_ADDRESS); // אפשר גישה מכל מקור
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// app.use("/api", apiRouter);
app.use("/api", routes_1.default);
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
const port = 8000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
