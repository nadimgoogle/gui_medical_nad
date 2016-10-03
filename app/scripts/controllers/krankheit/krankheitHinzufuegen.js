angular.module('sbAdminApp')
  .directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })

.controller('KrankheitHinzufuegenCtrl', function ($http,$state,ngDialog,filterFilter, $scope, serviceAjax, $location) {
	
  var def = null;
  var nameU= null;
 $scope.umlsTerm = "";
   var listUMLS=[];

$scope.greeting = 'Hola!';

 /* send the term and then get the list of cui        */
 $scope.sendPost = function() {
  var data = $scope.umlsTerm;
  $http.post("http://localhost:8080/umls/send", data);
  //location.reload(true);
  $scope.umlsL = null;
$scope.loading = true;

  serviceAjax.umls().success(function(data){
 
  $scope.umlsL = data;
  console.log(data);
  $scope.viewbyU = 6;
  $scope.totalItemsU = $scope.umlsL.length;
  $scope.currentPageU = 1;
  $scope.itemsPerPageU = $scope.viewbyU;
  $scope.maxSizeU = 5;
  $scope.loading = false;

  $scope.setPageU = function (pageNoU) {
    $scope.currentPageU = pageNoU;
  };

  $scope.pageChangedU = function() {
    console.log('Page changed to: ' + $scope.currentPageU);
  };

  $scope.setItemsPerPageU = function(num) {
    $scope.itemsPerPageU = num;
    $scope.currentPagU = 1;
  }
});} 



/*   send the chosen name to get the definition*/
 $scope.sendCui=function(Cui,name){
    $http.post("http://localhost:8080/umls/sendId", Cui);
    $scope.definition=null;
    nameU=name;
    console.log(Cui);
    console.log("Cui");
  console.log(name);
$scope.loading = true;
    serviceAjax.umlsId().success(function(data){
  $scope.definition= data[data.length-1];
  //*********************************
  $scope.definition.ui= Cui;//Tnejem tne7eha hana sala7na lghalta
  //******************************
  console.log(data[data.length-1]);
  $scope.loading = false;


  


});
}


$scope.saveUmls=function(definition){

  def = definition;
  def.name=nameU;
  console.log("khsjnjn");
  
  console.log(def);


  var singleUMLS = {};
  singleUMLS=def;
  singleUMLS['name']=def.name;

  /*
  singleUMLS['ui']=def.ui;
  singleUMLS['definition']=def.definition;
  singleUMLS['semantictype']=def.semanticType;
  singleUMLS['numberofatom']=def.numberOfAtom;
*/
  listUMLS.push(singleUMLS);
  console.log("this is the list");
  console.log(listUMLS);


}

 

  
	  
	$scope.save = function(item, event) {
		formData = $scope.krankheit;
    console.log("save article");
    console.log(listUMLS);
     		formData.prozedur = $scope.prozedur;
    formData.umls=def;
    formData.listU =listUMLS;
    console.log(formData);
    

    //console.log($scope.krankheit.umls.name);
    

    serviceAjax.hinzuKrankheit(formData).success(function(data){
     $state.go('dashboard.krankheit')
     
   })
  };
  var loadProzedurs = function(){

    serviceAjax.prozed().success(function(data){
     $scope.prozedurs = data;
     $scope.viewbyP = 10;
     $scope.totalItemsP = $scope.prozedurs.length;
     $scope.currentPageP = 1;
     $scope.itemsPerPageP = $scope.viewbyP;
     $scope.maxSizeP = 5; 

     $scope.setPageP = function (pageNoP) {
      $scope.currentPageP = pageNoP;
    };

    $scope.pageChangedP = function() {
      console.log('Page changed to: ' + $scope.currentPageP);
    };

    $scope.setItemsPerPageP = function(num) {
      $scope.itemsPerPageP = num;
      $scope.currentPageP = 1; 
    };


  });
  };
  
  $scope.openProzedurForm = function() {
    loadProzedurs();

    ngDialog.openConfirm({template: 'views/krankheit/prozedurForm.html',
      scope: $scope 
    }).then(
    function(value) {

    },
    function(value) {
    }
    );
  };

  $scope.checkProzedur = function(prozedur){

   $scope.prozedur=prozedur;
   ngDialog.closeAll();
 };
 
 $scope.today = function() {
  $scope.dt = new Date();
};
$scope.today();

$scope.clear = function() {
  $scope.dt = null;
};

$scope.inlineOptions = {
  showWeeks: true
};

$scope.open2 = function() {
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