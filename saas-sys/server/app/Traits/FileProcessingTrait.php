<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait FileProcessingTrait {
    public function imageUploaderBase64($imageData, $location = 'images/', $height = 500, $width = null) {
        $imageData = explode(';base64,', $imageData);
        if (! isset($imageData[1])) {
            return '';
        }
        $image = $imageData[1];
        $image = str_replace(' ', '+', $image);
        $imageName = Str::uuid().'.'.explode('image/', $imageData[0])[1];
        file_put_contents(public_path($location.$imageName), base64_decode($image));

        return url($location.$imageName);
    }

    public function validImageUploaderBase64($imageData, $location = 'images/', $height = 500, $width = null) {
        $imageData = explode(';base64,', $imageData);

        if (! isset($imageData[1])) {
            return ['status' => false, 'message' => '', 'url' => ''];
        }



        $image = $imageData[1];
        $image = str_replace(' ', '+', $image);
        $imageDataDecoded = base64_decode($image);

        // Get the image MIME type
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $imageMimeType = finfo_buffer($finfo, $imageDataDecoded);

        // Define allowed image MIME types
        $allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        // Check if the image MIME type is allowed
        if (!in_array($imageMimeType, $allowedImageTypes)) {
            // Not a valid image file
            return '';
        }

        // Generate a unique image name
        $imageName = Str::uuid() . '.' . explode('image/', $imageData[0])[1];

        // Save the image file
        file_put_contents(public_path($location . $imageName), $imageDataDecoded);

        // Return the URL of the uploaded image
        return url($location . $imageName);



        $image = $imageData[1];
        $image = str_replace(' ', '+', $image);

        // Extract MIME type and file extension
        $mimeInfo = explode('/', $imageData[0]);
        if (count($mimeInfo) !== 2) {
            return ['status' => false, 'message' => ''];
        }

        $mimePrefix = $mimeInfo[0];
        $extension = $mimeInfo[1];

        // Check if the MIME type corresponds to an image
        $allowedImageTypes = ['jpeg', 'jpg', 'png', 'gif'];

        if ($mimePrefix !== 'image' || ! in_array($extension, $allowedImageTypes)) {
            // Not a valid image file
            return ['status' => false, 'message' => 'INVALID_IMAGE'];
        }

        $imageName = Str::uuid().'.'.$extension;
        $filePath = public_path($location.$imageName);

        // Save the image file
        file_put_contents($filePath, base64_decode($image));

        return ['status' => true, 'message' => '', 'url' => url($location.$imageName)];
    }
}
