"use strict";
// router/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// aboutpage
router.get('/about', (req, res) => {
    console.log('get /about');
    // console.log(req.body);
    // ./about.html
    res.sendFile(__dirname + '/about.html');
    // res.json({
    //     "code": 200,
    //     "msg": "success",
    //     // about.html
    //     // "data": null
    // });
});
router.get('/', (req, res) => {
    console.log('get /');
    console.log('\n*** / ***\n');
    console.log(req.body);
    // ./index.html
    res.sendFile(__dirname + '/index.html');
    // res.json({
    //     "code": 200,
    //     "msg": "success",
    //     // index.html
    //     "data": null
    // });
});
module.exports = router;
