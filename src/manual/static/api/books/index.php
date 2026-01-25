<?php
// dna-engine ~~ MIT License
// Books API
// Example:
//    HTTP GET https://dna-engine.org/api/books/3
//    Response 200 OK
//    Content-Type: application/json
//    {"id":3,"title":"Howdy HTML5","author":"Ed"}

// Request
$id = basename($_SERVER["REQUEST_URI"]);

// Database
$books = array(
   array("id" => 1, "title" => "Go JavaScript", "author" => "Jake"),
   array("id" => 2, "title" => "Styling CSS3",  "author" => "Abby"),
   array("id" => 3, "title" => "Howdy HTML5",   "author" => "Ed"),
   );

// Resource
if ($id == "books")  //GET all books
   $resource = $books;
elseif ($id > 0 && $id <= count($books))  //GET book by ID
   $resource = $books[$id - 1];
else
   $resource = array("error" => true, "code" => "not-found", "message" => "Resource not found");

// Response
$origin = isset($_SERVER["HTTP_ORIGIN"]) ? $_SERVER["HTTP_ORIGIN"] : "*";
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Origin: " . $origin);
header("Content-Type: application/json");
echo json_encode($resource);
?>
