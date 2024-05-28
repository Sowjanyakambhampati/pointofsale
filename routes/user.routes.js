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