CREATE TABLE IF NOT EXISTS 'tasks' (
    task_id INT AUTO_INCREMENT,
    userId INT,
    title TEXT NOT NULL,
    task_description TEXT,
    completed BOOLEAN DEFAULT 0,
    due_date DATE,
    created_at DATE,
    updated_at DATE DEFAULT NOW;
    PRIMARY Key(task_id),
    FOREIGN KEY (userId) REFERENCES users(userId)
)