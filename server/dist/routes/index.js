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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const google_auth_library_1 = require("google-auth-library");
const userSchema_1 = __importDefault(require("../models/userSchema"));
const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
const router = express_1.default.Router();
exports.router = router;
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { googleToken, googleId } = req.body;
    const ticket = yield client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID
    });
    const data = ticket.getPayload();
    const userData = yield userSchema_1.default.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    if (!userData) {
        const user = yield userSchema_1.default.create({ username: data === null || data === void 0 ? void 0 : data.name, email: data === null || data === void 0 ? void 0 : data.email, profilePicture: data === null || data === void 0 ? void 0 : data.picture, googleId, googleToken });
        res.status(201).json(user);
    }
}));
router.get('/dashboard', (req, res) => {
    res.json({ cookie: req.cookies });
});
router.get('/logout', (req, res) => {
    res.clearCookie('AuthToken');
    res.send('logout successful');
});
