forms<?php
  // 1. Mete imèl kote w vle resevwa mesaj yo a
  $receiving_email_address = 'alfredkendy2@gmail.com'; 

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "Nom: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Sujet: $subject\n\n";
    $email_body .= "Message:\n$message\n";

    // Fonksyon voye imèl la
    if (mail($receiving_email_address, $subject, $email_body, $headers)) {
        // SA A SE KLE A: Reponse "OK" pou validate.js la ka kontan
        echo "OK"; 
    } else {
        echo "Erreur: Le serveur n'a pas pu envoyer le message.";
    }
  } else {
    echo "Accès refusé.";
  }
?>
