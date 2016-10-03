angular.module('sbAdminApp')
        .controller('umlsCtrl', function ($state, ngDialog, filterFilter, $scope, serviceAjax,$http) {

/*
            $scope.save = function (item, event) {
                formData = $scope.krankheit;
                formData.prozedur = $scope.prozedur;
                console.log(formData);

                serviceAjax.hinzuKrankheit(formData).success(function (data) {
                    $state.go('dashboard.krankheit')

                })
            };
            $scope.cancel = function () {
                $state.go('dashboard.krankheit')
            };*/

            var loadKrankheit = function () {
                console.log("hello");

                serviceAjax.krank().success(function (data) {
                    console.log(data);
                    $scope.Krankheits = data;
                    $scope.viewbyP = 10;
                    $scope.totalItemsP = $scope.Krankheits.length;
                    $scope.currentPageP = 1;
                    $scope.itemsPerPageP = $scope.viewbyP;
                    $scope.maxSizeP = 5;

                    $scope.setPageP = function (pageNoP) {
                        $scope.currentPageP = pageNoP;
                    };

                    $scope.pageChangedP = function () {
                        console.log('Page changed to: ' + $scope.currentPageP);
                    };

                    $scope.setItemsPerPageP = function (num) {
                        $scope.itemsPerPageP = num;
                        $scope.currentPageP = 1;
                    };


                });
            };

            $scope.openKrankheitForm = function () {
                loadKrankheit();

                ngDialog.openConfirm({template: 'views/krankheit/KrankheitForm.html',
                    scope: $scope
                }).then(
                        function (value) {

                        },
                        function (value) {
                        }
                );
            };
            $scope.openKrankheitForm2 = function () {
                loadKrankheit();

                ngDialog.openConfirm({template: 'views/krankheit/KrankheitForm2.html',
                    scope: $scope
                }).then(
                        function (value) {

                        },
                        function (value) {
                        }
                );
            };

            $scope.checkKrankheit = function (Krankheit) {
                $scope.tit=

                $scope.Krankheit = Krankheit;
                var title= Krankheit.title;
                $scope.tit=title;
                serviceAjax.infoKrankheit(title).success(function(data){
                console.log(data.umlsInfo);
                var u= data.umlsInfo;

                var table=[];
                if(u==null){
                    $scope.table=null;
                    
                }else{
                for (i = 0; i < u.length; i++){
                    if (u[i]=='C' && u[i+1]=='u' && u[i+2]=='i'){
                    console.log(u.substring(i+10,i+17));
                table.push(u.substring(i+10,i+18));}

            }
            $scope.name= "List of Cui";
            
            $scope.table=table;
            
            console.log(table);}



            })
                //console.log("krankheit",infoKrank);
                ngDialog.closeAll();
            };
            $scope.checkKrankheit2 = function (Krankheit2) {

                $scope.Krankheit2 = Krankheit2;
                var title= Krankheit2.title;
                $scope.tit2=title;
                serviceAjax.infoKrankheit(title).success(function(data){
                console.log(data.umlsInfo);
                var u2= data.umlsInfo;

                var table2=[];
                if(u2==null){
                    
                    $scope.table2=null;
                }else{
                for (i = 0; i < u2.length; i++){
                    if (u2[i]=='C' && u2[i+1]=='u' && u2[i+2]=='i'){
                    console.log(u2.substring(i+10,i+17));
                table2.push(u2.substring(i+10,i+18));}

            }
            $scope.name= "List of Cui";
            
            
            $scope.table2=table2;
            console.log(table2);}



            })
                //console.log("krankheit",infoKrank);
                ngDialog.closeAll();
            };
            $scope.checkRelation = function (table,table2) {
                $scope.rela="";
                    $scope.Nonrela="";
                var tableR=[];
                $scope.tableR=tableR;
                for(j=0;j<table.length;j++){
                    tableR.push(table[j]);
                   
                }
                tableR.push("000");
                for(e=0;e<table2.length;e++){
                    tableR.push(table2[e]);
                    
                }
                

                //console.log(tableR);
                $http.post("http://localhost:8080/umls/relation", tableR);
                console.log(tableR);
                console.log("before get");
                serviceAjax.rel().success(function (data){
                    console.log("after get");
                    console.log(data)
                    if(data[0]==null){
                        console.log("there is no relation");
                        $scope.Nonrela="There is no relation";
                        $scope.rela="";
                    }else{
                    
                    $scope.rela=data;
                    $scope.Nonrela="";


                    console.log(data);
                    
                    console.log("relation");}
                    
                });

            }


            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                showWeeks: true
            };

            $scope.open2 = function () {
                $scope.popup2.opened = true;
            };

            $scope.popup2 = {
                opened: false
            };
            $scope.options = {
                language: 'de'
            };

            $scope.onReady = function () {
            };
});