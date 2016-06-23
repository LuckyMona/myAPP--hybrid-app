angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('taskListCtrl', function($scope) { 


})
.controller('UploadsCtrl', function($scope, $stateParams, Chats) {
  // $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SystemCtrl', function($scope) {
  // $scope.settings = {
  //   enableFriends: true
  // };
})
.controller('ActiveCtrl', function($scope){
  
})
.controller('IdCtrl', function($scope){
  
})
.controller('newActCtrl', function($scope){
  
})
.controller('BlockCtrl', function($scope){
 
})
.controller('FloorCtrl', function($scope){
  $scope.block = 'A';
})
.controller('CategoryCtrl', function($scope){
  $scope.category = 'A';
});
