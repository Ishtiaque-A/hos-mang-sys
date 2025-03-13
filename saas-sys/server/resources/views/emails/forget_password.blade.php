<!DOCTYPE html>
<html>
<head>
    <title>SAAS</title>
</head>
<body>
<p>Dear {{ $testMailData['user'] }}</p>
<p>Someone requested for reset password. Your password reset OTP is {{ $testMailData['otp'] }}. </p>

<br/><p>Thanks</p>
<br/><p>Saas Service</p>

</body>
</html>
