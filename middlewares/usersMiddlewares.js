export async function checkId(req, res, next) {
    const userId = req.params.userId;
    (typeof userId === "number") ? res.status(400).json({ message: "BAD USER ID" }) : next();
}