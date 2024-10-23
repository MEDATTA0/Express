CREATE TABLE 'users' (
    userId INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255),
    userPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY(userId)
)