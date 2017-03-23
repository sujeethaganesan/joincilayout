app.controller('faqController',['$rootScope','$scope','$http',faqController]);
function faqController($rootScope,$scope,$http){
	$rootScope.loginPage = false; 
	$rootScope.menu=true; /*The tab bar is made visible*/
	$http.get('assets/data/data.json') /*faq questions and answers are fetched from json*/
        .success(function(resp) {
        	console.log(resp.faq);

        	$scope.faq = resp.faq /*data is binded to the view*/
        })
       /* accordian funtion starts*/
	$scope.accordian=function(x,event){
		 if(angular.element(event.currentTarget).next().attr('class')=='answer'){
		 	angular.element(event.currentTarget).next().addClass('open');

		 }
		 else
		 {
		 	angular.element(event.currentTarget).next().removeClass('open');	
		 }

		}
		/*accordian function ends*/

} 
