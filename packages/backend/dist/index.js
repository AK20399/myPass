"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
(0, dotenv_1.config)();
app.use((0, cors_1.default)());
const publicDirectoryPath = path_1.default.join(__dirname, '../../frontend/build');
app.use(express_1.default.static(publicDirectoryPath));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(publicDirectoryPath, 'index.html'));
});
app.use('/api', routes_1.router);
app.listen(process.env.PORT, () => {
    return console.log('Server running on ' + process.env.PORT);
});
//# sourceMappingURL=index.js.map