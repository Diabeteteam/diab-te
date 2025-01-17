var app = angular.module("ciqual", [ "ngResource", "siyfion.sfTypeahead" ]);

app.factory("Ingredients", [ "$resource" , function($resource) {
	return $resource("ciqual.json");
} ]);

app.controller("CiqualController", [ "$scope", "Ingredients", function($scope, Ingredients) {
	console.log("ok"),

    console.log("ciQUAL!!!")
	$scope.ingredients = [];
	$scope.poidsPortion = 100;
	$scope.nombrePortions = 4;
	
	var defaultIngredient = { selected : null, poids : 100 };
	
	$scope.ajouterIngredient = function() {
		$scope.ingredients.push(angular.copy(defaultIngredient));
	}
	
	for (var i = 0; i < 3; i++) {
		$scope.ajouterIngredient();
	}
	
	$scope.supprimerIngredient = function(index) {
		$scope.ingredients.splice(index, 1);
	};

	var ingredients = new Bloodhound({
		datumTokenizer : function(d) { return Bloodhound.tokenizers.whitespace(d.libelle); },
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		identify : function(d) { return d.id; },
		prefetch : "assets/data/data.json"
	});

	$scope.ingredientsDataset = {
		displayKey : 'libelle',
		source : ingredients.ttAdapter(),
		templates : {
			suggestion : function(data) {
				return "<button class=\"btn btn-default btn-sm btn-suggestion\">" + data.libelle + "<br/><small>" + data.categorie + "</small></button>";
			}
		}
	};

	$scope.typeaheadOptions = {
		highlight: true
	};
	
	$scope.$watch("ingredients", function(ingredients) {
		$scope.total = { poids : 0, proteines : 0, glucides : 0, lipides : 0, energie : 0 };
		ingredients.forEach(function(ingredient) {
			var nPoids = parseFloat(ingredient.poids);
			if (ingredient.selected && !isNaN(nPoids)) {
				$scope.total.poids += nPoids;
				if (ingredient.selected instanceof Object) {
					$scope.total.proteines += ingredient.selected.proteines * nPoids / 100;
					$scope.total.glucides += ingredient.selected.glucides * nPoids / 100;
					$scope.total.lipides += ingredient.selected.lipides * nPoids / 100;
					$scope.total.energie += ingredient.selected.energie * nPoids / 100;
				}
			}
		});
	}, true);
	
	$scope.pourPortionPoids = function(valeur) {
		if (($scope.total.poids === 0) || ($scope.poidsPortion === undefined) || ($scope.poidsPortion === null)) {
			return 0;
		}
		return $scope.poidsPortion * valeur / $scope.total.poids;
	};
	
	$scope.pourNombrePortions = function(valeur) {
		if (($scope.nombrePortions === undefined) || ($scope.nombrePortions === null)) {
			return 0;
		}
		return valeur / $scope.nombrePortions;
	}
} ])