<?php
require_once('config.php');

//Make condition(s) string for SQL query
//if there is any passed difficulty in user side
$condition = "";
$index = 0;
foreach($_GET as $name=>$value)
{
    if($index == 0)
    {
        $condition .= "WHERE difficulty = '".$value."'";
    }
    else
    {
        $condition .= " OR difficulty = '".$value."'";
    }

    ++$index;
}

//connect to mysql
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
if(!$conn)
{
    echo false;
    exit();
}

//select database
$result = mysqli_select_db($conn, DB_DATABASE);
if(!$result)
{
    echo false;
    exit();
}

//get rows from the question table
$sql = "SELECT * FROM questionT ".$condition;
$result = mysqli_query($conn, $sql);

//if no row found, return false;
if(mysqli_num_rows($result) < 1)
{
    echo false;
    exit();
}

//fetch data from database
$index = 0;
while($row = mysqli_fetch_assoc($result))
{
    $index++;
    $question['question'] = $row['question'];
    $question['correct'] = $row['correct_answer'];
    $question['difficulty'] = $row['difficulty'];
    $id = $row['question_id'];
    $sql_answers = "SELECT * FROM answersT WHERE question_id = '$id'";
    $result_answers = mysqli_query($conn, $sql_answers);
    while($row_answers = mysqli_fetch_assoc($result_answers))
    {
        $question[$row_answers['answer_index']] = $row_answers['answer'];
    }

    $array[$index] = $question;
}

//return json object
echo json_encode($array);
?>