
export async function wrongtodoId(req, res, next) {
    const todoId = req.params.todoId
        (!Number.parseInt(userId)) ? res.status(400).json({ message: "BAD Todo ID" }) : next();
}

export async function checkCreateParams(req, res, next) {
    const { title, todo_description, isCompleted } = req.body;
    // Checking if variables are falsy or null
    if (!title) res.status(400).json({ error: "Please enter the title" })
    else if (!todo_description) res.status(400).json({ error: "Please enter the description" })
    else if (typeof isCompleted !== "boolean") res.status(400).json({ error: "Please completed must be boolean" })
    else next()
}

export async function checkUpdateParams(req, res, next) {
    const todoId = req.params.todoId;
    const isCompleted = req.body
    if (!Number.parseInt(todoId)) res.status(400).json({ error: "BAD TODO ID" })
    else if (typeof isCompleted !== "boolean") res.status(400).json({ error: "Please completed must be boolean" })
    else next()
}
