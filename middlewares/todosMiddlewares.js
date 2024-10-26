
export async function checkId(req, res, next) {
    const todoId = req.params.todoId;
    typeof todoId === "number"
        ? res.status(400).json({
            status: "failed",
            message: "BAD Todo ID"
        })
        : next();
}

export async function checkCreateParams(req, res, next) {
    let { title, ...args } = req.body;
    let { todo_description, is_completed } = args;
    let fields = Object.keys(args)
    const allowedFields = ["todo_description", "is_completed"]
    let notAllowedFields = []
    for (let i = 0; i < fields.length; i++) {
        console.log(fields[i])
        if (!allowedFields.includes(fields[i])) {
            notAllowedFields.push(fields[i]);
        }
    }
    if (notAllowedFields != 0) {
        res.status(400).json({
            status: "failed",
            message: "Fields not allowed !",
            notAllowedFields,
        });
        return;
    }

    if (is_completed) {
        try {
            is_completed = Boolean(is_completed);
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: "Please completed must be boolean"
            });
            console.error("error : ", error);
            return;
        }
    }
    // Checking if variables are falsy or null
    if (!title) {
        res.status(400).json({
            status: "failed",
            message: "Please enter the title"
        })
    }
    else { next() };
}

export async function checkUpdateParams(req, res, next) {
    const todoId = req.params.todoId;
    let { ...args } = req.body;
    let fields = Object.keys(args)
    const allowedFields = ["title", "todo_description", "is_completed"]
    let notAllowedFields = []
    for (let i = 0; i < fields.length; i++) {
        if (!allowedFields.includes(fields[i])) {
            notAllowedFields.push(fields[i]);
        }
    }
    if (notAllowedFields != 0) {
        res.status(400).json({
            status: "failed",
            message: "Fields not allowed !",
            notAllowedFields,
        });
        return;
    }

    if (args.is_completed) {
        try {
            args.is_completed = Boolean(args.is_completed);
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: "Please completed must be boolean",
            });
            console.error("Error : is_completed must be boolean");
            return;
        }
    }

    if (typeof todoId === "number") {
        res.status(400).json({
            status: "failed",
            message: "BAD TODO ID",
        })
    }
    else { next() };
}
