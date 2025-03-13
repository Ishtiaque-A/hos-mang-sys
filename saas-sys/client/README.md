For SSO 

Call 'api/v1/get/token' ,POST , body {'token':''32 digit token'} to get new auth token
Example shown in register page



Call 'api/v1/auth/redirect/token' ,POST , body {'to_url':''destination url'} to get temporary  token to get auth token
example shown in side nav