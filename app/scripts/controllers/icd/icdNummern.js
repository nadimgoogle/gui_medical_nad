
var app = angular.module('sbAdminApp');

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
app.controller('IcdNummernCtrl', function ($scope, ngDialog, serviceAjax) {

    serviceAjax.icdGefaeh().success(function (data) {
        $scope.icdGefaehs = data;
        $scope.viewbyN = 10;
        $scope.totalItemsN = $scope.icdGefaehs.length;
        $scope.currentPageN = 1;
        $scope.itemsPerPageN = $scope.viewbyN;
        $scope.maxSizeN = 4; //Number of pager buttons to show

        $scope.setPageN = function (pageNoN) {
            $scope.currentPageN = pageNoN;
        };

        $scope.pageChangedN = function () {
            console.log('Page changed to: ' + $scope.currentPageN);
        };

        $scope.setItemsPerPageN = function (num) {
            $scope.itemsPerPageN = num;
            $scope.currentPageN = 1; //reset to first paghe
        }
    })
    serviceAjax.icdHaupt().success(function (data) {
        $scope.icdHaupts = data;
        $scope.viewbyH = 10;
        $scope.totalItemsH = $scope.icdHaupts.length;
        $scope.currentPageH = 1;
        $scope.itemsPerPageH = $scope.viewbyH;
        $scope.maxSizeH = 4; //Number of pager buttons to show

        $scope.setPageH = function (pageNoH) {
            $scope.currentPageH = pageNoH;
        };

        $scope.pageChangedH = function () {
            console.log('Page changed to: ' + $scope.currentPageH);
        };

        $scope.setItemsPerPageH = function (num) {
            $scope.itemsPerPageH = num;
            $scope.currentPageH = 1; //reset to first paghe
        }
    })
    serviceAjax.icdGesamt().success(function (data) {
        $scope.icdGesamts = data;
        $scope.viewbyG = 10;
        $scope.totalItemsG = $scope.icdGesamts.length;
        $scope.currentPageG = 1;
        $scope.itemsPerPageG = $scope.viewbyG;
        $scope.maxSizeG = 4; //Number of pager buttons to show

        $scope.setPageG = function (pageNo) {
            $scope.currentPageG = pageNo;
        };

        $scope.pageChangedG = function () {
            console.log('Page changed to: ' + $scope.currentPageG);
        };

        $scope.setItemsPerPageG = function (num) {
            $scope.itemsPerPageG = num;
            $scope.currentPageG = 1; //reset to first paghe
        }
    })





    $scope.removeIcdGesamt = function (icdGesamt) {
        $scope.icdNum = icdGesamt;
        serviceAjax.icdListUsed(icdGesamt.code).success(function (data) {
            console.log(data);
            $scope.prozedurs = data.prozedurs;

            $scope.currentPageP = 1;




            $scope.setItemsPerPageP = function (num) {
                $scope.itemsPerPageP = num;
                $scope.currentPageP = 1;
            };

            $scope.krankheits = data.krankheits;

            $scope.currentPageK = 1;

            if (data.krankheits.length === 0 && data.prozedurs.length === 0) {
                var index = $scope.icdGesamts.indexOf(icdGesamt);

                serviceAjax.icdGesamtEntfernen(icdGesamt.code).success(function (data) {
                    if (index !== -1) {
                        $scope.icdGesamts.splice(index, 1);

                    }
                });
            } else {
                ngDialog.openConfirm({template: 'views/icd/entfernenForm.html',
                    scope: $scope
                }).then(
                        function (value) {

                        },
                        function (value) {
                        }
                );
            }
        });
    };
    $scope.entfernen = function () {
        var icd = $scope.icdNum;
        var index = $scope.icdGesamts.indexOf(icd);

        serviceAjax.icdGesamtEntfernen(icd.code).success(function () {
            if (index !== -1) {
                $scope.icdGesamts.splice(index, 1);

            }
            ngDialog.closeAll();
        });
        console.log($scope.codeIcd);

    };

    $scope.cancel = function () {
        ngDialog.closeAll();
    };
    $scope.entfernenNotes = function () {

        var response = [{"code": $scope.icdNum.code}, {"krankheits": $scope.krankheits}, {"prozedurs": $scope.prozedurs}];
        var icd = $scope.icdNum;
        var index = $scope.icdGesamts.indexOf(icd);
        console.log(response);
        serviceAjax.notesEntfernen(response).success(function () {
            serviceAjax.icdGesamtEntfernen(icd.code).success(function () {
                if (index !== -1) {
                    $scope.icdGesamts.splice(index, 1);

                }
            });

        });
        ngDialog.closeAll();
    };
});