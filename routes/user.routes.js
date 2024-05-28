// const { routes } = require("../app");

// routes.patch("/assign-role/:userId", isAuthenticated, roleValidation(["admin"]), (req, res) => {
//     const { role } = req.body;
//     if (!["user", "admin", "vendor"].includes(role)) {
//         return res.status(400).json({ message: "Invalid role" });
//     }

//     User.findByIdAndUpdate(req.params.userId, { role }, { new: true })
//         .then(updatedUser => {
//             if (!updatedUser) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             res.json(updatedUser);
//         })
//         .catch(err => res.status(500).json({ message: "Internal Server Error", err }));
// });
const express = require("express");
const router = express.Router(); 

const { isAuthenticated } = require("../middleware/jwt.middleware");
const roleValidation = require("../middleware/roleValidation");
const User = require("../models/User.model");

router.patch("/assign-role/:userId", isAuthenticated, roleValidation(["admin"]), (req, res) => {

    const { role } = req.body;
        if (!["user", "admin", "vendor"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
    
         User.findByIdAndUpdate(req.params.userId, { role }, { new: true })
             .then(updatedUser => {
                 if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json(updatedUser);
            })
             .catch(err => res.status(500).json({ message: "Internal Server Error", err }));
    
});

module.exports = router; 
