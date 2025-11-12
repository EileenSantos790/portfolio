<?php
/**
 * Portfolio Contact Form - Email Handler
 * Sends contact form submissions via Gmail SMTP using PHPMailer
 */

// CORS headers - Support both www and non-www domains
$allowedOrigins = [
    'https://macarons.synology.me',
    'https://www.macarons.synology.me'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://macarons.synology.me");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Max-Age: 86400");
// Ensure caches/proxies vary on Origin
header("Vary: Origin");

// Include PHPMailer
require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', 'macaronsnas@gmail.com');
define('SMTP_PASSWORD', 'gzakpbchljydupnr');
define('RECIPIENT_EMAIL', 'eileen.santos@outlook.de');
define('FROM_EMAIL', 'macaronsnas@gmail.com');
define('FROM_NAME', 'Portfolio Contact Form');
define('DEBUG_MODE', false);

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"):
        http_response_code(200);
        exit;
        
    case("POST"):
        header("Content-Type: application/json");
        
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        // Validate input
        if (!$params || !isset($params->email) || !isset($params->name) || !isset($params->message)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing required fields']);
            exit;
        }

        // Validate email
        $email = filter_var($params->email, FILTER_VALIDATE_EMAIL);
        if (!$email) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid email format']);
            exit;
        }

        $name = htmlspecialchars(trim($params->name), ENT_QUOTES, 'UTF-8');
        $message = htmlspecialchars(trim($params->message), ENT_QUOTES, 'UTF-8');

        // Create PHPMailer instance
        $mail = new PHPMailer(true);

        try {
            // Server settings
            if (DEBUG_MODE) {
                $mail->SMTPDebug = 2;  // Enable verbose debug output
            }
            
            $mail->isSMTP();
            $mail->Host       = SMTP_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = SMTP_USERNAME;
            $mail->Password   = SMTP_PASSWORD;
            $mail->SMTPSecure = SMTP_SECURE;
            $mail->Port       = SMTP_PORT;
            $mail->CharSet    = 'UTF-8';

            // Recipients
            $mail->setFrom(FROM_EMAIL, FROM_NAME);
            $mail->addAddress(RECIPIENT_EMAIL);
            $mail->addReplyTo($email, $name);

            // Content
            $mail->isHTML(true);
            $mail->Subject = "Portfolio Contact - Message from " . $name;
            
            $mail->Body = "
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
            </head>
            <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                <div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;'>
                    <div style='background-color: white; padding: 30px; border-radius: 5px;'>
                        <h2 style='color: #2c3e50; margin-top: 0;'>New Contact Form Submission</h2>
                        
                        <div style='margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff;'>
                            <p style='margin: 5px 0;'><strong>Name:</strong> {$name}</p>
                            <p style='margin: 5px 0;'><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
                        </div>
                        
                        <div style='margin: 20px 0;'>
                            <h3 style='color: #2c3e50; margin-bottom: 10px;'>Message:</h3>
                            <div style='padding: 15px; background-color: #f8f9fa; border-radius: 3px;'>
                                " . nl2br($message) . "
                            </div>
                        </div>
                        
                        <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;'>
                            <p>This email was sent from your portfolio contact form</p>
                            <p>Received: " . date('d/m/Y H:i:s') . "</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";

            $mail->AltBody = "New contact from: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";

            $mail->send();
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Email sent successfully',
                'timestamp' => date('c')
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to send email',
                'details' => DEBUG_MODE ? $mail->ErrorInfo : 'Please try again later'
            ]);
        }
        break;
        
    default:
        http_response_code(405);
        header("Allow: POST, OPTIONS");
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}
