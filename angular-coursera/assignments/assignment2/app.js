(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy = this;
        toBuy.list = ShoppingListCheckOffService.getListToBuy();
        toBuy.addItem = function(item, $index){
            ShoppingListCheckOffService.addItem(item, $index);

        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var already = this;
        already.showEmptyMessage = true;
        // already.items = ShoppingListCheckOffService.getItems();
        already.list = ShoppingListCheckOffService.getListAlready();
    }

    function ShoppingListCheckOffService(){
        var service = this;
        var items = [];
        var listToBuy = [
            {
                name : 'Bottle of Milk',
                quantity: 6
            },
            {
                name : 'Oranges',
                quantity: 10
            },
            {
                name : 'Cheese',
                quantity: 7
            },
            {
                name : 'Ham',
                quantity: 9
            },
            {
                name : 'Bottle of wine',
                quantity: 2
            }
        ];
        var listAlready = [];

        service.getListToBuy = function(){
            return listToBuy;
        };

        service.getListAlready = function(){
            return listAlready;
        };

        service.addItem = function(item, $index){
            console.log($index);
            listAlready.push(item);
            listToBuy.splice($index, 1);
            // return listAlready;
        };
    }




})();