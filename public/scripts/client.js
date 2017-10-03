console.log( 'js' );

// angular module
var myApp = angular.module( 'myApp', [] );

myApp.controller( 'ApiController', function( $http ){
    var vm = this;

    vm.getImages = function(){
        $http({
            method: 'GET',
            url: '/giphy'
        }).then( function( response ){
            console.log( 'back from server call with:', response );
            vm.images=response.data.data;
        }); //end $http
    } // end getImage
}); //end ApiController