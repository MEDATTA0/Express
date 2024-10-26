CREATE TABLE IF NOT EXISTS 'todos' (
    id INT AUTO_INCREMENT,
    userId INT,
    title TEXT NOT NULL,
    todo_description TEXT,
    completed BOOLEAN DEFAULT 0,
    due_date DATE,
    created_at DATE DEFAULT NOW (),
    updated_at DATE DEFAULT NOW (),
    PRIMARY Key (id),
    FOREIGN KEY (userId) REFERENCES users (userId)
)