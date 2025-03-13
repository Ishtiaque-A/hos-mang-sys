<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Important Pathology Report from Mecro Health</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }

        p {
            color: #666;
            padding: 0px;
            margin: 0;
        }

        .signature {
            font-style: italic;
        }
    </style>
</head>

<body>
    <div>
        <p>Dear Patient,</p>
        <p>We are writing to inform you that the attached document contains an important Pathology Report from Mecro Health.</p>
        <p>Please review the report carefully. If you have any questions or concerns, feel free to contact us at Mecro Health Contact <a href="mailto:mecrohealth@gmail.com">mecrohealth@gmail.com</a> or +800 123 456 789.</p>
        <p>Thank you for choosing <a href="https://www.mecrohealth.com">Mecro Health Plus</a> for your healthcare needs.</p>
        <br>

        <p>Best regards,</p>
        <p class="signature">{{$pathology->clinical_details->clinical_details_name?? 'N/A'}}</p>
        <p>Mecro Health Plus</p>
    </div>
</body>

</html>