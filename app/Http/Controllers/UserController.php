<?php namespace App\Http\Controllers;

use Request;
use App\Models\User;
use DB;

session_start();

class UserController extends Controller {


	function createAccount(){
		if(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn']){
			$_SESSION['loggedIn'] = false;
			return redirect('/');
		} else{
			if(Request::input('email') != null && Request::input('email') != ''){
				$email = Request::input('email');
			}

			if(Request::input('password') != null && Request::input('password') != ''){
				$pass = hash("sha256", Request::input('password'));
			}
			User::addLogin($email, $pass);
			return redirect('/');
		}
	}

	function login(){
		$email = Request::input('email');
		$pass = hash("sha256", Request::input('password'));
		if(User::validateLogin($email, $pass)){
			$_SESSION['loggedIn'] = true;
			$_SESSION['email'] = $email;
			$_SESSION['screenX'] = User::getScreenX($email);
			$_SESSION['screenY'] = User::getScreenY($email);
			$_SESSION['heroX'] = User::getHeroX($email);
			$_SESSION['heroY'] = User::getHeroY($email);
			$_SESSION['removed'] = User::getRemovedTrees($email);
			$_SESSION['removedZombies'] = User::getRemovedZombies($email);
		
			return view('game');
		} else {
			return redirect('/');
		}

	}

	function checkLoggedIn() {
		if(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true){
			$_SESSION['screenX'] = User::getScreenX($_SESSION['email']);
			$_SESSION['screenY'] = User::getScreenY($_SESSION['email']);
			$_SESSION['heroX'] = User::getHeroX($_SESSION['email']);
			$_SESSION['heroY'] = User::getHeroY($_SESSION['email']);
			return view('game');
		} else{
			return redirect('/');
		}
	}

	function saveState(){
		User::saveState($_GET['x'], $_GET['y'], $_GET['removedTrees'], $_GET['removedZombies'], $_GET['heroPositionX'], $_GET['heroPositionY']);
	}

	function transport(){
		User::saveScreen($_GET['x'], $_GET['y']);
		$_SESSION['screenX'] = User::getScreenX($_SESSION['email']);
		$_SESSION['screenY'] = User::getScreenY($_SESSION['email']);
		return redirect('/home');
	}

	function logout(){
		$_SESSION['loggedIn'] = false;
		return redirect('/');
	}
}