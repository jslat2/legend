<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="stylesheet.css">
    </head>
    <body>
        @include('header')
        <div class="content">
            <div class="loginBox">
                <div class="header">ACCOUNT LOGIN</div>
                <div class="loginContent">
                    <form action="/home" method="post" class="loginForm">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="formWord">Email:</div>
                        <input type="text" class="email" name="email">
                        <div class="formWord">Password:</div>
                        <input type="text" class="password" name="password">
                        <button>Login</button>
                    </form>
                    <div class="signupBox">NEED AN ACCOUNT? <br>
                        <a href="createaccount" class="signUp">SIGN UP NOW!</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
