"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    // Topics are served from frontend data files; this is a health endpoint
    res.json({ message: 'Topics are served statically from the frontend.' });
});
exports.default = router;
