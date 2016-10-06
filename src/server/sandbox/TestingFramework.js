// TESTING FRAMEWORK
var assertions = {
  assertTrue: function(condition, message) {
  	var errorMessage = 'Expected to be true, but got false';
  	if (message) {
  		errorMessage = message;
  	}
  	if (!condition) {
      throw new Error(errorMessage);
  	}
  },

  assertEqual: function(expected, actual) {
		this.assertTrue(
			expected == actual, 
			'Expected to equal ' + expected + ', but got: ' + actual
		);
	},

	assertThrow: function(expectedMessage, action) {
		var hasThrown = false;
		try {
			action();
		} catch (error) {
			hasThrown = true;
			this.assertEqual(expectedMessage, error.message);
		}
		this.assertTrue(hasThrown, 'Expected to throw an error, but nothing was thrown');
	},

	
};

var runTestSuite = function(testSuiteConstructor, options) {
	var options = options || {};
	var reporter = options.reporter || new SimpleReporter();

  var testSuitePrototype = createTestSuite(testSuiteConstructor);

  reporter.reportTestSuite(
    getTestSuiteName(testSuiteConstructor, testSuitePrototype)
  );
  
  for (var testName in testSuitePrototype) {
  	if (testName.match(/^test/)) {
  		reporter.reportTest(testName);
  		var testSuite = createTestSuite(testSuiteConstructor);
  		testSuite[testName]();
  	}
  }
};

module.exports = runTestSuite;