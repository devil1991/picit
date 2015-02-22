'use strict'

angular.module 'picitApp'
.config ($routeProvider) ->
  $routeProvider
  .when '/admin',
    templateUrl: 'app/admin/admin.html'
    controller: 'AdminCtrl'
