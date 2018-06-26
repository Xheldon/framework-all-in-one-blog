import angular from 'angular';
import '@uirouter/angularjs';
import path from 'path';

let app = angular.module('app', ['ui.router']);
app.run(function ($rootScope) {
    $rootScope.a = 'bbb';
});

console.log(path.resolve(__dirname, '../tpl/index.html'));

app.config(function ($stateProvider) {
    $stateProvider.state({
        name: 'hello',
        url: '/',
        templateUrl: 's.html'
    });
});


angular.bootstrap(document.getElementById('mount'), ['app']);