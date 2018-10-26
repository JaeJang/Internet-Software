
DROP DATABASE IF EXISTS lab5;

CREATE DATABASE  lab5;

USE lab5;

CREATE TABLE questionT(
    question_id TINYINT NOT NULL,
    question longtext NOT NULL,
    correct_answer TINYINT NOT NULL,
    PRIMARY KEY(question_id)
);

CREATE TABLE answersT(
    question_id TINYINT NOT NULL,
    answer_index TINYINT NOT NULL,
    answer TEXT NOT NULL,
    PRIMARY KEY(question_id, answer_index),
    FOREIGN KEY(question_id) REFERENCES questionT(question_id) ON DELETE CASCADE
);





