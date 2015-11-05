<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CreateAccount</title>
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="stylesheet.css">
</head>
<body>
	@include('header')
    <div class="content">
        <div class="loginBox">
            <div class="header">CREATE ACCOUNT</div>
            <div class="loginContent">
                <form action="/" method="post" class="loginForm">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="formWord">Email:</div>
                    <input type="text" class="email" name="email">
                    <div class="formWord">Password:</div>
                    <input type="text" class="password" name="password">
                    <button>Submit</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>