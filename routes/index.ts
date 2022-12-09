// router/index.ts

import { Router } from 'express';
import { createServer } from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get /');
    console.log(req.body);

    // ./index.html
    // res.sendFile(__dirname + '/index.html');
    res.json({
        "code": 200,
        "msg": "success",
        // index.html
        "data": "index.html"
    });

});



module.exports = router;