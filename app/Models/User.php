<?php
namespace App\Models;

use DB;

class User{
	public static function addLogin($email, $pass){
		$salt = uniqid(mt_rand(), false);
		$hash = hash("sha256", $salt.$pass);
		$statement = ("INSERT INTO login (email, salt, hash) VALUES (:email, :salt, :hash)");
		DB::insert($statement, ['email'=>$email, 'salt'=>$salt, 'hash'=>$hash]);
	}

	public static function validateLogin($email, $pass){
		if($email == null || $pass == null){
			return false;
		}

		$sql = "SELECT * FROM login where email = '" . $email ."'";
        $row = DB::selectOne($sql);

        if($row == null){
        	return false;
        } else if(hash("sha256", $row->salt.$pass) == $row->hash){
        	return true;
        }

		return false;
	}

	public static function getRemovedTrees($email){
		$dbTrees = DB::table('removedTrees')->select('globalX', 'globalY', 'x', 'y')->get();
		$trees = [];
		foreach($dbTrees as $tree){
			$newTree = [];
			$newTree[0] = $tree->globalX;
			$newTree[1] = $tree->globalY;
			$newTree[2] = $tree->x;
			$newTree[3] = $tree->y;

			$trees[] = $newTree;
		}

		return $trees;
	}

	public static function getRemovedZombies($email){
		$dbTrees = DB::table('removedZombies')->select('globalX', 'globalY', 'x', 'y')->get();
		$zombies = [];
		foreach($dbTrees as $tree){
			$newTree = [];
			$newTree[0] = $tree->globalX;
			$newTree[1] = $tree->globalY;
			$newTree[2] = $tree->x;
			$newTree[3] = $tree->y;

			$zombies[] = $newTree;
		}

		return $zombies;
	}

	public static function getScreenX($email){
		$screenX = DB::table('saves')->select('xpos')->get();
		if(count($screenX) > 0){
			return $screenX[0]->xpos;
		} else {
			return 0;
		}
	}

	public static function getScreenY($email){
		$screenY = DB::table('saves')->select('ypos')->get();
		if(count($screenY) > 0){
			return $screenY[0]->ypos;
		} else {
			return 0;
		}
	}

	public static function getHeroX($email){
		$heroX = DB::table('saves')->select('heroX')->get();
		if(count($heroX) > 0){
			return $heroX[0]->heroX;
		} else{
			return 0;
		}
	}

	public static function getHeroY($email){
		$heroY = DB::table('saves')->select('heroY')->get();
		if(count($heroY) > 0){
			return $heroY[0]->heroY;
		} else{
			return 0;
		}
	}

	public static function saveState($xpos, $ypos, $trees, $zombies, $heroX, $heroY){
		DB::table('saves')->truncate();
		$statement = ("INSERT INTO saves (email, xpos, ypos, heroX, heroY) VALUES (:email, :xpos, :ypos, :heroX, :heroY)");
		DB::insert($statement, ['email' => $_SESSION['email'], 'xpos'=>$xpos, 'ypos'=>$ypos, 'heroX'=>$heroX, 'heroY'=>$heroY]);
		DB::table('removedTrees')->truncate();
		$treeArray = json_decode($trees);
		foreach ($treeArray as $value) {
			$sql = ("INSERT INTO removedTrees (email, globalX, globalY, x, y) VALUES(:email, :globalX, :globalY, :x, :y)");
			DB::insert($sql, ['email'=>$_SESSION['email'], 
							'globalX'=>json_encode($value[0]),
							'globalY'=>json_encode($value[1]),
							'x'=>json_encode($value[2]),
							'y'=>json_encode($value[3])]);
		}

		DB::table('removedZombies')->truncate();
		$zombieArray = json_decode($zombies);
		foreach ($zombieArray as $value){
			$sql = ("INSERT INTO removedZombies (email, globalX, globalY, x, y) VALUES(:email, :globalX, :globalY, :x, :y)");
			DB::insert($sql, ['email'=>$_SESSION['email'], 
							'globalX'=>json_encode($value[0]),
							'globalY'=>json_encode($value[1]),
							'x'=>json_encode($value[2]),
							'y'=>json_encode($value[3])]);
		}
	}

	public static function saveScreen($xpos, $ypos){
		DB::table('saves')->truncate();
		$statement = ("INSERT INTO saves (email, xpos, ypos) VALUES (:email, :xpos, :ypos)");
		DB::insert($statement, ['email' => $_SESSION['email'], 'xpos'=>$xpos, 'ypos'=>$ypos]);
	}
}