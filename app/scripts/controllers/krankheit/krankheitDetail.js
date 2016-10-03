angular.module('sbAdminApp')
.controller('KrankheitDetailCtrl', function ($scope, $stateParams, serviceAjax) {
	var title = $stateParams.title;
	$scope.custom = true;
	var links=[];
	

	serviceAjax.infoKrankheit(title).success(function(data){
		$scope.krankheit = data;
		console.log("helloinfo");
		console.log(data.umlsInfo);
		var info=data.umlsInfo;
		var table = [];
		var table1=[];

		var str = data.umlsInfo;
		var regex = /<br><h4>Cui:/gi, result, indices = [];
		while ( (result = regex.exec(str)) ) {
			indices.push(result.index);
		}
j=0;
		for(i=0;i<info.length;i++){
			if(info[i]=='N' && info[i+1]=='a' && info[i+2]=='m' && info[i+3]=='e'){
				//alert(info.substring(i+11, info.indexOf("<br>")));
			console.log(i);console.log('i');
			table.push(info.substring(i+11, indices[j]));console.log(j);console.log('j');
				j++;
			}
		
	}

	var regex = /<p><h4>Name:/gi, result, indiceD = [];
		while ( (result = regex.exec(str)) ) {
			indiceD.push(result.index);
		}

		var regex = /<br><br>/gi, result, indiceF = [];
		while ( (result = regex.exec(str)) ) {
			indiceF.push(result.index);
		}

		for(k=0;k<indiceD.length;k++)
			table1.push(info.substring(indiceD[k],indiceF[k]+8));
	
		for(e=0;e<table1.length;e++){
		link=
		{
			name:table[e],
			data:table1[e]
		},
		
		links.push(link);}
		$scope.links=links;
		
		
			

	})


});