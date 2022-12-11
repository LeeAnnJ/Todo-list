// router/index.ts

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get /');
    console.log(req.body);

    // ./index.html
    res.sendFile(__dirname + '/index.html');
    res.json({
        "code": 200,
        "msg": "success",
        // index.html
        "data": null
    });
});

// aboutpage
router.get('/about', (req, res) => {
    console.log('get /about');
    console.log(req.body);

    // ./about.html
    res.sendFile(__dirname + '/about.html');
    res.json({
        "code": 200,
        "msg": "success",
        // about.html
        // "data": null
    });
});

module.exports = router;