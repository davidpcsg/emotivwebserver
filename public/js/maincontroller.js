angular.module('app', [])
    .controller('MainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

        $scope.powerbar_style = {
            "background-color": "orange",
            "height": "10px",
            "border-radius": "10px",
            "width": "50px"
        }

        $scope.engagementbar_style = Object.assign({}, $scope.powerbar_style);
        $scope.frustrationbar_style = Object.assign({}, $scope.powerbar_style);
        $scope.excitementbar_style = Object.assign({}, $scope.powerbar_style);
        $scope.interestbar_style = Object.assign({}, $scope.powerbar_style);
        $scope.relaxationbar_style = Object.assign({}, $scope.powerbar_style);

        $scope.getContactStatusLed = function(contactStatus){
            let contactStatusLeds = ['img/led_off.png',
                                     'img/led_red.png',
                                     'img/led_orange.png',
                                     'img/led_yellow.png',
                                     'img/led_green.png'];
            return contactStatusLeds[contactStatus];
        }

        $scope.getActionLed = function(actionStatus){
            let actionStatusLeds = ['img/led_off.png',
                                    'img/hot.png',
                                    'img/cold.png'];
            return actionStatusLeds[actionStatus];
        }

        $scope.getActiveLed = function(active){
            let activeStatusLeds = ['img/led_red.png',
                                    'img/led_green.png']

            if (active == undefined)
                return activeStatusLeds[0];
            return activeStatusLeds[active];
        }

        $scope.setPowerBar = function(power){
            let powerStr = power.toString() + "%";
            $scope.powerbar_style.width = powerStr;
        }

        $scope.setEngagementBar = function(engagement){
            let engagementStr = Math.floor(100*engagement).toString() + "%";
            $scope.engagementbar_style.width = engagementStr;
        }

        $scope.setFrustrationBar = function(frustration){
            let frustrationStr = Math.floor(100*frustration).toString() + "%";
            $scope.frustrationbar_style.width = frustrationStr;
        }

        $scope.setExcitementBar = function(excitement){
            let excitementStr = Math.floor(100*excitement).toString() + "%";
            $scope.excitementbar_style.width = excitementStr;
        }

        $scope.setInterestBar = function(interest){
            let interestStr = Math.floor(100*interest).toString() + "%";
            $scope.interestbar_style.width = interestStr;
        }

        $scope.setRelaxationBar = function(relaxation){
            let relaxationStr = Math.floor(100*relaxation).toString() + "%";
            $scope.relaxationbar_style.width = relaxationStr;
        }

        $scope.updateStatus = function(){
            $http.get('/emotiv').then(function(response){
                $scope.action_status = response.data.action_status ? response.data.action_status.players[0] : undefined;
                $scope.active = response.data.contact_status ? response.data.contact_status.players[0].active : undefined;
                $scope.skill = $scope.action_status ? Math.round($scope.action_status.skill) : 0;
                if ($scope.active != undefined && $scope.action_status != undefined){
                    $scope.contact_status = response.data.contact_status.players[0].anodes;

                    $scope.setPowerBar($scope.action_status.power);
                    $scope.setEngagementBar($scope.action_status.metrics["engagement-boredom"]);
                    $scope.setFrustrationBar($scope.action_status.metrics.stress);
                    $scope.setExcitementBar($scope.action_status.metrics.excitement);
                    $scope.setInterestBar($scope.action_status.metrics.interest);
                    $scope.setRelaxationBar($scope.action_status.metrics.relaxation);
                }

                $timeout($scope.updateStatus, 100);
            });
        }
        $scope.updateStatus();
    }]);