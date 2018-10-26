<?php 
require_once('config.php');

//get a json object that contains question information
header('Content-type: application/json');
$json = file_get_contents('php://input');
$quiz = json_decode($json);


//connect to database
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
//create database if it doesn't exist
$sql_drop_db = "CREATE DATABASE IF NOT EXISTS ".DB_DATABASE;
$result = mysqli_query($conn, $sql_drop_db);
//select database
mysqli_select_db($conn, DB_DATABASE);

//delete and recreate tables
mysqli_query($conn, "DROP TABLE IF EXISTS questionT");
mysqli_query($conn, "DROP TABLE IF EXISTS answersT");

$sql_create_questionT = "CREATE TABLE questionT(
    question_id TINYINT NOT NULL,
    question longtext NOT NULL,
    correct_answer TINYINT NOT NULL,
    difficulty VARCHAR(6) NOT NULL,
    PRIMARY KEY(question_id)
)";

$sql_create_answersT = "CREATE TABLE answersT(
    question_id TINYINT NOT NULL,
    answer_index TINYINT NOT NULL,
    answer TEXT NOT NULL,
    PRIMARY KEY(question_id, answer_index),
    FOREIGN KEY(question_id) REFERENCES questionT(question_id) ON DELETE CASCADE
)";

$result = mysqli_query($conn, $sql_create_questionT);
$result = mysqli_query($conn, $sql_create_answersT);

//extract data from the json object and store in database
$index = 0;
foreach($quiz as $q)
{
    $index += 1;
    $question = $q->{"question"};
    $correct_answer = $q->{"correct"};
    $diffi = $q->{'difficulty'};
    $sql_insert = "INSERT INTO questionT(question_id, question, correct_answer, difficulty)
                    VALUES ('$index', '$question','$correct_answer','$diffi')";

    $result = mysqli_query($conn, $sql_insert);

    for($i = 0; $i < 4; $i++)
    {
        $answer = $q->{$i};
        $sql_insert = "INSERT INTO answersT(question_id, answer_index, answer)
                        VALUE('$index', '$i', '$answer')";
        
        $result = mysqli_query($conn, $sql_insert);
    }


}

?>