(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

    function FoundItems(){
      var ddo = {
        templateUrl: 'tableItem.html'
      };

      return ddo;

    };

    //AGREGAR MENSAJE NOTHING FOUND

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
      var narrow = this;
      narrow.items = [];
      narrow.notFound = false;
      narrow.foundItems = function(){
        narrow.items = [];
        narrow.notFound = false;
        try {
          var string = narrow.item.charAt(0).toUpperCase() + narrow.item.slice(1).toLowerCase();
          console.log(string);  
        } catch (error) {
          
        }
        
        var found = MenuSearchService.getMatchedMenuItems(string);
        found.then(function(response){
          // console.log(response.data);

          narrow.categories = response.data
          // console.log(narrow.categories);
          for (const [key, value] of Object.entries(narrow.categories)) {
            // console.log(`${key}: ${value.category.name}`);
            if(value.category.name===string){
              // console.log(value.menu_items)
              narrow.items = value.menu_items;
            }
          }

          if(narrow.items.length === 0){
            narrow.notFound = true;
            
          }

          narrow.removeItem = function($index){
            narrow.items.splice($index, 1);
          };
          
          // var res = narrow.categories.map(function(x){
          //   return x;
          // });
          
        })
      }
      

    };

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
      var service = this;
      var url = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json';
      
      service.getMatchedMenuItems = function(searchTerm){
        return $http({
          method: "GET",
          url: (url)
        })
        .then(function(result){
          var foundItems = result;
          return foundItems;
        });



      };


    };




})();