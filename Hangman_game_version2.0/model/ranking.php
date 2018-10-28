<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'assignment1');

$name = $_GET["name"];
$score = $_GET["score"];

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
mysqli_select_db($conn, DB_DATABASE);

$sql_new_user = "INSERT INTO rank(name, score) VALUES('$name','$score')";
$result = mysqli_query($conn, $sql_new_user);


$sql_ranks = "SELECT name, score FROM rank ORDER BY score DESC, name ASC";
$result = mysqli_query($conn, $sql_ranks);

$rank = 1;
$index = 0;

while($row = mysqli_fetch_assoc($result))
{
    $score = $row['score'];
    if($index != 0){
        if($score != $pre_score)
        {
            $rank++;
        }
    }
    //$user = [$rank, $name];    
    $users[$index] = [$rank, $row['name'], $score];
    $pre_score = $score;
    $index++;
}
echo json_encode($users);
?>