USE sys;

DROP DATABASE IF EXISTS capstone;

CREATE DATABASE capstone;

USE capstone;


/***********************************
Create Tables
************************************/
CREATE TABLE users
(
    username VARCHAR(50) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    bio TEXT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE posts
(
	_id VARCHAR(255) NOT NULL DEFAULT(UUID()),
    text TEXT NOT NULL,
    username VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT(NOW()),
    PRIMARY KEY (_id),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE likes
(
	_id VARCHAR(255) NOT NULL DEFAULT(UUID()),
    username VARCHAR(50) NOT NULL,
    postId VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT(NOW()),
    PRIMARY KEY (_id),
    FOREIGN KEY (postId) REFERENCES posts(_id),
    FOREIGN KEY (username) REFERENCES users(username)
)




