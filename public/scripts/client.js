console.log( 'js' );

// angular module
var myApp = angular.module( 'myApp', [] );


myApp.controller( 'ApiController', function( $http ){
    var vm = this;
    

    vm.getImages = function(){
        console.log('search parameters', vm.searchIn);
        $http({
            method: 'GET',
            url: '/giphy/' + vm.searchIn,
        }).then( function( response ){
            console.log( 'back from server call with:', response );
            vm.images=response.data.data;
        }); //end $http
    } // end getImage

    vm.getgame = function(){
        console.log('search parameters', vm.gameIn);
        $http({
            method: 'GET',
            url: '/bbg/' + vm.gameIn,
        }).then( function( response ){
            console.log( 'back from server call with:', response );
            vm.game=response.data;     
            console.log('vm.game:', vm.game);           
        }); //end $http
    } // end getImage
}); //end ApiController