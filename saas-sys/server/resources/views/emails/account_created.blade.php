<!DOCTYPE html>
<html>
<head>
    <title>SAAS</title>
</head>
<body>
<p>Dear {{ $testMailData['user'] }}</p>
<p>Thanks for your interest of using this service. As based on our policy we have created an account for you. please login using flowing credential. </p>

<p>Email: {{ $testMailData['email'] }}</p>
<p>Password: {{ $testMailData['password'] }}</p>
<p>Please Change your password and update your organization right after login</p>


<br/><p>Thanks</p>
<br/><p>Saas Service</p>

</body>
</html>
