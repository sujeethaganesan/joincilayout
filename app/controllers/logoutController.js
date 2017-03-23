app.controller('logoutController',['$rootScope','$location','$timeout',logoutController]);
function logoutController($rootScope,$location,$timeout) {

	$rootScope.menu=false;
	$rootScope.loginPage = true; /*The login page is made visible*/
	$location.path('/');
	$rootScope.pwdError="";
	$rootScope.passwordError=false;
	localStorage.removeItem("Name");
	$timeout(function (){window.location.reload()},0);/*The page is reloaded after the logout*/
    
}