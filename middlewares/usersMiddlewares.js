
export async function wrongUserId(req, res, next) {
    const userId = req.params.userId
        (!Number.parseInt(userId)) ? res.status(400).json({ message: "BAD USER ID" }) : next();
} 