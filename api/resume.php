<?php
header('Content-Type: application/json');

// Enable CORS for your domain
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$jsonFile = '../data/resume.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($jsonFile)) {
        echo file_get_contents($jsonFile);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Resume data not found']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verify password hash
    $data = json_decode(file_get_contents('php://input'), true);
    $providedHash = isset($data['passwordHash']) ? $data['passwordHash'] : '';
    $expectedHash = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // Change this!
    
    if ($providedHash === $expectedHash) {
        // Update the resume data
        $resumeData = $data['resumeData'];
        $resumeData['lastModified'] = date('Y-m-d H:i:s');
        
        if (file_put_contents($jsonFile, json_encode($resumeData, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true, 'message' => 'Resume updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update resume']);
        }
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
    }
}
