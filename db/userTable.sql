CREATE TABLE 'users' (
    userId INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
    username VARCHAR(255) DEFAULT userEmail,
    phone_number INT(15) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY(userId)
)