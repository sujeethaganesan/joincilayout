app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/employeesList',{
		templateUrl:'partials/employeeList.html',
		controller : 'employeeListController'
	})
	.when('/resourceRequest',{
		templateUrl:'partials/resourceRequest.html',
		controller : 'resourceRequestController'
	})
	.when('/faq',{
		templateUrl:'partials/FAQ.html',
		controller:'faqController'
	})
	
	.when('/logout', {
  template: '',
  controller: 'logoutController'
})
	.otherwise({
    redirectTo: '/'
	});
	
}])