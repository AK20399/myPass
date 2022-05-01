"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
/* eslint new-cap: ["error", { "capIsNewExceptions": ["Router"] }] */
exports.router = express_1.default.Router();
exports.router.get('/test', (req, res) => {
    res.json({ status: 'success' });
});
exports.router.post('/login', (req, res) => {
    console.log('REQ:', req);
    res.json({ status: true, message: 'Logged in successfully', data: {} });
});
//# sourceMappingURL=routes.js.map