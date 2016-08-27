/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(1);

	var Model = _interopRequireWildcard(_model);

	var _view = __webpack_require__(2);

	var View = _interopRequireWildcard(_view);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	Model.initialize();
	View.initialize();

	var isPaused = true;

	var nextStep = function nextStep() {};

	var tick = setInterval(function () {
	    if (!isPaused) {
	        nextStep();
	    }
	}, 1000);

	$('td').click(function () {
	    View.changeCellState($(this));
	    Model.changeCellState($(this).attr('id'));
	});

	$('#start-button').click(function () {
	    $(this).attr('disabled', 'true');
	    $('#pause-button').removeAttr('disabled');
	    isPaused = false;
	});

	$('#pause-button').click(function () {
	    $(this).attr('disabled', 'true');
	    $('#start-button').removeAttr('disabled');
	    isPaused = true;
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var cells = exports.cells = [];

	var field_width = exports.field_width = 30;
	var field_height = exports.field_height = 30;

	var initialize = exports.initialize = function initialize() {
	    for (var i = 0; i < field_height; i++) {
	        cells[i] = [];
	        for (var j = 0; j < field_width; j++) {
	            cells[i][j] = 0;
	        }
	    }
	};

	var changeCellState = exports.changeCellState = function changeCellState(cell_id) {
	    var _cell_id$split = cell_id.split('-');

	    var _cell_id$split2 = _slicedToArray(_cell_id$split, 2);

	    var x = _cell_id$split2[0];
	    var y = _cell_id$split2[1];


	    if (cells[x][y] === 1) {
	        cells[x][y] = 0;
	    } else {
	        cells[x][y] = 1;
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var field_width = exports.field_width = 30;
	var field_height = exports.field_height = 30;

	var initialize = exports.initialize = function initialize() {
	    var resulting_field = "";
	    for (var i = 0; i < field_height; i++) {
	        resulting_field += "<tr>";
	        for (var j = 0; j < field_width; j++) {
	            resulting_field += "<td id='" + i + "-" + j + "' class='dead'></td>";
	        }
	        resulting_field += "</tr>";
	    }
	    $("#game-field").html(resulting_field);
	};

	var changeCellState = exports.changeCellState = function changeCellState(cell) {
	    cell.toggleClass("alive dead");
	};

/***/ }
/******/ ]);