(function () {

	// declare wcie module
	angular.module('wcie', []);

	function wcieRun($templateCache) {
		$templateCache.put('wcie-button-directive.tpl.html', '<button style="background: lightblue; padding: 10px 20px; font-size: 1.6em; line-height: 1.6em;" type="button" ng-click="changePageStuff()">Change page stuff and get area of button</button>')
	}

	angular.module('wcie')
		.run(wcieRun);

	function wcieIndexCtrl() {
		var vm = this;
		
		vm.pageTitle = 'Basic Document';

		vm.pageColor = '#cacaca';

		vm.areaOfButton = '';

		return vm;
	}

	angular.module('wcie')
		.controller('wcie.IndexCtrl', wcieIndexCtrl);

	function wcieButtonDirective(wcieAreaCalculator) {

		var randomStrings = [
			'Cool Document',
			'Lovely Document',
			'Fun Document',
			'A really basic document',
			'Blah blah document'
		];

		var randomColors = [
			'grey',
			'blue',
			'white',
			'orange',
			'#cacaca'
		];

		function link(scope, elem, attrs) {

			scope.changePageStuff = function () {

				// change page title
				var randomStringsIdx = Math.floor(Math.random() * randomStrings.length);
				scope.wciePageTitle = randomStrings[randomStringsIdx];

				// change page colore
				var randomColorsIdx = Math.floor(Math.random() * randomColors.length);
				scope.wciePageColor = randomColors[randomColorsIdx];

				// get area of button
				var height = elem[0].offsetHeight;
				var width = elem[0].offsetWidth;
				scope.wcieAreaButtonDisplay = wcieAreaCalculator.calculate(height, width);
			};

		}

		return {
			restrict: 'E',
			scope: {
				wciePageTitle: '=',
				wciePageColor: '=',
				wcieAreaButtonDisplay: '='
			},
			templateUrl: 'wcie-button-directive.tpl.html',
			link: link
		};
	}

	angular.module('wcie')
		.directive('wcieButton', wcieButtonDirective);


	function wcieAreaCalculatorFactory() {
		var AreaCalculatorFactory = {};

		// calculate area
		// area formula is l * w
		AreaCalculatorFactory.calculate = function (width, height) {
			return width * height;
		};

		return AreaCalculatorFactory;
	}

	angular.module('wcie')
		.factory('wcieAreaCalculator', wcieAreaCalculatorFactory);

})();