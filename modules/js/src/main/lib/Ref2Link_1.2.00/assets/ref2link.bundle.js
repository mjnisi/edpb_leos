//ADDED FOR LEOS LOADING: START
(function ($, window, define) {
//ADDED FOR LEOS LOADING: END

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
"use strict";

var _index = require("./lib/index");

var _underscore = require("./lib/utils/underscore");

require("./lib/utils/polyfill");

var _converters = require("./lib/utils/converters");

var _letters = require("./lib/utils/letters");

var _index2 = require("./lib/rules/index");

var _index3 = require("./lib/jquery/index");

var _index4 = require("./lib/formatters/index");

var _index5 = require("./lib/filters/index");

var _state = require("./lib/utils/state");

var _functions = require("./lib/utils/functions");

var _index6 = require("./lib/ux/index");

var _index7 = require("./lib/settings/index");

var _index8 = require("./lib/publication/index");

var _shared = require("./lib/utils/shared");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isBrowser = new Function("try { return this === window; } catch(e){ return false; }").call();
/**
 * Prevent double inclusion - CONFLUENCE
 */

if (isBrowser && window.R2L && window.R2L.version === _index.R2L.getConstant("R2L_VERSION")) {
  throw new Error("Already included R2L library");
}

console.debug("Initializing R2L");
_index.R2L._ = _underscore._;
_index.R2L.$el = null;
_index.R2L.version = _index.R2L.getConstant("R2L_VERSION");
_index.R2L.info = "<p>Ref2link version: ".concat(_index.R2L.version, "</p>");
_index.R2L.errors = [];
_index.R2L.delimiter2RegExp = _functions.delimiter2RegExp;
_index.R2L.getNonCapturingPattern = _functions.getNonCapturingPattern;
_index.R2L.letters = _letters.letters;
_index.R2L.filters = _index.R2L.defaultFilters = {
  environments: ['*']
};
_index.R2L.settings = _index7.settings;
_index.R2L.referenceSelector = _index7.settings["class"];
_index.R2L.simpleReferenceSelector = _index7.settings.classSimple;
_index.R2L.dataRef2linkInitialAttribute = _index7.settings.dataInitialAttribute;
_index.R2L.dataRef2linkContextAttribute = _index7.settings.dataContextAttribute;
_index.R2L.ref2linkDataAttribute = _index7.settings.dataAttribute;
_index.R2L.maxReferenceLength = _index7.settings.maxReferenceLength;
_index.R2L.maxTitleLength = _index7.settings.maxTitleLength;
_index.R2L.editOptions = _index7.editOptions; //DEPRECATED

_index.R2L.viewOptions = _index7.viewOptions;
_index.R2L.converters = _converters.converters;
_index.R2L.simpleParse = _functions.simpleParse;
_index.R2L.notooltipOptions = {
  tooltipTrigger: 'notooltip'
};
_index.R2L.options = {
  //defaults
  worker: false,
  aliases: false,
  metadata: false,
  strictSparql: true,
  enableSpecialRules: true,
  language: false
};
_index.R2L.globalMatches = _index.R2L.globalViews = {};
/**
 * Import new rules object (constants) 
 * @param Object $constants
 * 
 * @return boolean
 */

_index.R2L.importRules = function (constants) {
  var lang = constants.R2L_DEFAULT_LANG_ISO3 || null;

  var langMap = _index.R2L.getConstant('R2L_EULANG');

  if (lang && !langMap.get(String(lang).toUpperCase())) {
    return false;
  }

  _index.R2L.setConstant('R2L_DEFAULT_LANG_ISO3', lang);

  _index.R2L.setConstant('R2L_TYPED_RULES', constants.R2L_TYPED_RULES);

  _index.R2L.clearCache();

  _index.R2L.reloadRules();

  return true;
};

_index.R2L.clearCache = function () {
  this.globalMatches = {};
  this.globalViews = {};
  (0, _index3.clearTextCaches)();
  (0, _state.clearStates)();
  (0, _index3.clearExtracts)();
  (0, _index3.clearTooltips)();

  _index8.Publication.clearCache();
};

_index.R2L.unbind = function () {
  this.unbindTooltips();
};
/**
 * Configuration of options
 * @param ${options} object 
 */


_index.R2L.setOptions = function (options) {
  if (!options) {
    return;
  }

  if (options.worker !== undefined) {
    options.worker = Boolean(options.worker);

    if (Boolean(_index.R2L.options.worker) !== Boolean(options.worker)) {
      if (options.worker) {
        _index.R2L.registerWorker();
      } else {
        _index.R2L.destroyWorker();
      }
    }
  }

  if (options.enableSpecialRules !== undefined) {
    options.enableSpecialRules = Boolean(options.enableSpecialRules);

    if (Boolean(_index.R2L.options.enableSpecialRules) !== options.enableSpecialRules) {
      _index.R2L.options.enableSpecialRules = options.enableSpecialRules;

      _index.R2L.reloadRules();
    }
  }

  if (options.metadata !== undefined) {
    options.metadata = Boolean(options.metadata);

    if (Boolean(_index.R2L.options.metadata) !== options.metadata) {
      _index.R2L.options.ruleHeading = options.metadata ? _index.R2L.viewOptions.enhancedHeading : '';
    }
  }

  _index.R2L.options = _objectSpread({}, _index.R2L.options, {}, options);
};
/** 
 * Set language
 * @param ${language} string - ISO 3 language 
 */


_index.R2L.setLanguage = function (language) {
  this.options.language = language;
};
/** 
 * Get current language
 * @return string - ISO 3 language 
 */


_index.R2L.getLanguage = function () {
  var lang = this.options.language;
  return lang;
};

_index.R2L.registerWorker = function () {
  if (_index.R2L.worker || !window.Worker) {
    return false;
  } // URL.createObjectURL


  window.URL = window.URL || window.webkitURL;
  var response = "\n    self.addEventListener('message', function(event) {\n        var matches = [];\n        while((args = event.data.pattern.exec(event.data.text))) {\n            matches.push({\n                args: args,\n                lastIndex: event.data.pattern.lastIndex\n            });\n        }\n        postMessage({ text: event.data.text, matches: matches });\n    });";
  var blob;

  try {
    blob = new Blob([response], {
      type: 'application/javascript'
    });
  } catch (e) {
    // Backwards-compatibility
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    blob = new BlobBuilder();
    blob.append(response);
    blob = blob.getBlob();
  } // init worker


  _index.R2L.worker = new Worker(URL.createObjectURL(blob));

  _index.R2L.worker.onmessage = function (e) {
    if (e.data) {
      _shared.sharedCtx.setMatches(e.data.text, e.data.matches);

      _shared.sharedCtx.callback(e.data.text);

      _shared.sharedCtx.reset(e.data.text);
    }
  };
};

_index.R2L.destroyWorker = function () {
  if (_index.R2L.worker) {
    _index.R2L.worker.terminate();

    _index.R2L.worker = null;
  }
};

(0, _index5.bindFilters)(_index.R2L);
(0, _index4.bindFormatters)(_index.R2L);
(0, _index2.bindRules)(_index.R2L);
(0, _index3.bindJquery)(_index.R2L);
_index.R2L.triggers = (0, _index6.getTriggers)();

if (isBrowser) {
  /** For client env only */
  if (_index.R2L.options.worker && window.Worker) {
    _index.R2L.registerWorker();
  }

  (0, _index6.bindTooltips)(_index.R2L);
  window.R2L = _index.R2L;

  if (window.$ && window.$.fn) {
    window.$.fn.ref2link = _index.R2L;
  }
} else {
  /** Server-side bindings */
  module.exports = _index.R2L;

  global.btoa = function (str) {
    return new Buffer(str).toString('base64');
  };

  global.R2L = _index.R2L;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./lib/filters/index":2,"./lib/formatters/index":3,"./lib/index":4,"./lib/jquery/index":5,"./lib/publication/index":6,"./lib/rules/index":7,"./lib/settings/index":8,"./lib/utils/converters":11,"./lib/utils/functions":12,"./lib/utils/letters":13,"./lib/utils/polyfill":15,"./lib/utils/shared":16,"./lib/utils/state":17,"./lib/utils/underscore":18,"./lib/ux/index":19,"buffer":21}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindFilters = bindFilters;

var _underscore = require("../utils/underscore");

var _index = require("../rules/index");

var _filterInitialized = false;

function bindFilters(R2L) {
  var $ = R2L.getJquery();

  R2L.getInitialFilters = function () {
    var filters = {};
    /** Only in browser env we try to read querystring params of the library */

    if (!window) {
      return filters;
    }

    try {
      var scriptSrc = $('script[src*="ref2link"]').first().attr('src');
      var sqv = decodeURIComponent(scriptSrc.indexOf('?') >= 0 ? scriptSrc.split('?').pop() : '');
      var lqv = decodeURIComponent(document.location.href.indexOf('?') >= 0 ? document.location.href.split('?').pop() : '');
      var qv = [sqv, lqv].join('&');

      if (qv) {
        var parts = qv.split('&');

        for (var i = 0; i < parts.length; i++) {
          var p = parts[i].split('=');

          if (p && p.length > 1 && p[1] && p[1] !== '_default') {
            if (p[0] == 're' || p[0] == 'ruleenvironment') {
              filters['environments'] = p[1].split(',');
            }

            if (p[0] == 'rt' || p[0] == 'ruletarget') {
              filters['targets'] = p[1].split(',');
            }

            if (p[0] == 'rr' || p[0] == 'ruletype') {
              filters['types'] = p[1].split(',');
            }

            if (p[0] == 'sort') {
              filters['sort'] = p[1];
            }

            if (p[0] == 'views' && !isNaN(p[1])) {
              filters['views'] = parseInt(p[1]);
            }
          }
        }
      }
    } catch (e) {}

    return filters;
  };

  R2L.resetFilters = function () {
    if (_filterInitialized) {
      return;
    }

    _filterInitialized = true;
    var filters = R2L.getInitialFilters();
    R2L.filters = R2L.defaultFilters;

    _underscore._.each(filters, function (filterValue, filterName) {
      R2L.setFilter(filterName, filterValue);
    });
  };

  R2L.setFilter = function (searchedField, searchValue) {
    if (_underscore._.isArray(searchValue)) {
      _filterInitialized = true;

      if (searchedField == 'environments') {
        // always add public rules
        (0, _index.clearRuntimeRules)();
        var filteredEnvironments = [],
            globalEnvironments = Object.keys(R2L.getGlobalEnvironments());

        _underscore._.each(searchValue, function (_searchVal) {
          if (globalEnvironments.indexOf('' + _searchVal) >= 0) {
            filteredEnvironments.push('' + _searchVal);
          }
        });

        if (filteredEnvironments.indexOf('*') < 0) {
          filteredEnvironments.push('*');
        }

        searchValue = filteredEnvironments;
        R2L.filters['environments'] = searchValue;
      }

      R2L.filters[searchedField] = searchValue;
      /** see what targets match now that the env changed; reset targets with views that are in environment */

      var filteredRules = R2L.getAllRules(),
          availableTargets = [];

      _underscore._.each(filteredRules, function (_filteredRule) {
        _underscore._.each(_filteredRule.views, function (_view) {
          var targetName = _view.target;

          if (availableTargets.indexOf(targetName) < 0) {
            availableTargets.push(targetName);
          }
        });
      });

      if (R2L.filters['targets'] && R2L.filters['targets'].length) {
        R2L.filters['targets'] = _underscore._.intersect(R2L.filters['targets'], availableTargets);
      } else {
        R2L.filters['targets'] = availableTargets;
      }

      if (R2L.filters['targets'].indexOf('table') === -1) {
        R2L.filters['targets'].push('table');
      }

      if (R2L.filters.hasOwnProperty('targets') && R2L.filters.targets.length === 0 && R2L.filters.hasOwnProperty('types') && R2L.filters.types.length) {
        R2L.filters['targets'] = ['NONEOFTHISMATCHES'];
      }

      (0, _index.clearRuntimeRules)();
      R2L.clearCache();
    }
  };
  /** application parameters placeholders ; the generated file might have other values set in parameters.xml **/


  var _viewOptions = {};

  try {
    _viewOptions = JSON.parse(R2L.getConstant("R2L_VIEW_OPTIONS"));
  } catch (e) {
    console.error(e);
  }

  R2L.linkClassName = _viewOptions['linkClassName'];
  R2L.viewUsesTarget = _viewOptions['viewUsesTarget'];
  R2L.viewTitlePrefix = _viewOptions['viewTitlePrefix'];
  R2L.viewTitleSuffix = _viewOptions['viewTitleSuffix']; // when document is ready reset the filters

  $(R2L.resetFilters);
}

},{"../rules/index":7,"../utils/underscore":18}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAttributes = extractAttributes;
exports.bindFormatters = bindFormatters;

var _underscore = require("../utils/underscore");

var _index = require("../publication/index");

var _functions = require("../utils/functions");

var _index2 = require("../settings/index");

function extractAttributes(views) {
  var attributes = {};

  _underscore._.each(Object.keys(views), function (_view) {
    if (_view === "table") {
      return;
    }

    var view = views[_view];

    if (!view) {
      return;
    }

    var $view = $(view);

    _underscore._.each($view[0].attributes, function (attribute, index) {
      if (attribute.name.substr(0, 4) !== 'data') {
        return;
      }

      if (!attribute.value || attribute.value === "null") {
        return;
      }

      if (['data-debug', 'data-ref2link-initial'].indexOf(attribute.name) === -1) {
        attributes[attribute.name] = attribute.value;
      }
    });
  });

  return attributes;
}

;

function bindFormatters(R2L) {
  var $ = R2L.getJquery();

  function indent(indent, text) {
    return ' '.repeat(2 * indent) + text + '\r\n';
  }

  function escapeHTML(text) {
    return $('<div><div>').text(text).html();
  }
  /**
  * Build output nodes from the references. Group/count accordingly.
  *
  * @param Object[] references
  */


  R2L.getNodes = function (references) {
    var idx = 0;
    var rendered = {};
    var nodes = new Array();

    _underscore._.each(references, function (_ref) {
      if (!_ref || !_ref.rule) {
        return;
      }

      for (var k = 0; k < _ref.offsets.length; k++) {
        var views = [];
        var offsetUid = _ref.match;
        var urls = [];
        var attributes = extractAttributes(_ref.offsets[k].views);
        var label = _ref.match;

        _underscore._.each(Object.keys(_ref.offsets[k].views), function (_view) {
          var view = _ref.offsets[k].views[_view];

          if (!view) {
            return;
          }

          if (String(_view) === "table") {
            label = view;
            offsetUid = view;
          } else {
            views.push('<view target="' + escapeHTML(_view) + '"' + '>' + '<![CDATA[' + view + ']]>' + '</view>');
            var $view = $(view);

            if ($view.attr("href")) {
              if (urls.indexOf($view.attr("href")) === -1) {
                urls.push({
                  title: $view.attr("title"),
                  href: $view.attr("href"),
                  target: _view,
                  position: _ref.offsets[k].position
                });
              }
            } else {
              // can be a nested link
              $view = $(view).children("a");

              if ($view.attr("href")) {
                if (urls.indexOf($view.attr("href")) === -1) {
                  urls.push({
                    title: $view.attr("title"),
                    href: $view.attr("href"),
                    target: _view,
                    position: _ref.offsets[k].position
                  });
                }
              }
            }
          }
        });

        var attrArr = [];
        var data = {};

        for (var attrKey in attributes) {
          var key = attrKey.replace("data-ref-", "");
          key = key.replace("data-", "");
          data[key] = attributes[attrKey];
          attrArr.push(attrKey + "='" + attributes[attrKey] + "'");
        }

        if (data["celex"] || data["ecli"] || data["eli"] || data["finlex-eli"]) {
          data.metadata = _index.Publication.getMetadataById(data["celex"] || data["ecli"] || data["eli"] || data["finlex-eli"]) || {};
        }

        if (rendered[offsetUid]) {
          rendered[offsetUid].data.push(data);
          rendered[offsetUid].urls = urls;
          rendered[offsetUid].matches.push({
            'views': views,
            'position': _ref.offsets[k].position,
            'match': _ref.offsets[k].match,
            'context': _ref.offsets[k].context
          });
          rendered[offsetUid].count++;
          continue;
        }

        var node = {
          output: "",
          number: idx + 1,
          count: 1,
          data: [],
          urls: urls,
          reference: label,
          type: _ref.rule.baseType ? _ref.rule.baseType : _ref.rule.type,
          libelle: _ref.rule.baseLibelle ? _ref.rule.baseLibelle : _ref.rule.rulelibelle,
          matches: []
        };
        node.data.push(data);
        node.output += indent(1, '<record number="$nodeNumber">');
        node.output += indent(2, '<reference count="$nodeCounter' + (idx + 1) + '">' + node.reference + '</reference>');
        node.output += indent(2, '<type>' + escapeHTML(node.type) + '</type>');
        node.output += indent(2, '<libelle>' + escapeHTML(node.libelle) + '</libelle>');

        if (_index2.settings.views) {
          node.output += '$matches' + (idx + 1);
          node.output += '$urls' + (idx + 1);
        }

        node.output += indent(1, '</record>');
        idx++;
        rendered[offsetUid] = node;
        node.matches.push({
          'views': views,
          'position': _ref.offsets[k].position,
          'match': _ref.offsets[k].match,
          'context': _ref.offsets[k].context
        });
        nodes.push(node);
      }
    });

    for (var i = nodes.length - 1; i >= 0; i--) {
      var matchStr = "";
      matchStr += indent(2, "<matches>");
      nodes[i].output = nodes[i].output.replace("$nodeCounter" + (i + 1), nodes[i].count);
      nodes[i].matches.sort(function (a, b) {
        return a.position < b.position ? -1 : 1;
      });

      for (var mI = 0; mI < nodes[i].matches.length; mI++) {
        var m = nodes[i].matches[mI];

        if (mI === 0) {
          nodes[i].position = m.position;
        }

        matchStr += indent(3, "<match position='".concat(m.position, "' context='").concat(escapeHTML(m.context), "' reference='").concat(escapeHTML(m.match), "'>"));

        for (var vI = 0; vI < m.views.length; vI++) {
          matchStr += indent(4, m.views[vI]);
        }

        matchStr += indent(3, "</match>");
      }

      matchStr += indent(2, "</matches>");
      var urlStr = "";

      if (nodes[i].urls.length > 0) {
        urlStr += indent(2, '<urls>');

        for (var urlIndex = 0; urlIndex < nodes[i].urls.length; urlIndex++) {
          urlStr += indent(3, "<url position=\"".concat(nodes[i].urls[urlIndex].position, "\" target=\"").concat(nodes[i].urls[urlIndex].target, "\">").concat(nodes[i].urls[urlIndex].href, "</url>"));
        }

        urlStr += indent(2, '</urls>');
      }

      nodes[i].output = nodes[i].output.replace("$urls" + (i + 1), urlStr);
      nodes[i].output = nodes[i].output.replace("$matches" + (i + 1), matchStr);
    }

    nodes = R2L.applySort(nodes);

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].output = nodes[i].output.replace("$nodeNumber", i + 1);
    }

    return nodes;
  };

  R2L.formatters = {
    /** also act as a mapper between internal references and the public API */
    identity: function identity(inTextMatches) {
      return {
        result: (0, _functions.identity)(inTextMatches),
        type: 'x-internal/references',
        ext: 'ref2link'
      };
    },
    ref2table: function ref2table(references) {
      var nodes = R2L.getNodes(references);
      return {
        result: "<resultset size=\"".concat(nodes.length, "\">\r\n").concat(nodes.map(function (node) {
          return node.output;
        }).join(""), "</resultset>"),
        type: 'application/xml',
        nodes: nodes,
        ext: 'xml'
      };
    },
    xml: function xml(references) {
      var nodes = R2L.getNodes(references);
      return {
        result: "<resultset size=\"".concat(nodes.length, "\">\r\n").concat(nodes.map(function (node) {
          return node.output;
        }).join(""), "</resultset>"),
        type: 'application/xml',
        nodes: nodes,
        ext: 'xml'
      };
    },
    json: function json(references) {
      var nodes = R2L.getNodes(references);
      return {
        result: nodes.map(function (node) {
          delete node["output"];
          delete node["position"];
          return node;
        }),
        type: 'application/json',
        ext: 'json'
      };
    },
    html: function html(references, text) {
      return {
        result: text,
        type: 'text/html',
        ext: 'html'
      };
    }
  };
}

;

},{"../publication/index":6,"../settings/index":8,"../utils/functions":12,"../utils/underscore":18}],4:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.R2L = void 0;

var _underscore = require("./utils/underscore");

var _functions = require("./utils/functions");

var _letters = require("./utils/letters");

var _list = require("./utils/list");

var _index2 = require("./ux/index");

var _index3 = require("./settings/index");

var _index4 = require("./jquery/index");

var _alias = require("./transformers/alias");

var _index5 = require("./publication/index");

var _shared = require("./utils/shared");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Confluence binding
var $ = typeof AJS !== "undefined" && AJS.$ ? AJS.$ : jQuery;
var R2L = {};
exports.R2L = R2L;

R2L.getJquery = function () {
  return $;
};
/**
 * Constants can be injected at runtime
 * @param string $name
 * 
 * @return any
 */


R2L.getConstant = function (name) {
  var isBrowser = new Function("try { return this === window; } catch(e){ return false; }").call();

  if (!isBrowser && global && global["R2L_CONSTANTS"]) {
    // defaults
    if (name === "R2L_EULANG") {
      return _index3.settings.constants[name];
    }

    return global["R2L_CONSTANTS"][name];
  }

  return _index3.settings.constants[name];
};

R2L.setConstant = function (name, value) {
  var isBrowser = new Function("try { return this === window; } catch(e){ return false; }").call();

  if (!isBrowser && global && global["R2L_CONSTANTS"]) {
    global["R2L_CONSTANTS"][name] = value;
  }

  _index3.settings.constants[name] = value;
};
/**
 * Apply rules to text
 * @param string $text
 * @param Object $globalRule (optional)
 * @param boolean isAlias (optional) - when it's an alias parse we need to polish the matches before saving them
 * 
 * @return Object $matches
 */


R2L.applyGlobalRule = function (text, globalRule, isAlias) {
  if (!globalRule) {
    /** Guard checks optimization */
    var rules = this.runGuards(text, this.getRules());
    globalRule = this.compileGlobalRule(rules);
  }

  var matches = R2L.applyMultipleRules(text, globalRule, [], 0);

  if (!isAlias) {
    R2L.setGlobalMatches(matches);
  }

  return matches;
};
/**
 * Iterator function that abstracts over the webworker execution, making it behave like a Regexp iterator
 * 
 * @param string $text 
 * @param RegExp $multiMatchPattern 
 * @param integer $level
 * 
 * @return Array<string> $matches
 */


var _executor = function _executor(text, multiMatchPattern, level) {
  var data = level === 0 ? _shared.sharedCtx.getData(text) : null;

  if (R2L.options.worker && level === 0 && data && Array.isArray(data.matches)) {
    if (data.matches.length > data.cursor) {
      data.cursor++;
      multiMatchPattern.lastIndex = data.matches[data.cursor - 1].lastIndex;
      return data.matches[data.cursor - 1].args;
    } else {
      return false;
    }
  } else {
    return multiMatchPattern.exec(text);
  }
};
/**
 * Actual parsing function. Calls itself recursively in case of lists
 * @param string $text - text to parse
 * @param RegExp $multiMatchRule - For level 0 it is the compiled global rule (celex|ecli|act|eucase...). For level 1 it is the list-item pattern.
 * @param Array<Ref2link> $history - list items are stored for passing data in-between 
 * @param integer $level - the recursion level (0 or 1)
 * 
 * @return Object $matches - map of matches
 */


R2L.applyMultipleRules = function (text, multiMatchRule, history, level) {
  var args,
      matches = {};
  var rules = multiMatchRule.rules,
      multiMatchPattern = multiMatchRule.pattern,
      lastIndex = 0;

  if (!rules.length) {
    return {};
  }

  if (!history) {
    history = [];
  }

  if (!level) {
    level = 0;
  }

  detection: while (args = _executor(text, multiMatchPattern, level)) {
    var match = args[0],
        startPosition = multiMatchPattern.lastIndex - match.length;

    if (!match) {
      /** pattern matched empty string; the regexp will infinitely recurse */
      multiMatchPattern.lastIndex++;
      lastIndex = multiMatchPattern.lastIndex;
    }

    if (level === 0) {
      //polyfill for engines not supporting negative lookbehind 
      if (startPosition > 1) {
        var letterPattern = "[/0-9" + _letters.letters.latin + _letters.letters.cyrillic + _letters.letters.greek + _letters.letters.specialChars + "]";

        if (new RegExp(letterPattern, 'i').test(text[startPosition - 1])) {
          console.debug("Discarding match because of left neighbour", text[startPosition - 1]);
          continue;
        }
      }
      /** smooth over args since some rules have multiple groups */


      var offset = 0;

      for (var i = 0; i < rules.length; i++) {
        offset += rules[i].slots;

        if (rules[i].slots === 2) {
          args.splice(offset, 1);
          offset -= 1;
        }
      }
    }
    /** scan which of the arguments is not empty and apply respective rule */


    for (var i = 1; i <= args.length; i++) {
      if (args[i] && i - 1 < rules.length) {
        var itemMatches = {},
            rule = rules[i - 1];
        var trimPattern = rule ? rule.trimPattern || rule["trim-pattern"] : null;

        if (trimPattern) {
          try {
            var trimRegex = new RegExp(trimPattern);
            match = match.replace(trimRegex, '');
          } catch (e) {// move on
          }
        }
        /** check the skip rule */


        var skipPattern = rule ? rule.skipPattern || rule["skip-pattern"] : null;

        if (skipPattern) {
          try {
            var skipRegex = new RegExp(skipPattern);

            if (skipRegex.test(match)) {
              multiMatchPattern.lastIndex = multiMatchPattern.lastIndex - match.length + 1;
              lastIndex = multiMatchPattern.lastIndex;
              continue detection;
            }
          } catch (e) {// move on
          }
        }

        var ruleType = rule.type;
        var title = match;
        var reference = match;

        if (rule.allowTitle) {
          var normalizePattern = function normalizePattern(p, iFlag, surroundAndEscape) {
            surroundAndEscape = surroundAndEscape || false;
            var pattern = (p.source || p).replace(/^\/|\/[giumxns]*$/g, '');

            if (surroundAndEscape) {
              pattern = '(' + (0, _functions.getNonCapturingPattern)(pattern) + ')';
            }

            return new RegExp(pattern, 'gm' + iFlag);
          };

          var fullPattern = normalizePattern(rule.fullPattern, rule.casesensitive ? '' : 'i');
          var fullArgs = fullPattern.exec(args[i]);
          var controlExpr = "(?:[^\\]\\|\\r\\n\\v]*)";
          ruleType = $.trim(fullArgs ? fullArgs[1] : '');
          reference = fullArgs ? fullArgs[2] || fullArgs[4] || '' : '';
          title = fullArgs ? fullArgs[3] || '' : '';

          if (!reference || reference.length > R2L.settings.maxReferenceLength || ruleType && rule.type.toLowerCase() !== ruleType.toLowerCase()) {
            multiMatchPattern.lastIndex = startPosition + 1;
            continue detection;
          }

          if (title) {
            if (title.length > R2L.settings.maxTitleLength) {
              title = match = reference;
              multiMatchPattern.lastIndex = startPosition + reference.length;
            } else {
              controlExpr = "\\[" + controlExpr + "\\s*\\|\\s*(?:[^\\]\\n\\r\\v]*?)\\]";
            }
          } else {
            if (!rule.forced && !ruleType) {
              match = $.trim(R2L.converters.trim(reference, '[]'));
              reference = match;
            }
          }

          controlExpr = '(' + (0, _functions.regExpEscape)(rule.type) + ')' + (rule.forced ? '' : '?') + "[\t ]*" + controlExpr;
          controlExpr = new RegExp(controlExpr, 'i');

          if (!controlExpr.test(match)) {
            multiMatchPattern.lastIndex = ++lastIndex;
            continue detection;
          }
        } else {
          if (level === 1) {
            title = null;
          }
        }

        lastIndex = multiMatchPattern.lastIndex;

        if (level === 0) {
          history = [];
        }
        /** If there's an itemRule go straight to item matching */


        if (rule.itemRule) {
          var itemMultiMatchRule = R2L.compileGlobalRule([rule.itemRule]);
          itemMatches = R2L.applyMultipleRules(match, itemMultiMatchRule, history, 1);
        } else {
          var appliedRule = R2L.applyRule(match, rule, rule.customTitle ? null : title, match, history);

          if (appliedRule) {
            match = appliedRule.wholeMatch;
            appliedRule.startPosition = startPosition;

            if (!rule.itemRule) {
              itemMatches[match] = appliedRule;

              if (level === 1) {
                history.push(appliedRule);
              }
            }
          } else {
            console.debug('Multi match, no rule match', i, match, rule, appliedRule);
          }
        }

        if (level === 0 && history.length > 1) {
          var listRef = (0, _list.getListCore)(history[0].rule, history[0].matches);

          if (listRef.length === 0) {
            /** Inverted lists might need some help */
            for (var hI = 0; hI < history.length; hI++) {
              if (hI > 0) {
                /**
                 * We clone identifiers forward eg:
                 * articles 5 paragraphs 6, 7       # 6 & 7 are paragraphs of art. 5
                 */
                (0, _list.cloneListIdentifiers)(history[hI - 1], history[hI]);
              }

              if (hI < history.length - 1) {
                /**
                 * We clone list core data from the last element in the case of inverted lists
                 * 
                 * articles 5, 6, 7 of Dir. 78/99   # articles 5, 6 need directive info
                 */
                (0, _list.cloneListCore)(history[history.length - 1], history[hI]);
                /** 
                 * If identifiers are not complete we copy those also 
                 */

                var identifiers = (0, _list.getListIdentifiers)(history[history.length - 1].rule, history[history.length - 1].matches);
                /**
                 * points 5 and 7 of article 2(3) Dir. 78/99      # point 5 & 7 belongs to an article
                 */

                var coreIdentifiers = (0, _list.getCoreIdentifiers)(history[hI].rule, history[hI].matches);

                if (coreIdentifiers.length === 0 && identifiers.length > 0) {
                  (0, _list.cloneCoreIdentifiers)(history[history.length - 1], history[hI]);
                }
              }

              var hItem = history[hI];
              /** Re-render */

              var sPos = hItem.startPosition;
              var appliedRule = R2L.applyRule(hItem.reference, hItem.rule, hItem.link, hItem.wholeMatch, [], history[hI].matches);

              if (appliedRule) {
                match = appliedRule.wholeMatch;
                appliedRule.startPosition = sPos;
                itemMatches[match] = appliedRule;
              }
            }
          }
        }

        if (level === 0 && rule["item-pattern"]) {
          _underscore._.each(itemMatches, function (itemReference, itemKey) {
            itemReference.startPosition = startPosition + itemReference.startPosition;
          });
        }

        _underscore._.each(itemMatches, function (_item, _itemMatch) {
          if (!matches.hasOwnProperty(_itemMatch)) {
            if (Object.keys(_item.views).length > 0) {
              matches[_itemMatch] = _item;
            }
          } else {
            if (matches[_itemMatch].rule !== _item.rule) {
              matches[_itemMatch].alternatives = matches[_itemMatch].alternatives.concat(_item.alternatives);

              matches[_itemMatch].alternatives.sort(_index2.orderSorter);
            }
          }
        });

        if (level === 0 && Object.keys(itemMatches).length > 0) {
          _underscore._.each(itemMatches, function (_item, _itemMatch) {
            if (!matches[_itemMatch]) {
              return;
            }

            matches[_itemMatch].offsets.push({
              'matches': _item.matches,
              'match': _itemMatch,
              'position': _item.startPosition,
              'views': _item.views,
              'counter': 1,
              'alternatives': _item.alternatives,
              'context': args[0]
            });

            matches[_itemMatch].counter++;
          });

          _underscore._.each(itemMatches, function (_item, _itemMatch) {
            if (!matches[_itemMatch]) {
              return;
            }

            _underscore._.each(_item.alternatives, function (_alternative, _index) {
              _alternative.context = args[0];

              try {
                if (_alternative.viewName === 'table') {
                  return;
                }

                var _v = $(_alternative.view);

                _v.attr(R2L.dataRef2linkContextAttribute, args[0]);

                _alternative.view = _v[0].outerHTML;
              } catch (e) {}
            });
          });
        }
      }
    }
  }

  return matches;
};
/**
 * Apply sort over a list of nodes
 * @param Object[] list of nodes
 * 
 * @return Object[] sorted list
 */


R2L.applySort = function (nodes) {
  if (nodes.length < 2) {
    return nodes;
  }
  /* Supported sort fields */


  var fields = new Array("count", "position", "reference", "type", "libelle");

  var sort = _index3.settings.sort.toLowerCase();

  if (typeof sort !== "string") {
    return nodes;
  }

  var pieces = sort.split(".");
  var direction = "asc";
  var field = pieces[0];

  if (fields.indexOf(field) === -1) {
    return nodes;
  }

  if (pieces.length > 1) {
    direction = pieces[1] === "asc" || pieces[1] === "desc" ? pieces[1] : direction;
  }

  nodes.sort(function (a, b) {
    if (direction === "asc") {
      return a[field] < b[field] ? -1 : 1;
    } else {
      return a[field] > b[field] ? -1 : 1;
    }
  });
  return nodes;
};
/**
 * Helper function to get the last results. Previous parse is required.
 * @ param string $format (xml|json|html)
 * 
 * @return Object|null 
 */


R2L.getFormattedReferences = function (format) {
  format = format || 'identity';

  if (!this.$el) {
    return false;
  }

  var formatter = format,
      references = this.$el.getReferences();
  ;

  if (_underscore._.isString(format)) {
    formatter = this.formatters[format];
  }

  return formatter(references, this.$el.html());
};

R2L.parseAnnotations = function (text) {
  var $el = $("<div>" + text + "</div>");
  var links = $el.find("a").toArray();
  links = links.filter(function (link) {
    return /\(\d+\)/.test($(link).text());
  });
  links.map(function (link) {
    text = text.replace(new RegExp((0, _functions.regExpEscape)(link.outerHTML), 'g'), "");
  });
  return text;
};
/**
 * Replace the default link with an alternative
 * @param Object $target - the ref2link object 
 * @param $alternative - the rendered alternative object
 */


R2L.setAlternative = function (target, alternative) {
  try {
    var $self = $(target).closest(R2L.settings["class"] + ', .ref2link-tooltip'),
        $parents = $self.parents(R2L.settings["class"] + ', .ref2link-tooltip').last(),
        $view = $(alternative.view);

    if ($parents.length) {
      $self = $parents;
    }

    if (!$self.length || !$view.length) {
      return;
    }

    var reference = $self.getRef2linkMatch();
    $view.setRef2linkMatch(reference);
    $self.replaceWith($view);
  } catch (e) {}
};
/**
 * Remove the link from a reference
 */


R2L.removeReference = function (target) {
  var $container = $(target).parentsUntil(":not(.".concat(_index3.settings.generatedClassName, ")"));

  if ($container.length) {
    return $container.unparseTextRules();
  }

  return $(target).unparseTextRules();
};
/**
 * Fetch metadata from the Publication Office 
 * @param Array<Ref2Link> nodes from the scan
 * 
 * @return Promise<Object>
 */


R2L.loadMetadata = function (nodes) {
  var celexIds = [];
  var ecliIds = [];
  var eliIds = [];
  var finlexEliIds = [];
  nodes.forEach(function (ref) {
    celexIds = celexIds.concat(ref.data.map(function (d) {
      return d.celex;
    }));
    eliIds = eliIds.concat(ref.data.map(function (d) {
      return d.eli;
    }));
    finlexEliIds = finlexEliIds.concat(ref.data.map(function (d) {
      return d["finlex-eli"];
    }));
  });
  celexIds = celexIds.filter(function (celexId) {
    return !!celexId;
  });
  eliIds = eliIds.filter(function (eliId) {
    return !!eliId;
  });
  finlexEliIds = finlexEliIds.filter(function (finlexEliId) {
    return !!finlexEliId;
  });
  nodes.forEach(function (ref) {
    ecliIds = ecliIds.concat(ref.data.map(function (d) {
      return d.celex ? null : d.ecli;
    })); //if there's a CELEX don't load anything
  });
  ecliIds = ecliIds.filter(function (ecliId) {
    return !!ecliId;
  });
  var p1 = new Promise(function (resolve, reject) {
    var metadata = {};

    if (celexIds.length === 0) {
      resolve();
      return;
    }

    _index5.Publication.getCelexData(celexIds).then(function (data) {
      if (data && data.results && data.results.bindings) {
        data.results.bindings.map(function (binding) {
          if (binding.id && binding.id.value) {
            metadata[binding.id.value.replace("celex:", "")] = binding;
          }
        });
      }

      _index5.Publication.setMetadata(metadata);

      resolve(data);
    })["catch"](function (err) {
      resolve(null);
    });
  });
  var p2 = new Promise(function (resolve, reject) {
    var metadata = {};

    if (ecliIds.length === 0) {
      resolve();
      return;
    }

    _index5.Publication.getEcliData(ecliIds).then(function (data) {
      if (data && data.results && data.results.bindings) {
        data.results.bindings.map(function (binding) {
          if (binding.id && binding.id.value) {
            metadata[binding.id.value] = binding;
          }
        });
      }

      _index5.Publication.setMetadata(metadata);

      resolve(data);
    })["catch"](function (err) {
      resolve(null);
    });
  });
  var p3 = new Promise(function (resolve, reject) {
    var metadata = {};

    if (eliIds.length === 0) {
      resolve();
      return;
    }

    _index5.Publication.getEliData(eliIds).then(function (data) {
      if (data && data.results && data.results.bindings) {
        data.results.bindings.map(function (binding) {
          if (binding.id && binding.id.value) {
            metadata[binding.id.value] = binding;
          }
        });
      }

      _index5.Publication.setMetadata(metadata);

      resolve(data);
    })["catch"](function (err) {
      resolve(null);
    });
  });
  var p4 = new Promise(function (resolve, reject) {
    var metadata = {};

    if (finlexEliIds.length === 0) {
      resolve();
      return;
    }

    _index5.Publication.getFinlexEliData(finlexEliIds).then(function (data) {
      if (data && data.results && data.results.bindings) {
        data.results.bindings.map(function (binding) {
          if (binding.id && binding.id.value) {
            metadata[binding.id.value] = binding;
          }
        });
      }

      _index5.Publication.setMetadata(metadata);

      resolve(data);
    })["catch"](function (err) {
      console.error(err);
      resolve(null);
    });
  });
  _index5.Publication.hasData = false;
  return Promise.all([p1, p2, p3, p4]).then(function () {
    _index5.Publication.hasData = true;
    (0, _index2.resetTooltips)();
    return _index5.Publication.getMetadata([].concat(_toConsumableArray(celexIds), _toConsumableArray(ecliIds), _toConsumableArray(eliIds), _toConsumableArray(finlexEliIds)));
  })["catch"](function (e) {
    console.error(e);
    _index5.Publication.hasData = true;
    return {};
  });
};
/**
 * Apply an order map to ref2link
 * 
 *  { ruletype1: [target1, target2 ...], ruletype2: [target3, target1, target2], ... }
 * 
 * @param Object order
 */


R2L.applyViewOrder = function (order) {
  var _this = this;

  var _loop = function _loop(ruleType) {
    _this.getRules().filter(function (r) {
      return r.type === ruleType;
    }).map(function (rule) {
      rule.views.map(function (view) {
        var index = order[ruleType].indexOf(view.target);
        view.order = index === -1 ? view.order + order[ruleType].length : index;
        return view;
      });
    });
  };

  for (var ruleType in order) {
    _loop(ruleType);
  }
};
/**
 * Direct parse API method
 * @param string text
 * @param string format (html|xml|json)
 * @param Object opts @see R2L.options
 * 
 * @return Promise
 */


R2L.parse = function (text, format, opts) {
  if (opts) {
    this.setOptions(opts);
  }

  format = String(format).toLowerCase();
  var rules = R2L.getRules();
  rules = R2L.runGuards(text, rules);
  var globalRule = R2L.compileGlobalRule(rules);
  var matches = R2L.applyGlobalRule(text, globalRule);
  var newText = (0, _index4.replaceHtmlNodes)(text, matches); // also parse aliases

  if (R2L.options.aliases) {
    var replaceAliasesResult = (0, _alias.replaceAliases)(newText, (0, _index4.getExtracts)());

    if (replaceAliasesResult.offsets.length > 0) {
      var tempText = replaceAliasesResult.text; // run parser again after replacing aliases

      var _rules = R2L.getRules();

      _rules = R2L.runGuards(tempText, _rules);

      var _globalRule = R2L.compileGlobalRule(_rules);

      var newMatches = R2L.applyGlobalRule(tempText, _globalRule, true);
      newMatches = (0, _alias.replaceAliasMatches)(newMatches, replaceAliasesResult);
      R2L.setGlobalMatches(newMatches);
      matches = (0, _functions.mergeMatches)(matches, newMatches);
    }
  }

  return new Promise(function (resolve, reject) {
    switch (format) {
      case "html":
        resolve(R2L.formatters.html(matches, R2L.replaceHtml(text, matches)));
        break;

      case "xml":
        resolve(R2L.formatters.xml(matches));
        break;

      case "json":
        if (opts && opts.metadata) {
          R2L.loadMetadata(R2L.getNodes(matches)).then(function (res) {
            resolve(R2L.formatters.json(matches));
          });
        } else {
          resolve(R2L.formatters.json(matches));
        }

        break;

      default:
        resolve(text);
        break;
    }
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./jquery/index":5,"./publication/index":6,"./settings/index":8,"./transformers/alias":9,"./utils/functions":12,"./utils/letters":13,"./utils/list":14,"./utils/shared":16,"./utils/underscore":18,"./ux/index":19}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearTextCaches = clearTextCaches;
exports.clearTooltips = clearTooltips;
exports.clearExtracts = clearExtracts;
exports.getExtracts = getExtracts;
exports.padCounter = padCounter;
exports.unpadCounter = unpadCounter;
exports.extract = extract;
exports.unExtractRaw = unExtractRaw;
exports.unExtractNode = unExtractNode;
exports.unExtract = unExtract;
exports.bindJquery = bindJquery;
exports.replaceHtmlNodes = replaceHtmlNodes;

var _underscore = require("../utils/underscore");

var _index = require("../ux/index");

var _functions = require("../utils/functions");

var _alias = require("../transformers/alias");

var _index2 = require("../settings/index");

var _list = require("../utils/list");

var _state = require("../utils/state");

var _shared = require("../utils/shared");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var textCaches = {};
var extracts = [];

function clearTextCaches() {
  textCaches = {};
}

function clearTooltips() {
  $('.ref2link-tooltip').remove();
}

function clearExtracts() {
  extracts = [];
}

function getExtracts() {
  return extracts;
}

function padCounter(counter) {
  return 'N' + counter + 'N';
}

;

function unpadCounter(paddedCounter) {
  return ("" + paddedCounter).substr(1, paddedCounter.length - 1);
}

;

function extract($node, selector, whole) {
  var $ = R2L.getJquery();
  var extractCounter = extracts.length;
  $node.find(selector).each(function () {
    var $this = $(this),
        html = '<ref2link-object oid="' + padCounter(extractCounter) + '">';

    if (whole) {
      html += $this.html();
    }

    html += '</ref2link-object>';
    $this.replaceWith(html);
    var e = {
      $this: $this,
      whole: whole
    };
    extracts.push(e);
    extractCounter++;
  });
}

;

function unExtractRaw(html) {
  var parsedHtml = html;

  for (var i = extracts.length - 1; i >= 0; i--) {
    var $node = extracts[i].$this;
    var search = "<ref2link-object oid=\"".concat(padCounter(i), "\"></ref2link-object>");
    var replacement = $node.prop('outerHTML');
    parsedHtml = parsedHtml.split(search).join(replacement);
  }

  return parsedHtml;
}

function unExtractNode() {
  var $ = R2L.getJquery();
  var $this = $(this),
      index = parseInt(unpadCounter($this.attr('oid')), 10),
      object = index < extracts.length ? extracts[index] : null;

  if (!object) {
    return;
  }

  var $original = object.$this.clone();
  /** clone so that multiple occurrences get replaced */

  if (object.whole) {
    $original.html($this.html());
  }

  unExtract($original);
  var ref2link = $original.getRef2linkMatch();
  $original.data(R2L.ref2linkDataAttribute, ref2link);
  $this.replaceWith($original);
}

;

function unExtract($node) {
  $node.find('ref2link-object').reverse().each(function () {
    return unExtractNode.call(this);
  });
}

;

function bindJquery(R2L) {
  var $ = R2L.getJquery();

  $.fn.parseReferences = function (rules, useWorker) {
    rules = rules || R2L.getRules();
    clearTooltips();
    (0, _index.bindTooltips)(R2L);
    var $self = $(this);
    var initialContent = $self.html();
    $self.data("initial", initialContent);
    /** Annotations parsing (disabled) */
    //$self.html(R2L.parseAnnotations(initialContent));

    /** safe harbour some nodes */

    $self.find('[xmlns]').removeAttr('xmlns');
    $self.find('[xmlns\\:ddwrt]').removeAttr('xmlns:ddwrt');
    extract($self, '[onclick], form, [href^="mailto:"]', true);
    /** only the node will be excluded from scans; the content will be parsed */

    extract($self, 'script, a, img, :input, iframe', false);
    /** these nodes will be excluded from scans, content included */

    var html = '';
    $self.each(function () {
      html += $(this).html() + ' ';
    });
    /** Guard checks optimization */

    rules = R2L.runGuards(html, rules);
    var globalRule = R2L.compileGlobalRule(rules);

    if (useWorker && R2L.worker) {
      return new Promise(function (resolve, reject) {
        _shared.sharedCtx.setCallback(html, function () {
          var matches = R2L.applyGlobalRule(html, globalRule);
          /** scan only the text; false positives will be skipped */

          $self.each(function () {
            $(this).parseNodeReferences(matches);
          });
          resolve($(this));
        });

        R2L.worker.postMessage({
          text: html,
          pattern: globalRule.pattern
        });
      });
    } else {
      var matches = R2L.applyGlobalRule(html, globalRule);
      $self.each(function () {
        $(this).parseNodeReferences(matches);
      });
    }
  };

  $.fn.parseNodeReferences = function (matches) {
    var $self = $(this);
    var source = $self.html(); // also parse aliases

    if (R2L.options.aliases) {
      var html = replaceHtmlNodes(source, matches);
      var replaceAliasesResult = (0, _alias.replaceAliases)(html, getExtracts());

      if (replaceAliasesResult.offsets.length > 0) {
        var tempHtml = replaceAliasesResult.text; // run parser again after replacing aliases

        var rules = R2L.getRules();
        rules = R2L.runGuards(tempHtml, rules);
        var globalRule = R2L.compileGlobalRule(rules);
        var newMatches = R2L.applyGlobalRule(tempHtml, globalRule, true);
        newMatches = (0, _alias.replaceAliasMatches)(newMatches, replaceAliasesResult);
        R2L.setGlobalMatches(newMatches);
        matches = (0, _functions.mergeMatches)(matches, newMatches);
      }
    }

    $self.html(R2L.replaceHtml(source, matches));
    $self.attr(_index2.settings.parsedAttribute);
    return this;
  };

  $.fn.reverse = $.fn.reverse || [].reverse;

  $.fn.getReferences = function () {
    var inTextMatches = _functions.getReferences.call(this);

    var asArray = [];

    _underscore._.each(inTextMatches, function (_match) {
      asArray.push(_match);
    });

    return asArray;
  };

  $.fn.getFormattedReferences = function (format) {
    format = format || 'identity';
    var formatter = format,
        references = $(this).getReferences();
    ;

    if (_underscore._.isString(format)) {
      formatter = R2L.formatters[format];
    }

    return formatter(references, $(this).html());
  };

  $.fn.setAlternative = function (alternative) {
    R2L.setAlternative.call(null, this, alternative);
  };

  $.fn.removeReference = function () {
    return R2L.removeReference(this);
  };

  $.fn.getR2L = function () {
    return R2L;
  };

  $.fn.setRef2linkMatch = function (ref2link) {
    var isMultiple = 0;
    ref2link.alternatives.sort(_index.orderSorter);

    for (var i = 0; i < ref2link.alternatives.length; i++) {
      isMultiple++;

      if (isMultiple >= 2) {
        break;
      }
    }

    ;
    $(this).data(R2L.settings.dataAttribute, ref2link);

    if (isMultiple >= 2) {
      $(this).addClass('ref2link-multiple');
    }

    return $(this).addClass(_index2.settings.generatedClassName);
  };

  $.fn.getRef2linkMatch = function () {
    var $this = $(this),
        ref2link = $this.data(R2L.settings.dataAttribute) || {};

    if ($.isEmptyObject(ref2link)) {
      ref2link = R2L.getGlobalMatch($this.attr(R2L.dataRef2linkInitialAttribute), $this.attr(R2L.dataRef2linkContextAttribute));
    }

    if ($.isEmptyObject(ref2link)) {
      /** not parsed or no matches */
      return ref2link;
    }

    ref2link.reference = ref2link.hasOwnProperty('match') ? ref2link.match : $this.html();
    return ref2link;
  };

  $.fn.unparseTextRules = function () {
    /** undo all links with their initial full match */
    ($(this).is(".".concat(_index2.settings.generatedClassName)) ? $(this) : $(this).find(".".concat(_index2.settings.generatedClassName))).each(function () {
      var $ref2linkContainer = $(this).parentsUntil(":not(.".concat(_index2.settings.generatedClassName, ")"));

      if (!$ref2linkContainer.length) {
        $ref2linkContainer = $(this);
      }

      var reference = $ref2linkContainer.attr(R2L.settings.dataInitialAttribute);
      $(this).replaceWith(reference);
    });
    clearTextCaches();
    clearTooltips();
  };

  $.fn.parseDeferred = function (rules) {
    if (!Array.isArray(rules) || !rules.length) {
      rules = R2L.getRules();
    }

    var s = new Date().getTime();
    var stack = [];
    R2L.$el = $(this);
    (0, _state.preserveStates)($(this));
    $(this).each(function () {
      var self = this,
          $self = $(self).clone();
      /** do processing on a detached DOM fragment to avoid (re)rendering overhead */

      var p = new Promise(function (resolve, reject) {
        if ($(self).is("[".concat(_index2.settings.parsedAttribute, "]"))) {
          return reject(false);
        }

        var text = $self.html();
        setTimeout(function () {
          if (R2L.worker) {
            $self.parseReferences(rules, true).then(function ($el) {
              textCaches[text] = $self.html();
              $(self).trigger('before-replace.ref2link').html(textCaches[text])
              /** set parsed text to the real node */
              .attr(_index2.settings.parsedAttribute, true).trigger('after-replace.ref2link');
              resolve($(self));
            });
          } else {
            $self.parseReferences(rules);
            textCaches[text] = $self.html();
            $(self).trigger('before-replace.ref2link').html(textCaches[text])
            /** set parsed text to the real node */
            .attr(_index2.settings.parsedAttribute, true).trigger('after-replace.ref2link');
            resolve($(self));
          }
        }, 1);
      });
      stack.push(p);
    });
    stack = stack.map(function (promise) {
      var resolver, rejecter;
      var parser = new Promise(function (resolve, reject) {
        resolver = resolve;
        rejecter = reject;
      });
      return {
        p: promise,
        resolver: resolver,
        rejecter: rejecter,
        parser: parser
      };
    });

    var elements = _toConsumableArray(stack);

    Promise.all(stack.map(function (item) {
      return item.p;
    })).then(function (values) {
      setTimeout(function () {
        /** now that processing has finished reset parsed nodes status */
        $("[".concat(_index2.settings.parsedAttribute, "]")).addClass('ref2link-container').removeAttr(_index2.settings.parsedAttribute);
        (0, _state.restoreStates)($(document));
        $(document).trigger('parsed.ref2link');
        var duration = new Date().getTime() - s;
        console.log('Parsed in ', duration, 'ms');
        $(document).trigger('elapsed.ref2link', {
          elapsed: duration,
          count: $(".".concat(_index2.settings.generatedClassName), R2L.$el).length
        });
        elements.forEach(function (p, index) {
          p.resolver(values[index]);
        });

        if (R2L.options.metadata) {
          setTimeout(function () {
            R2L.loadMetadata(R2L.getFormattedReferences("json").result).then(function (result) {
              console.debug(result);
            });
          }, 0);
        }
      }, 0);
    });
    return stack.map(function (item) {
      return item.parser;
    });
  };
  /**
   * Legacy method used in SOLON
   */


  $.fn.getReferenceInfo = function () {
    var references = _functions.getReferences.call(this);

    var result = [];

    _underscore._.each(references, function (reference) {
      var alternatives = reference.alternatives.filter(function (alt) {
        return alt.viewName !== 'table';
      });
      var defaultView = alternatives.length ? alternatives[0] : null;

      if (!defaultView || !reference.rule) {
        return;
      }

      result.push({
        pattern: reference.rule.pattern,
        rulecasesensitive: reference.rule.casesensitive,
        type: reference.rule.baseType || reference.rule.type,
        rulelibelle: reference.rule.baseLibelle || reference.rule.rulelibelle,
        target: defaultView.viewName,
        viewlibelle: $(defaultView.view).attr('title'),
        matchedcontent: reference.match,
        uri: reference.match,
        url: $(defaultView.view).attr('href')
      });
    });

    return result;
  };
  /**
   * Expose function to directly replace a string
   * @param {string} html
   * @param {Object} $matches
   * 
   * @return string - final content with links
   */


  R2L.replaceHtml = function (html, matches) {
    var temp = replaceHtmlNodes(html, matches);
    return unExtractRaw(temp);
  };

  $.fn.parseTextRules = $.fn.parseDeferred;
}
/**
 * First step of replacement. Will replace the initial content with <ref2link oid="$id"></ref2link> nodes 
 * 
 * @param {string} html 
 * @param {Object} matches
 * 
 * @return string - content with <ref2link></ref2link> nodes 
 */


function replaceHtmlNodes(html, matches) {
  var keys = Object.keys(matches);
  keys.sort(function (left, right) {
    return right.length - left.length;
  });
  var allOffsets = (0, _list.getOffsetMap)(Object.values(matches));
  /** replace keys in descending order */

  var offsetKeys = Object.keys(allOffsets);
  offsetKeys.sort(function (a, b) {
    return a.length < b.length ? 1 : -1;
  });

  for (var oIndex = 0; oIndex < offsetKeys.length; oIndex++) {
    var offset = allOffsets[offsetKeys[oIndex]];
    var replacement = offsetKeys[oIndex];
    /** replace inside list in descending order **/

    offset.sort(function (a, b) {
      return a.match.length > b.match.length ? -1 : 1;
    });
    var allowAttribute = true;

    for (var k = 0; k < offset.length; k++) {
      if (offset[k].alternatives.length > 0) {
        var view = "";

        for (var l = 0; l < offset[k].alternatives.length; l++) {
          var _alternative = offset[k].alternatives[l];

          if (_alternative.view && _alternative.viewName !== "table") {
            view = _alternative.view;
            break;
          }
        }

        ;

        if (!view) {
          continue;
        }

        var $view = $('<div>' + view + '</div>');
        extract($view, R2L.settings["class"], false);
        var viewHtml = $view.html();
        var search = offset[k].match;
        offset[k].alternatives.forEach(function (alt) {
          if (alt.rule && alt.rule.allowAttribute === false) {
            allowAttribute = false;
          }
        });

        if (search.length > 0) {
          replacement = (0, _functions.replaceBoundariedWords)((0, _functions.regExpEscape)(search), viewHtml, replacement, allowAttribute);
        }
      }
    }
    /** replace all */


    var toReplace = (0, _functions.regExpEscape)(offsetKeys[oIndex]);
    html = (0, _functions.replaceBoundariedWords)(toReplace, replacement, html, allowAttribute);
  }

  ;

  for (var index = 0; index < allOffsets.length; index++) {
    var _view = "";

    for (var l = 0; l < allOffsets[index].alternatives.length; l++) {
      var _alternative = allOffsets[index].alternatives[l];

      if (_alternative.view) {
        _view = _alternative.view;
        break;
      }
    }

    ;

    if (!_view) {
      continue;
    }

    var $view = $('<div>' + _view + '</div>');
    extract($view, R2L.settings["class"], false);
  }

  return html;
}

},{"../settings/index":8,"../transformers/alias":9,"../utils/functions":12,"../utils/list":14,"../utils/shared":16,"../utils/state":17,"../utils/underscore":18,"../ux/index":19}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Publication = void 0;

var _index = require("../settings/index");

var _ = require("..");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Publication office data wrapper
 */
var Publication = {
  _metadata: {},
  hasData: Boolean,
  getEndpoint: function getEndpoint(params) {
    return _index.settings.constants.R2L_PUBLICATIONS_ENDPOINT;
  },
  getFinlexEndpoint: function getFinlexEndpoint() {
    return _index.settings.constants.R2L_FINLEX_ENDPOINT;
  },
  getMetadataById: function getMetadataById(id) {
    return this._metadata[id];
  },

  /**
   * Get metadata by a list of ids 
   * @param {string[]} ids 
   */
  getMetadata: function getMetadata(ids) {
    var _this = this;

    if (Array.isArray(ids)) {
      var data = {};
      ids.forEach(function (id) {
        if (_this._metadata[id]) {
          data[id] = _this._metadata[id];
        }
      });
      return data;
    } else {
      return this._metadata;
    }
  },
  setMetadata: function setMetadata(metadata) {
    this._metadata = _objectSpread({}, this._metadata, {}, metadata);
  },
  clearCache: function clearCache() {
    this._metadata = {};
    this.hasData = false;
  },

  /**
   * NOT IN USE
   * 
   * Query by eli ids
   * @param string[] eliIds 
   * @param string langISO3 
   * 
   * @return string
   */
  getEliQuery: function getEliQuery(eliIds, langISO3) {
    // unique ids only
    eliIds = eliIds.filter(function (v, i, a) {
      return a.indexOf(v) === i;
    });
    var filters = "FILTER (";

    for (var i = 0; i < eliIds.length; i++) {
      filters += "regex(str(?eli), \"".concat(eliIds[i], "\")");

      if (i < eliIds.length - 1) {
        filters += " || ";
      }
    }

    filters += ")";
    var query = "\n            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n            PREFIX cdm:<http://publications.europa.eu/ontology/cdm#>\n            PREFIX skos:<http://www.w3.org/2004/02/skos/core#>\n            PREFIX dc:<http://purl.org/dc/elements/1.1/>\n            PREFIX lang:<http://publications.europa.eu/resource/authority/language/>\n            PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>\n            PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n            PREFIX owl:<http://www.w3.org/2002/07/owl#>\n\n            SELECT DISTINCT ?date ?workId as ?id ?title_ as ?title ?force WHERE {  \n                graph ?ge { \n                    ?exp cdm:expression_belongs_to_work ?s .\n                    ?exp cdm:expression_title ?title_\n                }\n                graph ?g { \n                    ?exp cdm:expression_uses_language ?lang\n                    filter(?lang=lang:".concat(langISO3, ").  \n                }  \n\n                ?s cdm:work_date_document ?date .\n                ?s rdf:type ?type .\n                ?s cdm:work_id_document ?workId.\n                ?s owl:sameAs ?eli .\n\n                ").concat(filters, "\n                OPTIONAL {\n                    ?s cdm:resource_legal_in-force ?force \n                }\n            }\n        ");
    return query;
  },

  /**
   * Query by eli ids
   * @param string[] eliIds 
   * @param string langISO3 
   * 
   * @return string
   */
  getFinlexEliQuery: function getFinlexEliQuery(eliIds, langISO3) {
    // unique ids only
    eliIds = eliIds.filter(function (v, i, a) {
      return a.indexOf(v) === i;
    });
    var filters = "FILTER (";

    for (var i = 0; i < eliIds.length; i++) {
      filters += "?eli = <".concat(eliIds[i], ">");

      if (i < eliIds.length - 1) {
        filters += " || ";
      }
    }

    filters += ")";
    var query = "\n        prefix xsd: <http://www.w3.org/2001/XMLSchema#>\n        prefix dct: <http://purl.org/dc/terms/>\n        prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n        prefix owl: <http://www.w3.org/2002/07/owl#>\n        prefix skos: <http://www.w3.org/2004/02/skos/core#>\n        prefix foaf: <http://xmlns.com/foaf/0.1/>\n        prefix eli: <http://data.europa.eu/eli/ontology#>\n        \n        SELECT distinct ?title ?date ?publicationDate ?id {\n            \n            ?eli eli:date_document ?date .\n            ?eli eli:date_publication ?publicationDate .\n            ?eli eli:is_realized_by ?eliFin .\n            ?eliFin eli:language <http://publications.europa.eu/resource/authority/language/FIN> .\n            ?eliFin eli:title ?t .\n            BIND (?eli as ?id) .\n            BIND (CONCAT(STR(?t), \n                CONCAT(\n                    CONCAT(\"\\n\\nPublication date: \", STR(?publicationDate) ), \n                    CONCAT(\"\\nDocument date: \", STR(?date) ) \n                )\n            ) as ?title)\n            ".concat(filters, "\n        }\n       ");
    return query;
  },

  /**
   * Query by CELEX ids
   * @param string[] celexIds 
   * @param string langISO3 
   * 
   * @return string
   */
  getCelexQuery: function getCelexQuery(celexIds, langISO3) {
    // unique ids only
    celexIds = celexIds.filter(function (v, i, a) {
      return a.indexOf(v) === i;
    });
    var filters = "FILTER (";

    for (var i = 0; i < celexIds.length; i++) {
      filters += _.R2L.options.strictSparql ? "STR(?workId)=\"celex:".concat(celexIds[i], "\"") : "?workId=\"celex:".concat(celexIds[i], "\"^^xsd:string");

      if (i < celexIds.length - 1) {
        filters += " || ";
      }
    }

    filters += ")";
    var query = "\n            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n            PREFIX cdm:<http://publications.europa.eu/ontology/cdm#>\n            PREFIX skos:<http://www.w3.org/2004/02/skos/core#>\n            PREFIX dc:<http://purl.org/dc/elements/1.1/>\n            PREFIX lang:<http://publications.europa.eu/resource/authority/language/>\n            PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>\n            PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n            PREFIX owl:<http://www.w3.org/2002/07/owl#>\n\n            SELECT DISTINCT ?date ?workId as ?id ?title_ as ?title ?force WHERE {  \n                graph ?ge { \n                    ?exp cdm:expression_belongs_to_work ?s .\n                    ?exp cdm:expression_title ?title_\n                }\n                graph ?g { \n                    ?exp cdm:expression_uses_language ?lang\n                    filter(?lang=lang:".concat(langISO3, ").  \n                }  \n\n                ?s cdm:work_date_document ?date .\n                ?s rdf:type ?type .\n                ?s cdm:work_id_document ?workId.\n\n                ").concat(filters, "\n                OPTIONAL {\n                    ?s cdm:resource_legal_in-force ?force \n                }\n            }\n        ");
    return query;
  },

  /**
   * ECLI ids query
   * @param string[] ecliIds 
   * @param string langISO3 
   * 
   * @return string
   */
  getEcliQuery: function getEcliQuery(ecliIds, langISO3) {
    ecliIds = ecliIds.filter(function (v, i, a) {
      return a.indexOf(v) === i;
    });
    var filters = "FILTER (";

    for (var i = 0; i < ecliIds.length; i++) {
      filters += _.R2L.options.strictSparql ? "STR(?ecli)=\"".concat(ecliIds[i], "\"") : "?ecli=\"".concat(ecliIds[i], "\"^^xsd:string");

      if (i < ecliIds.length - 1) {
        filters += " || ";
      }
    }

    filters += ")";
    var query = "\n            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n            PREFIX cdm:<http://publications.europa.eu/ontology/cdm#>\n            PREFIX skos:<http://www.w3.org/2004/02/skos/core#>\n            PREFIX dc:<http://purl.org/dc/elements/1.1/>\n            PREFIX lang:<http://publications.europa.eu/resource/authority/language/>\n            PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>\n            PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n            PREFIX owl:<http://www.w3.org/2002/07/owl#>\n\n            SELECT DISTINCT ?date ?ecli as ?id ?title_ as ?title ?force WHERE {   \n                graph ?ge { \n                    ?exp cdm:expression_belongs_to_work ?s .\n                    ?exp cdm:expression_title ?title_\n               }\n               graph ?g { \n                    ?exp cdm:expression_uses_language ?lang\n                    filter(?lang=lang:".concat(langISO3, ").  \n               }       \n            \n               ?s cdm:case-law_ecli ?ecli .\n               ?s cdm:work_date_document ?date .\n               ?s cdm:work_id_document ?workId.\n               ").concat(filters, "\n               \n               OPTIONAL {\n                   ?s cdm:resource_legal_in-force ?force .\n               }\n            }\n        ");
    return query;
  },
  getCelexData: function getCelexData(celexIds, format) {
    var _this2 = this;

    var query = this.getCelexQuery(celexIds, _.R2L.getConstant("R2L_DEFAULT_LANG_ISO3") || _.R2L.getLanguage() || "ENG");
    format = format || 'application/json';
    return new Promise(function (resolve, reject) {
      $.post(_this2.getEndpoint(), {
        query: query,
        format: format,
        origin: '*'
      }).then(function (response) {
        resolve(response);
      }).fail(function (error) {
        reject(error);
      });
    });
  },
  getEcliData: function getEcliData(ecliIds, format) {
    var _this3 = this;

    var query = this.getEcliQuery(ecliIds, _.R2L.getConstant("R2L_DEFAULT_LANG_ISO3") || _.R2L.getLanguage() || "ENG");
    format = format || 'application/json';
    return new Promise(function (resolve, reject) {
      $.post(_this3.getEndpoint(), {
        query: query,
        format: format,
        origin: '*'
      }).then(function (response) {
        resolve(response);
      }).fail(function (error) {
        reject(error);
      });
    });
  },
  getFinlexEliData: function getFinlexEliData(eliIds, format) {
    var _this4 = this;

    var query = this.getFinlexEliQuery(eliIds, _.R2L.getConstant("R2L_DEFAULT_LANG_ISO3") || _.R2L.getLanguage() || "ENG");
    format = format || 'application/json';
    return new Promise(function (resolve, reject) {
      $.post(_this4.getFinlexEndpoint(), {
        query: query,
        format: format,
        origin: '*'
      }).then(function (response) {
        resolve(response);
      }).fail(function (error) {
        reject(error);
      });
    });
  },
  getEliData: function getEliData(eliIds, format) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      $.get(_this5.getEndpoint(), {
        ids: eliIds.filter(function (v, i, a) {
          return a.indexOf(v) === i;
        })
      }).then(function (response) {
        resolve(response);
      }).fail(function (error) {
        reject(error);
      });
    });
  }
};
exports.Publication = Publication;

},{"..":4,"../settings/index":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearRuntimeRules = clearRuntimeRules;
exports.clearRef2LinkRules = clearRef2LinkRules;
exports.bindRules = bindRules;

var _underscore = require("../utils/underscore");

var _letters = require("../utils/letters");

var _base = require("../utils/base64");

var _index = require("../ux/index");

var _converters = require("../utils/converters");

var _list = require("../utils/list");

var _functions = require("../utils/functions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref2linkRules = [];
var _runtimeRules = [];
var _namedPatterns = {};

function clearRuntimeRules() {
  _runtimeRules = [];
}

function clearRef2LinkRules() {
  _ref2linkRules = [];
}

function bindRules(R2L) {
  var rK, rV;

  try {
    rK = JSON.parse(R2L.getConstant("R2L_RULE_MAP"));
    rV = JSON.parse(R2L.getConstant("R2L_VIEW_MAP"));
  } catch (e) {
    rK = {};
    rV = {};
    console.error(e);
  }

  R2L.compileGlobalRule = function (rules) {
    var patterns = [];
    var offset = 0;

    _underscore._.each(rules, function (_rule) {
      if (_rule.hasOwnProperty('views') && _rule.views && _rule.views.hasOwnProperty('length') && _rule.views.length) {
        offset += parseInt(_rule.slots);
        var p = '' + (_rule.fullPattern.source || _rule.fullPattern);
        var nonCapturing = R2L.getNonCapturingPattern(p);
        nonCapturing = nonCapturing.replace('{$i}', offset);
        patterns.push('(' + nonCapturing + ')');
      }
    });

    var joinedPattern = '(?:' + patterns.join('|') + ')';
    var letterPattern = "[/0-9" + _letters.letters.latin + _letters.letters.cyrillic + _letters.letters.greek + _letters.letters.specialChars + "]";
    var lookahead = (0, _functions.getLookAhead)(letterPattern);
    var lookbehind = (0, _functions.getLookBehind)(letterPattern);
    return {
      'pattern': new RegExp('(?![\r\n\v\f])' + lookbehind + joinedPattern + lookahead, 'ig'),
      'rules': rules
    };
  };

  R2L.addRules = function (rules) {
    var hasNegativeLookbehind = (0, _functions.supportNegativeLookbehind)();
    console.debug("Negative lookbehind support", hasNegativeLookbehind);
    _runtimeRules = [];

    _underscore._.each(rules, function (_rule) {
      if (!hasNegativeLookbehind) {
        var r = new RegExp("\\(\\?<!((?!\\)).)+\\)", "g"); //replace pattern

        _rule.p = _rule.p.replace(r, "");

        if (_rule.ip) {
          //replace item pattern
          _rule.ip = _rule.ip.replace(r, "");
        }
      }

      R2L.addRule(_rule);
    });
  };

  R2L.reloadRules = function () {
    _ref2linkRules = [];
    this.addRules(JSON.parse(_base.Base64.decode(R2L.getConstant("R2L_TYPED_RULES"))));
  };

  R2L.addRule = function (ruleSpecs) {
    var rule = R2L.compileRule(ruleSpecs);

    if (!rule) {
      return;
    }

    rule.allowTitle = !!rule.allowTitle && R2L.options.enableSpecialRules;

    _ref2linkRules.push(rule);

    R2L.globalMatches = {}; // at least one rule changed; reset all matches
  };

  R2L.addNamedPatterns = function (rawNamedPatterns) {
    _underscore._.each(rawNamedPatterns, function (_rawPattern) {
      R2L.addNamedPattern(_rawPattern);
    });
  };

  R2L.getNamedPatterns = function () {
    return _namedPatterns;
  };

  R2L.addNamedPattern = function (namedPattern) {
    var namedRule = R2L.compileRule(namedPattern);
    var name = namedRule.name || namedRule.rulelibelle;
    _namedPatterns[name] = namedRule;

    if (namedRule.hasOwnProperty('type') && namedRule.type) {
      R2L.addRule(namedRule);
    }
  };

  R2L.getNamedRule = function (name) {
    if (_namedPatterns.hasOwnProperty(name)) {
      return _namedPatterns[name];
    }

    var namedRule;

    _underscore._.each(_ref2linkRules, function (rule, i) {
      if (rule.name === name) {
        namedRule = rule;
        return false;
      }
    });

    if (namedRule) {
      return namedRule;
    }

    return null;
  };

  R2L.getRules = function (filters) {
    if (!_runtimeRules.length) {
      _runtimeRules = R2L.getFilteredRules(filters || R2L.filters, true);
    }

    return _runtimeRules;
  };

  R2L.getAllRules = function () {
    return _ref2linkRules;
  };

  R2L.getConverterRules = function () {
    var rules = [];

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      if (_ref2linkRule.converter) {
        rules.push(_ref2linkRule);
      }
    });

    return rules;
  };

  R2L.getFilteredRules = function (filters, includePublic) {
    var _this = this;

    var rules = [];

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      if (!_this.options.enableSpecialRules && _ref2linkRule.forced) {
        return;
      }

      if (_ref2linkRule.converter) {
        return;
      }
      /** filter rules */


      if (!filters.hasOwnProperty('types') || !filters.types || !filters.types.length || filters.types.indexOf(_ref2linkRule.type) >= 0) {
        var rule = Object.assign({}, _ref2linkRule),
            views = [],
            foundView = false;
        rule.views = views;

        _underscore._.each(_ref2linkRule.views || {}, function (_view) {
          /** if filters types is false then include it if has the right env */
          var isPublic = includePublic && _view.environments.indexOf('*') >= 0,
              hasEnv = isPublic || !!_underscore._.intersect(filters.environments, _view.environments).length,
              hasTarget = !filters.hasOwnProperty('targets') || !filters.targets || !filters.targets.length || filters.targets.indexOf(_view.target) >= 0,
              isTargetAllowed = hasEnv && filters.types === false;

          if ((hasEnv || isPublic) && (hasTarget || isTargetAllowed)) {
            views.push(Object.assign({}, _view));
            foundView = true;
          }
        });

        if (foundView) {
          views.sort(_index.orderSorter);
          rules.push(rule);
        }
      }
    });

    rules.sort(_index.orderSorter);
    return rules;
  };

  R2L.getGlobalTypes = function () {
    var types = {};

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      if (!_ref2linkRule.type) {
        return;
      }

      types[_ref2linkRule.type] = _ref2linkRule.rulelibelle || _ref2linkRule.name;
    });

    return types;
  };

  R2L.getGlobalTargets = function () {
    var targets = {};

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      _underscore._.each(_ref2linkRule.views, function (_view) {
        targets[_view.target] = _view.target;
      });
    });

    return targets;
  };

  R2L.getGlobalTypeTargets = function () {
    var data = {};

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      if (!_ref2linkRule.type) {
        return;
      }

      var type = _ref2linkRule.type;
      var label = _ref2linkRule.rulelibelle || _ref2linkRule.name;
      data[type] = [];

      _underscore._.each(_ref2linkRule.views, function (_view) {
        data[type].push({
          target: _view.target,
          label: label
        });
      });
    });

    return data;
  };

  R2L.getBaseTypeTargets = function () {
    var data = {};

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      if (!_ref2linkRule.type) {
        return;
      }

      var baseType = _ref2linkRule.baseType || _ref2linkRule.type;
      var label = _ref2linkRule.baseLibelle || _ref2linkRule.rulelibelle || _ref2linkRule.name;
      data[baseType] = data[baseType] || {
        targets: [],
        types: [],
        label: label
      };
      data[baseType].types.push(_ref2linkRule.type);

      _underscore._.each(_ref2linkRule.views, function (_view) {
        data[baseType].targets.push({
          target: _view.target,
          baseTarget: _view.baseTarget,
          baseLabel: label,
          label: _ref2linkRule.rulelibelle || _ref2linkRule.name
        });
      });
    });

    return data;
  };

  R2L.getFiltersWithDependencies = function () {
    var byEnv = {};
    var byRule = {};

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      var rule = _ref2linkRule;

      if (!byRule.hasOwnProperty(rule.type)) {
        byRule[rule.type] = [];
      }

      _underscore._.each(_ref2linkRule.views, function (_view) {
        var view = _view;

        _underscore._.each(_view.environments, function (_env) {
          if (!byEnv.hasOwnProperty(_env)) {
            byEnv[_env] = {
              types: [],
              targets: []
            };
          }

          if (byEnv[_env].types.indexOf(rule.type) < 0) {
            byEnv[_env].types.push(rule.type);
          }

          if (byEnv[_env].targets.indexOf(view.target) < 0) {
            byEnv[_env].targets.push(view.target);
          }
        });

        byRule[rule.type].push(view.target);
      });
    });

    return {
      byEnvironment: byEnv,
      byRule: byRule
    };
  };

  R2L.getGlobalEnvironments = function () {
    var envs = {};

    _underscore._.each(_ref2linkRules, function (_ref2linkRule) {
      _underscore._.each(_ref2linkRule.views, function (_view) {
        _underscore._.each(_view.environments, function (_env) {
          envs[_env] = _env;
        });
      });
    });

    envs['*'] = 'Public';
    return envs;
  };

  R2L.compileGuards = function (rules) {
    var map = {};

    for (var i = 0; i < rules.length; i++) {
      if (rules[i]["guard-pattern"]) {
        if (!map[rules[i]["guard-pattern"]]) {
          map[rules[i]["guard-pattern"]] = {
            ruleTypes: [],
            found: false
          };
        }

        map[rules[i]["guard-pattern"]].ruleTypes.push(rules[i].type);
      }
    }

    return map;
  };
  /**
   * Optimize rules by droppping useles patterns according to guards
   * @param string text
   * @param Object[] rules
   */


  R2L.runGuards = function (text, rules) {
    var p1 = performance.now();
    var letterPattern = "[0-9" + _letters.letters.latin + _letters.letters.cyrillic + _letters.letters.greek + _letters.letters.specialChars + "]";
    var lookahead = (0, _functions.getLookAhead)(letterPattern);
    var guards = this.compileGuards(rules);

    for (var pattern in guards) {
      var reg = new RegExp(pattern + lookahead, "i");

      if (!reg.test(text)) {
        rules = rules.filter(function (rule) {
          return guards[pattern].ruleTypes.indexOf(rule.type) === -1;
        });
      }
    }

    var p2 = performance.now();
    console.debug("Guard check done in (ms): ", p2 - p1);
    return rules;
  };

  R2L.lintRule = function (rule) {
    var result = {
      warnings: [],
      errors: []
    };

    try {
      rule.pattern = new RegExp(rule.pattern, "gm" + (rule.casesensitive ? '' : 'i'));

      if (rule.hasOwnProperty('fullPattern') && rule.fullPattern) {
        rule.fullPattern = new RegExp(rule.fullPattern, 'gm' + (rule.casesensitive ? '' : 'i'));
      }
    } catch (e) {
      if (('' + e).toLowerCase().indexOf('invalid escape') >= 0) {
        result.warnings.push('' + e);
      } else {
        result.errors.push('' + e);
      }
    }

    return result;
  };

  R2L.compileRule = function (rule, noUnpacking) {
    rule.allowTitle = rule.allowTitle && R2L.options.enableSpecialRules !== false;
    var unpack = noUnpacking ? false : true;

    if (unpack) {
      var unpackedRule = {};

      _underscore._.each(rK, function (sourceKey, destKey) {
        unpackedRule[destKey] = rule[sourceKey];
      });

      if (unpackedRule.hasOwnProperty('views') && _underscore._.isArray(unpackedRule.views)) {
        var unpackedViews = [],
            unpackedView;

        _underscore._.each(unpackedRule['views'], function (_view) {
          var view = _view;
          unpackedView = {};

          _underscore._.each(rV, function (sourceKey, destKey) {
            unpackedView[destKey] = view[sourceKey];
          });

          unpackedViews.push(unpackedView);
        });

        unpackedRule['views'] = unpackedViews;
      }

      rule = unpackedRule;
    }

    var linterResult = R2L.lintRule(rule);
    rule.errors = linterResult.errors;
    rule.warnings = linterResult.warnings;

    var fullPatternCompiler = function fullPatternCompiler(rule) {
      if (rule.hasOwnProperty('type') && rule.type) {
        rule.allowTitle = !!rule.allowTitle && R2L.options.enableSpecialRules;
        var forced = rule.hasOwnProperty('forced') && rule.forced ? '' : '?';
        var typePattern = '(' + (rule.forced && !R2L.options.enableSpecialRules ? '1jf9jqgk' : (0, _functions.regExpEscape)(rule.type)) + ')';
        var simplifiedPattern = (0, _functions.getNonCapturingPattern)(rule.pattern.source || rule.pattern);
        var titlePattern = '[^\\]]+?';
        var beginning = rule.allowTitle ? '\\[' + forced : '';
        var ending = rule.allowTitle ? '\\]' + forced : '';
        /**
         * $1 - type, $2 - match, $3 - title, $4 - match
         */

        var expr = '(?:' + typePattern + forced + '(?:' + '(?:' + '\\[' + '(' + (rule.allowTitle ? simplifiedPattern : 'm2CVjK') + ')' + '\\s?\\|\\s?' + '(' + titlePattern + ')' + '\\s?\\]' + ')' + '|' + '(?:' + beginning + '(' + simplifiedPattern + ')' + ending + ')' + ')' + ')';

        try {
          return new RegExp(expr, 'gi');
        } catch (e) {
          console.error(rule.type, e);
          return null;
        }
      }

      return rule.pattern;
    };

    rule.fullPattern = fullPatternCompiler(rule);

    if (!rule.fullPattern) {
      return null;
    }

    rule.matches = function (text) {
      return rule.pattern.test(text);
    };

    if (rule["item-pattern"]) {
      rule.itemRule = R2L.compileRule({
        name: rule.name + '-item',
        pattern: rule["item-pattern"],
        skipPattern: rule["skip-pattern"],
        trimPattern: rule["trim-pattern"],
        fullPattern: fullPatternCompiler({
          force: rule.itemForced,
          pattern: rule['item-pattern']
        }),
        type: rule['itemType'],
        baseType: rule["baseType"],
        baseLibelle: rule["baseLibelle"],
        forced: rule['itemForced'],
        rulelibelle: rule["rulelibelle"] + ' item',
        prefix: rule["prefix"],
        skip: rule["skip"],
        vars: rule["vars"],
        identifiers: rule["identifiers"],
        coreIdentifiers: rule["coreIdentifiers"],
        shared: rule["shared"],
        views: rule.views,
        isListItem: true
      }, true);
    }

    if (rule.hasOwnProperty('views') && _underscore._.isArray(rule.views)) {
      rule.views.sort(_index.orderSorter);

      _underscore._.each(rule.views, function (_view) {
        // use R2L.converters.* to prefix functions
        var converterNames = Object.keys(_converters.converters).sort(function (a, b) {
          return a.length > b.length ? -1 : 1;
        });

        if (_view.template !== "function(){return '{{ $match }}';}") {
          if (typeof _view.template === 'string') {
            converterNames.forEach(function (converterName) {
              _view.template = _view.template.replace(new RegExp(converterName + '\\(', 'g'), 'R2L.converters.' + converterName + '(');
            });
          }

          eval(' _view.template = function(){ return (' + _view.template + ').apply(_view, arguments);}');
        } else {
          _view.template = function () {
            return arguments;
          };
        }

        if (_view.hasOwnProperty('condition')) {
          if (typeof _view.condition === 'string') {
            converterNames.forEach(function (converterName) {
              _view.condition = _view.condition.replace(new RegExp(converterName + '\\(', 'g'), 'R2L.converters.' + converterName + '(');
            });
          }

          eval('_view.condition = function(){ return (' + (_view.condition ? _view.condition : 'function(){return true;}') + ').apply(_view, arguments);}');
        } else {
          _view.condition = function () {
            return true;
          };
        }
      });
    }

    rule.compiled = true;
    return rule;
  };

  R2L.applyRule = function (text, rule, overrideTitle, wholeMatch, history, overrideMatches) {
    var rawReference = text.trim();
    var $ = this.getJquery();
    wholeMatch = wholeMatch.trim();
    var p = rule.pattern.source;

    if (rule.forced) {
      p = '(?:' + rule.type + '\\s*\\[\\s*(?:' + p + '(?:\\s*\\|\\s*(?:[^\\]]+))?' + ')\\s*\\])';
    }

    var pattern = new RegExp(p, 'gm' + (rule.casesensitive ? '' : 'i')),
        args = overrideMatches ? overrideMatches : pattern.exec(rawReference),
        ref2link = {
      rule: rule,
      match: rawReference,
      views: {},
      alternatives: [],
      matches: [],
      offsets: [],
      counter: 0,
      reference: text,
      link: overrideTitle || text,
      wholeMatch: wholeMatch || text
    };

    if (!args) {
      return null;
    }

    ref2link.reference = args[1];
    ref2link.matches = args;

    if (history.length > 0) {
      for (var index = history.length - 1; index >= 0; index--) {
        var listRef = (0, _list.getListCore)(history[index].rule, history[index].matches);

        if (listRef.length > 0) {
          (0, _list.cloneListCore)(history[index], ref2link);
          (0, _list.cloneListIdentifiers)(history[index], ref2link);
          break;
        }
      }

      args = ref2link.matches;
    }
    /** Could be an inverted list so if the item still has no prefix/data don't bother */


    if (rule.isListItem) {
      var listRef = (0, _list.getListCore)(rule, ref2link.matches);

      if (listRef.length === 0) {
        /** Cannot render item, we need to get to the end of the list */
        return ref2link;
      }
    }

    rule.views.sort(_index.orderSorter);

    _underscore._.each(rule.views, function (_view) {
      var viewName = _view.target;
      var isEnabled = (_underscore._.intersect(R2L.filters.environments, _view.environments).length || _view.environments.indexOf('*') >= 0) && (!R2L.filters.targets || !R2L.filters.targets.length || R2L.filters.targets.indexOf(_view.target) >= 0) && (!R2L.filters.types || !R2L.filters.types.length || R2L.filters.types.indexOf(rule.type) >= 0);

      if (isEnabled && _view.condition.apply(_view, args)) {
        ref2link.views[viewName] = _view.template.apply(_view, args);
        /**                
         * keep a map of initial match and what was rendered
         * han and curiaj rule render something different than it matches
         */

        var $rendered = $('<div></div>').append(ref2link.views[viewName]),
            renderedText;
        $rendered.find(R2L.settings.classSimple).each(function () {
          var $view = $(this);
          $view.addClass(R2L.settings.generatedClassName);
          R2L.linkClassName && $view.addClass(R2L.linkClassName);

          if (R2L.viewUsesTarget) {
            ($view.is(R2L.settings.classSimple) ? $view : $view.find(R2L.settings.classSimple)).attr('target', '_blank');
          } else {
            ($view.is(R2L.settings.classSimple) ? $view : $view.find(R2L.settings.classSimple)).removeAttr('target');
          }

          if ((R2L.viewTitlePrefix || R2L.viewTitleSuffix) && $view.attr('title')) {
            var titleParts = [(R2L.viewTitlePrefix || '').toString(), $view.attr('title').toString(), (R2L.viewTitleSuffix || '').toString()];
            $view.attr('title', titleParts.join(' ').trim());
          }

          if (overrideTitle) {
            ($view.is(R2L.settings.classSimple) ? $view : $view.find(R2L.settings.classSimple)).html(overrideTitle);
          }

          $view.attr(R2L.settings.dataInitialAttribute, wholeMatch);
        });
        ref2link.views[viewName] = $rendered.html();
        ref2link.alternatives.push({
          rule: _objectSpread({}, rule, {}, {
            pattern: null,
            fullPattern: null
          }),
          view: ref2link.views[viewName],
          viewName: viewName,
          match: text,
          order: _view.order,
          reference: args[1],
          link: overrideTitle || text,
          wholeMatch: wholeMatch || text
        });
        renderedText = overrideTitle || $rendered.find('[href]').text();
        R2L.globalViews[renderedText] = wholeMatch || text;
      }
    });

    return ref2link;
  };

  R2L.getGlobalMatch = function (match, context) {
    return this.globalMatches[context] && this.globalMatches[context][match] ? this.globalMatches[context][match] : {};
  };

  R2L.setGlobalMatches = function (matches) {
    var _this2 = this;

    Object.keys(matches).forEach(function (_match) {
      var offsets = matches[_match] ? matches[_match].offsets : [];

      for (var i = 0; i < offsets.length; i++) {
        var offset = offsets[i];

        if (!_this2.globalMatches[offset.context]) {
          _this2.globalMatches[offset.context] = {};
        }
        /** Deep clone the match **/


        var newMatch = {
          alternatives: offset.alternatives,
          views: offset.views,
          context: offset.context,
          rule: _objectSpread({}, matches[_match].rule, {}, {
            pattern: null,
            fullPattern: null
          }),
          //without patterns
          match: matches[_match].match,
          offsets: matches[_match].offsets,
          reference: matches[_match].reference
        };
        _this2.globalMatches[offset.context][offset.match] = newMatch;
      }
    });
  };

  try {
    R2L.addNamedPatterns(JSON.parse(_base.Base64.decode(R2L.getConstant("R2L_NAMED_PATTERNS"))));
  } catch (e) {
    console.error(e);
  }

  try {
    R2L.addRules(JSON.parse(_base.Base64.decode(R2L.getConstant("R2L_TYPED_RULES"))));
  } catch (e) {
    console.error(e);
  }
}

},{"../utils/base64":10,"../utils/converters":11,"../utils/functions":12,"../utils/letters":13,"../utils/list":14,"../utils/underscore":18,"../ux/index":19}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewOptions = exports.editOptions = exports.settings = void 0;

/**
 * Variables to be injected
 */
var settings = {
  constants: {
    'R2L_RULE_MAP': '{"views":"v","shared":"ls","prefix":"lp","rulelibelle":"r","order":"o","vars":"lv","allowAttribute":"aa","trim-pattern":"tp","forced":"f","coreIdentifiers":"cli","skip-pattern":"sp","subtype":"st","itemForced":"g","type":"t","baseLibelle":"bl","skip":"lk","pattern":"p","name":"n","item-pattern":"ip","allowTitle":"at","customTitle":"ct","guard-pattern":"gp","identifiers":"li","slots":"sl","baseType":"bt","casesensitive":"c","converter":"cv","itemType":"y"}',
    'R2L_VIEW_MAP': '{"condition":"x","baseTarget":"ba","target":"a","_default":"_","template":"m","order":"d","environments":"e","libelle":"l"}',
    'R2L_VERSION': '1.2.00',
    'R2L_CSS_MAP': '{"ref2link.css":"LnJlZjJsaW5rLXRvb2x0aXAgew0KCXBvc2l0aW9uOiBhYnNvbHV0ZTsNCglkaXNwbGF5OiBibG9jazsNCiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlOw0KCXZpc2liaWxpdHk6IHZpc2libGU7DQoJcGFkZGluZzogMnB4Ow0KCWNvbG9yOiAjMzMzOw0KCWZvbnQtc2l6ZTogMS4xcmVtOw0KCWN1cnNvcjogZGVmYXVsdDsNCglvdmVyZmxvdzogaGlkZGVuOw0KCW1pbi13aWR0aDogMTZyZW07DQoJLXdlYmtpdC1ib3gtc2hhZG93OiAxMHB4IDEwcHggNXB4IC01cHggcmdiYSgyOCwgMjgsIDI4LCAwLjUpOw0KCS1tb3otYm94LXNoYWRvdzogMTBweCAxMHB4IDVweCAtNXB4IHJnYmEoMjgsIDI4LCAyOCwgMC41KTsNCglib3gtc2hhZG93OiAxMHB4IDEwcHggNXB4IC01cHggcmdiYSgyOCwgMjgsIDI4LCAwLjUpOw0KfQ0KDQoucmVmMmxpbmstdG9vbHRpcCAudGFibGUgew0KICAgIG1hcmdpbi1ib3R0b206IDBweDsNCiAgICBmb250LXNpemU6IDEycHg7DQogICAgd2lkdGg6IDEwMCU7DQogICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgDQp9DQoNCi5yZWYybGluay10b29sdGlwIC5hY3RpdmUgdGQgew0KCWJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7DQp9DQoNCi5yZWYybGluay10b29sdGlwIC50YWJsZSAucm93IHsNCglib3JkZXItYm90dG9tOiAxcHggc29saWQgI0NGQ0ZDRjsNCgltYXJnaW46IDAgMCA0cHggMDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi5yZWYybGluay10b29sdGlwIC50YWJsZSAucm93OjpiZWZvcmUgew0KICAgIGNvbnRlbnQ6IG5vbmUgIWltcG9ydGFudDsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLnRhYmxlIC5yb3c+KiB7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLnRhYmxlIC5yb3cgPiB0ZCB7DQogICAgYm9yZGVyLXRvcDogbm9uZTsNCiAgICBsaW5lLWhlaWdodDogMjBweDsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLnRhYmxlOmxhc3Qtb2YtdHlwZSAucm93Omxhc3Qtb2YtdHlwZSB7DQoJYm9yZGVyLWJvdHRvbS13aWR0aDogMDsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLnRhYmxlLWhlYWRlciB7DQoJY3Vyc29yOiBoZWxwOw0KfQ0KDQoucmVmMmxpbmstdG9vbHRpcCAuaGVhZGluZyB7DQoJY3Vyc29yOiBkZWZhdWx0Ow0KfQ0KDQoucmVmMmxpbmstdG9vbHRpcCAudGFibGUtaGVhZGVyOmhvdmVyIHsNCgliYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0ICFpbXBvcnRhbnQ7DQp9DQoNCi5yZWYybGluay10b29sdGlwIGlbZGF0YS1hY3Rpb249cHJldmlld10gew0KCW1pbi13aWR0aDogMjBweDsNCgl0ZXh0LWFsaWduOiBjZW50ZXI7DQoJaGVpZ2h0OiAxLjVyZW07DQp9DQoNCi5yZWYybGluay10b29sdGlwIC5jb2wtYWN0aW9ucz4qLA0KLnJlZjJsaW5rLXRvb2x0aXAgaVtkYXRhLWFjdGlvbj1wcmV2aWV3XSwNCi5yZWYybGluay10b29sdGlwIGlbZGF0YS1mbGFnXSB7DQoJZGlzcGxheTogbm9uZTsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLmFjdGl2ZS1pbmRpY2F0b3I6aG92ZXIgaVtkYXRhLWFjdGlvbj1wcmV2aWV3XSwNCgkucmVmMmxpbmstdG9vbHRpcCAuYWN0aXZlIC5jb2wtYWN0aW9ucz4ucmwtbGluaywgLnJlZjJsaW5rLXRvb2x0aXAgLmFjdGl2ZS1pbmRpY2F0b3I6aG92ZXIgLmNvbC1hY3Rpb25zPi5ybC1saW5rLA0KCS5yZWYybGluay10b29sdGlwIC5hY3RpdmUgW2RhdGEtZmxhZz1hY3RpdmVdIHsNCglkaXNwbGF5OiBibG9jazsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLmFjdGl2ZS1pbmRpY2F0b3I6aG92ZXIgaVtkYXRhLWFjdGlvbj1wcmV2aWV3XSB7DQoJcG9zaXRpb246IGFic29sdXRlOw0KCXJpZ2h0OiAwOw0KCXRvcDogMDsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLmJpZyB7DQoJZm9udC1zaXplOiAxLjNyZW07DQoJZm9udC13ZWlnaHQ6IDYwMDsNCn0NCg0KLnJlZjJsaW5rLXRvb2x0aXAgLnIybC10aXRsZSB7DQogICAgd2hpdGUtc3BhY2U6IHByZS13cmFwOw0KfQ0KDQoucmVmMmxpbmstdG9vbHRpcCAudGFibGUgKyAucmVmMmxpbmstdG9vbHRpcCAudGFibGU6YmVmb3JlIHsNCglkaXNwbGF5OmJsb2NrOw0KCWhlaWdodDogMTVweDsNCgljb250ZW50OiAiICI7DQoJY2xlYXI6Ym90aDsNCn0NCg=="}',
    'R2L_VIEW_OPTIONS': '{ "viewUsesTarget": true, "viewTitleSuffix": "", "viewTitlePrefix": "to", "linkClassName": "" }',
    'R2L_NAMED_PATTERNS': 'W10=',
    'R2L_DEFAULT_LANG_ISO3': '',
    'R2L_FINLEX_ENDPOINT': 'http://ldf.fi/finlex/sparql',
    'R2L_PUBLICATIONS_ENDPOINT': 'http://publications.europa.eu/webapi/rdf/sparql',
    'R2L_ALIAS_MAP': {},
    'R2L_EULANG': new Map([['GLE', 'GA'], ['HRV', 'HR'], ['HUN', 'HU'], ['ITA', 'IT'], ['LAV', 'LV'], ['LIT', 'LT'], ['CES', 'CS'], ['POL', 'PL'], ['SLK', 'SK'], ['BUL', 'BG'], ['MLT', 'MT'], ['NLD', 'NL'], ['SLV', 'SL'], ['SPA', 'ES'], ['SWE', 'SV'], ['POR', 'PT'], ['RON', 'RO'], ['DAN', 'DA'], ['DEU', 'DE'], ['ELL', 'EL'], ['ENG', 'EN'], ['EST', 'ET'], ['FIN', 'FI'], ['FRA', 'FR']])
  },
  dataInitialAttribute: 'data-ref2link-initial',
  dataContextAttribute: 'data-ref2link-context',
  parsedAttribute: 'ref2link-parsed',
  dataAttribute: 'data-ref2link',
  "class": 'a.ref2link-generated, [role-link].ref2link-generated',
  classSimple: 'a, [role-link]',
  generatedClassName: 'ref2link-generated',
  maxReferenceLength: 255,
  maxTitleLength: 255,
  views: true,
  sort: "position.asc",
  getConstant: function getConstant(name) {
    return this.constants[name];
  },
  setConstant: function setConstant(name, value) {
    this.constants[name] = value;
  }
};
exports.settings = settings;
var editOptions = {
  tooltipTrigger: 'mouseenter',
  tooltip: "<div class=\"ref2link-tooltip table-responsive\" title=\"\">\n                    <div class=\"table table-condensed table-hover\">\n                        <div class=\"row heading\"><div class=\"col-xs-12 big\">{{ $reference }}</div></div>\n                    </div>\n                </div>",
  ruleHeading: "<div class=\"row table-header hidden-xs\" title=\"Resource group\">\n                        <div class=\"col-xs-12 big\">{{ $rulelibelle }}</div>\n                    </div>",
  rule: "<div class=\"row active-indicator\" title=\"Set link: &quot;{{ $title }}&quot;\" data-action=\"use\">\n                <div class=\"col-xs-2 col-actions\"><i class=\"rl-link\">&#128279;</i></div>\n                <div class=\"col-xs-10\">{{ $title }}<i class=\"\" data-action=\"preview\" title=\"Preview link in a new tab\">&#9658;</i></div>\n            </div>",
  alert: "<div class=\"alert alert-dismissable alert-{{ $alertType }}\" role=\"role\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n                </button>\n                {{ $msg }}\n            </div>",
  mode: 'edit'
};
exports.editOptions = editOptions;
var viewOptions = {
  tooltipTrigger: 'mouseenter',
  tooltip: "<div class=\"ref2link-tooltip\" title=\"\">\n                <div class=\"clearfix\"><div class=\"table-responsive\"><table class=\"table table-condensed table-hover\"></table></div></div>\n            </div>",
  enhancedHeading: "<thead class=\"row table-header hidden-xs\">\n                        <tr class=\"big r2l-celex\">\n                            <td colspan=\"2\">\n                                <div class=\"r2l-title\">{{ $title }}</div>\n                                <div class=\"r2l-force\" data-force=\"{{ $force }}\"><span class=\"bullet\"></div>\n                            </td>\n                        </tr>\n                    </thead>",
  ruleHeading: '',
  rule: "<tr class=\"row active-indicator\" style=\"margin: 5px 0\" data-action=\"preview\" title=\"Open in new tab\">\n                <td class=\"col-xs-2\"></td>\n                <td class=\"col-xs-10\">{{ $title }}</td>\n            </tr>",
  alert: '<div class="alert alert-dismissable alert-{{ $alertType }}" role="role"><button type="button" class="close" data-dismiss="alert" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + '</button>' + '{{ $msg }}' + '</div>',
  mode: 'view'
};
exports.viewOptions = viewOptions;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceAliases = replaceAliases;
exports.replaceAliasMatches = replaceAliasMatches;

var _functions = require("../utils/functions");

var _letters = require("../utils/letters");

var _index = require("../jquery/index");

var _index2 = require("../index");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var spacePattern = "(?:(?:[\\u00a0\\u202F ]|(?:(?:\\x26(?:amp;)?)nbsp;))+)";
var letterPattern = "[/0-9" + _letters.letters.latin + _letters.letters.cyrillic + _letters.letters.greek + _letters.letters.specialChars + "]";
var lookahead = (0, _functions.getLookAhead)(letterPattern);
var lookbehind = (0, _functions.getLookBehind)(letterPattern);

function getRegExp(alias) {
  alias = (0, _functions.regExpEscape)(alias);
  return alias.replace(new RegExp(" ", 'g'), spacePattern);
}

function replaceAliases(text, extracts) {
  var offsets = [];

  var map = _index2.R2L.getConstant("R2L_ALIAS_MAP");

  for (var i = extracts.length - 1; i >= 0; i--) {
    var ex = extracts[i];
    var length = (ex.$this.attr(_index2.R2L.dataRef2linkInitialAttribute) || "").trim().length;
    var extractHtml = '<ref2link-object oid="' + (0, _index.padCounter)(i) + '"></ref2link-object>';
    var wildcard = "";

    for (var _i = 0; _i < length; _i++) {
      wildcard += "*";
    }

    text = text.split(extractHtml).join(wildcard);
  }

  ; // build global pattern

  var globalPatterns = [];
  var args;
  var sortedKeys = Object.keys(map).sort(function (a, b) {
    return a.length > b.length ? -1 : 1;
  });
  sortedKeys.forEach(function (key) {
    var r = key.substr(0, 1) === "/" && key.substr(key.length - 1, 1) === "/" ? key.substr(1, key.length - 2) : getRegExp(key);
    globalPatterns.push({
      key: key,
      regexp: '(' + r + ')',
      value: map[key]
    });
  });

  if (globalPatterns.length === 0) {
    return {
      text: text,
      offsets: offsets
    };
  }

  var globalPattern = new RegExp('(?![\r\n\v\f])' + lookbehind + "(?:".concat(globalPatterns.map(function (g) {
    return g.regexp;
  }).join('|'), ")") + lookahead, 'ig');

  while (args = globalPattern.exec(text)) {
    var index = null;

    for (var _i2 = 1; _i2 < args.length; _i2++) {
      if (args[_i2]) {
        index = _i2;
        break;
      }
    }

    var offset = {
      source: args[0],
      replacement: globalPatterns[index - 1].value,
      position: args.index
    };
    offsets.push(offset);
  }

  var cursorOffset = 0; // Add after-replacement offsets too

  offsets.map(function (o, index) {
    o.replacementPosition = o.position + cursorOffset;
    cursorOffset += o.replacement.length - o.source.length;
  });
  offsets.forEach(function (offset) {
    text = text.replace(new RegExp(offset.source, 'g'), offset.replacement);
  });
  return {
    text: text,
    offsets: offsets
  };
}

function replaceAliasMatches(matches, replaceAliasesResult) {
  var offsets = _toConsumableArray(replaceAliasesResult.offsets);

  offsets = offsets.sort(function (a, b) {
    return a.replacement.length > b.replacement.length ? -1 : 1;
  }); // we need to replace the match (+ its offsets and its key) back with the alias
  // all the matches should be alias-based

  Object.keys(matches).forEach(function (key) {
    var newMatch = matches[key];
    newMatch.offsets = newMatch.offsets.map(function (matchOffset) {
      var aliasOffset = null;

      if (matchOffset.context.indexOf(matchOffset.match) === -1) {
        return matchOffset;
      } // get the correct offset using the replacementPosition of the alias offsets


      var referenceStart = matchOffset.position - matchOffset.context.indexOf(matchOffset.match);
      var referenceEnd = referenceStart + matchOffset.context.length;

      for (var i = 0; i < replaceAliasesResult.offsets.length; i++) {
        if (replaceAliasesResult.offsets[i].replacementPosition >= referenceStart && replaceAliasesResult.offsets[i].replacementPosition < referenceEnd) {
          // can also be the next alias offset
          aliasOffset = replaceAliasesResult.offsets[i];
          break;
        }
      }

      if (aliasOffset) {
        matchOffset = replaceFn(matchOffset, aliasOffset.replacement, aliasOffset.source);
        matchOffset.alias = aliasOffset; //adjust position by applying the delta of its aliasOffset

        matchOffset.position += aliasOffset.position - aliasOffset.replacementPosition;
      }

      return matchOffset;
    });
  });
  var newMatches = {}; // replace keys and match objects 

  Object.keys(matches).forEach(function (key) {
    var matchOffset = matches[key].offsets[0];

    if (matchOffset.alias) {
      var newKey = key.replace(matchOffset.alias.replacement, matchOffset.alias.source);
      var newMatch = matches[key];
      newMatches[newKey] = replaceFn(newMatch, matchOffset.alias.replacement, matchOffset.alias.source);
    }
  });
  return newMatches;
}

var replaceFn = function replaceFn(obj, search, replace) {
  var searchRegexp = new RegExp((0, _functions.regExpEscape)(search), 'g');
  obj.match = obj.match.replace(searchRegexp, replace);

  if (obj.reference) {
    obj.reference = obj.reference.replace(searchRegexp, replace);
  }

  if (obj.wholeMatch) {
    obj.wholeMatch = obj.wholeMatch.replace(searchRegexp, replace);
  }

  if (obj.context) {
    obj.context = obj.context.replace(searchRegexp, replace);
  }

  if (obj.link) {
    obj.link = obj.link.replace(searchRegexp, replace);
  }

  if (obj.views) {
    Object.keys(obj.views).forEach(function (k) {
      if (k === 'table') {
        return;
      } // Only replace the content and some attributes. We must be careful not to replace inside hrefs.


      try {
        var $el = $(obj.views[k]);

        if ($el.length) {
          $el.html($el.html().replace(searchRegexp, replace));

          if ($el.attr(_index2.R2L.dataRef2linkInitialAttribute)) {
            $el.attr(_index2.R2L.dataRef2linkInitialAttribute, $el.attr(_index2.R2L.dataRef2linkInitialAttribute).replace(searchRegexp, replace));
          }

          obj.views[k] = $el[0].outerHTML;
        } else {
          obj.views[k] = obj.views[k].replace(searchRegexp, replace);
        }
      } catch (e) {// table view, ignore
      }
    });
  }

  if (obj.alternatives) {
    obj.alternatives = obj.alternatives.map(function (alt) {
      try {
        var $el = $(alt.view);

        if ($el.length) {
          $el.html($el.html().replace(searchRegexp, replace));

          if ($el.attr(_index2.R2L.dataRef2linkInitialAttribute)) {
            $el.attr(_index2.R2L.dataRef2linkInitialAttribute, $el.attr(_index2.R2L.dataRef2linkInitialAttribute).replace(searchRegexp, replace));
          }

          if ($el.attr(_index2.R2L.dataRef2linkContextAttribute)) {
            $el.attr(_index2.R2L.dataRef2linkContextAttribute, $el.attr(_index2.R2L.dataRef2linkContextAttribute).replace(searchRegexp, replace));
          }

          alt.view = $el[0].outerHTML;
        } else {
          alt.view = alt.view.replace(searchRegexp, replace);
        }
      } catch (e) {// table view, ignore
      }

      alt.reference = alt.reference.replace(searchRegexp, replace);
      alt.match = alt.match.replace(searchRegexp, replace);
      alt.wholeMatch = alt.wholeMatch.replace(searchRegexp, replace);
      alt.context = alt.context.replace(searchRegexp, replace);
      alt.link = alt.link.replace(searchRegexp, replace);
      return alt;
    });
  }

  return obj;
};

},{"../index":4,"../jquery/index":5,"../utils/functions":12,"../utils/letters":13}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base64 = void 0;
var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function encode(r) {
    var t,
        e,
        o,
        a,
        h,
        n,
        c,
        d = "",
        C = 0;

    for (r = Base64._utf8_encode(r); C < r.length;) {
      t = r.charCodeAt(C++), e = r.charCodeAt(C++), o = r.charCodeAt(C++), a = t >> 2, h = (3 & t) << 4 | e >> 4, n = (15 & e) << 2 | o >> 6, c = 63 & o, isNaN(e) ? n = c = 64 : isNaN(o) && (c = 64), d = d + this._keyStr.charAt(a) + this._keyStr.charAt(h) + this._keyStr.charAt(n) + this._keyStr.charAt(c);
    }

    return d;
  },
  decode: function decode(r) {
    var t,
        e,
        o,
        a,
        h,
        n,
        c,
        d = "",
        C = 0;

    for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); C < r.length;) {
      a = this._keyStr.indexOf(r.charAt(C++)), h = this._keyStr.indexOf(r.charAt(C++)), n = this._keyStr.indexOf(r.charAt(C++)), c = this._keyStr.indexOf(r.charAt(C++)), t = a << 2 | h >> 4, e = (15 & h) << 4 | n >> 2, o = (3 & n) << 6 | c, d += String.fromCharCode(t), 64 != n && (d += String.fromCharCode(e)), 64 != c && (d += String.fromCharCode(o));
    }

    return d = Base64._utf8_decode(d);
  },
  _utf8_encode: function _utf8_encode(r) {
    r = r.replace(/\r\n/g, "\n");

    for (var t = "", e = 0; e < r.length; e++) {
      var o = r.charCodeAt(e);
      128 > o ? t += String.fromCharCode(o) : o > 127 && 2048 > o ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
    }

    return t;
  },
  _utf8_decode: function _utf8_decode(r) {
    var c1, c2, c3;

    for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length;) {
      o = r.charCodeAt(e), 128 > o ? (t += String.fromCharCode(o), e++) : o > 191 && 224 > o ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), e += 3);
    }

    return t;
  }
};
exports.Base64 = Base64;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.converters = void 0;
var converters = {
  lang: function lang() {
    if (R2L.options && R2L.options.language && typeof R2L.options.language === "string") {
      return '/' + R2L.options.language;
    } else {
      return '';
    }
  },
  langIsoA2: function langIsoA2() {
    var lang = R2L.getLanguage();

    if (typeof lang === "string") {
      if (R2L.getConstant("R2L_EULANG").has(lang.toUpperCase())) {
        return '/' + R2L.getConstant("R2L_EULANG").get(lang.toUpperCase());
      }

      return '';
    } else {
      return '';
    }
  },
  langIsoA3: function langIsoA3() {
    var lang = R2L.getLanguage();

    if (typeof lang === "string") {
      if (R2L.getConstant("R2L_EULANG").has(lang.toUpperCase())) {
        return '/' + lang;
      }

      return '';
    } else {
      return '';
    }
  },
  month: function month(str) {
    if (str && !isNaN(str)) {
      return str;
    }

    var converterRule = R2L.getConverterRules().filter(function (r) {
      return r.type === 'label_month';
    })[0];

    if (!converterRule) {
      return '';
    }

    str = str ? String(str) : "";
    var matches = str.match(new RegExp(converterRule.pattern.source, "im"));

    if (matches && matches.length > 0) {
      for (var i = 1; i <= 12; i++) {
        if (matches[i]) {
          return String(i);
        }
      }
    }

    return '';
  },
  numeration: function numeration(str) {
    if (String(str).length > 0 && !isNaN(str)) {
      return str;
    }

    var converterRule = R2L.getConverterRules().filter(function (r) {
      return r.type === 'label_numeration';
    })[0];

    if (!converterRule) {
      return '';
    }

    str = str ? String(str) : "";
    var matches = str.match(new RegExp(converterRule.pattern.source, "im"));

    if (matches && matches.length > 0) {
      for (var i = 1; i <= 5; i++) {
        if (matches[i]) {
          return String(i);
        }
      }
    }

    return '';
  },
  pad: function pad(str, _pad, len, position, strict) {
    str = str || '';

    if (strict && !str) {
      return '';
    }

    len = len || 0;
    _pad = (_pad === 0 ? '0' : _pad) || '';
    var chars = len - ('' + str).length;

    if (chars > 0) {
      switch (position) {
        case 'right':
          return str + ('' + _pad).repeat(chars);

        case 'left':
        default:
          return ('' + _pad).repeat(chars) + str;
      }
    }

    return str;
  },
  year: function year(str) {
    str = str || '';

    if (('' + str).length == 4) {
      return str;
    }

    if (('' + str).length == 2) {
      var y = parseInt(str, 10);

      if (y <= 57) {
        return '20' + str;
      } else {
        return '19' + str;
      }
    }

    if (!str) {
      return new Date().getFullYear();
    }
  },
  trim: function trim(str, chars) {
    var regExpEscape = function regExpEscape(pattern) {
      return pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    str = str || '';
    chars = chars || '';

    if (chars.trim()) {
      var re = new RegExp("^[" + regExpEscape(chars) + "]+|[" + regExpEscape(chars) + "]+$", "g");
      return str.replace(re, '');
    } else {
      return str.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();
    }
  },
  replace: function replace(str, what, replacement, isRegexp) {
    return (String(str) || '').replace(R2L.delimiter2RegExp(what), replacement === undefined ? '' : replacement);
  },
  length: function length(obj) {
    return obj && obj.hasOwnProperty('length') ? obj.length : 0;
  },
  split: function split(str, delimiter) {
    return (str || '').split(R2L.delimiter2RegExp(delimiter));
  },
  _default: function _default(str, defaultValue) {
    return (str === 0 ? '0' : str) || (defaultValue ? encodeURIComponent(defaultValue) : '') || '';
  },
  any: function any() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== "string") {
        continue;
      }

      if (arguments[i].length > 0) {
        return arguments[i];
      }
    }

    return '';
  },
  number: function number(input) {
    var romans = {
      ι: 1,
      i: 1,
      v: 5,
      χ: 10,
      x: 10,
      l: 50,
      c: 100,
      d: 500,
      m: 1000
    },
        pos = 0,
        _char,
        nextchar,
        thisSum,
        result = 0;

    input = (input || '').toLowerCase();

    if (/^\d+$/.test(input)) {
      return parseInt(input, 10);
    }

    while (pos < input.length) {
      _char = input[pos]; // are we NOT at the end?

      if (pos != input.length) {
        // check next character - if bigger, replace with a sub
        nextchar = input[pos + 1];

        if (romans[_char] < romans[nextchar]) {
          thisSum = romans[nextchar] - romans[_char];
          result += thisSum;
          pos += 2;
        } else {
          result += romans[_char];
          pos++;
        }
      } else {
        result += romans[_char];
        pos++;
      }
    }

    return result ? result : '';
  },
  roman: function roman(input) {
    var romans = {
      ι: 1,
      i: 1,
      v: 5,
      χ: 10,
      x: 10,
      l: 50,
      c: 100,
      d: 500,
      m: 1000
    },
        pos = 0,
        _char2,
        nextchar,
        thisSum,
        result = 0; // Can be used as connector words (and, or)


    if (input === 'i' || input === 'v') {
      return '';
    }

    input = (input || '').toLowerCase();

    if (/^\d+$/.test(input)) {
      return parseInt(input, 10);
    }

    while (pos < input.length) {
      _char2 = input[pos]; // are we NOT at the end?

      if (pos != input.length) {
        // check next character - if bigger, replace with a sub
        nextchar = input[pos + 1];

        if (romans[_char2] < romans[nextchar]) {
          thisSum = romans[nextchar] - romans[_char2];
          result += thisSum;
          pos += 2;
        } else {
          result += romans[_char2];
          pos++;
        }
      } else {
        result += romans[_char2];
        pos++;
      }
    }

    return result ? result : '';
  },
  letterToLatin: function letterToLatin(characters) {
    var letters = R2L.letters;
    var ReCyrillic = new RegExp("[" + letters.cyrillic + "]");
    var ReGreek = new RegExp("[" + letters.greek + "]");
    var latinCodes = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var latinTranslation = "";
    characters = characters.toLowerCase();

    if (ReCyrillic.test(characters)) {
      var cyrilicCodes = ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ"];
      var i = characters.length;
      var index = 0;

      while (i--) {
        index = cyrilicCodes.indexOf(characters.charAt(i));
        latinTranslation = latinCodes[index] + latinTranslation;
      }

      return latinTranslation;
    } else if (ReGreek.test(characters)) {
      var greekSingleCodes = ["α", "β", "γ", "δ", "ε", "στ", "ζ", "η", "θ"];
      var greekTensCodes = ["", "ι", "κ", "λ", "μ"];
      var _i = characters.length;
      var _index = 0;

      while (_i--) {
        var letter = characters.charAt(_i);

        if (characters.charAt(_i) == "τ") {
          _i--;
          letter = characters.charAt(_i) + letter;
        }

        ;

        if (greekSingleCodes.indexOf(letter) > 0) {
          _index = _index + greekSingleCodes.indexOf(letter);
        }

        ;

        if (greekTensCodes.indexOf(letter) >= 0) {
          _index = _index + greekTensCodes.indexOf(letter) * (greekSingleCodes.length + 1);
        }

        ;
      }

      var firstLetter = parseInt(_index / latinCodes.length) - 1;
      var secondLetter = _index % latinCodes.length;

      if (firstLetter >= 0) {
        return latinCodes[firstLetter] + latinCodes[secondLetter];
      } else {
        return latinCodes[secondLetter];
      }
    }

    ;
    return characters;
  },
  testReplace: function testReplace(str, what, replacement) {
    var reg = R2L.delimiter2RegExp(what);
    str = String(str) || '';

    if (reg.test(str)) {
      return replacement === undefined ? '' : replacement;
    }

    return str;
  },
  testNotReplace: function testNotReplace(str, what, replacement) {
    var reg = R2L.delimiter2RegExp(what);
    str = String(str) || '';

    if (!reg.test(str)) {
      return replacement === undefined ? '' : replacement;
    }

    return str;
  },
  dec: function dec(n) {
    if (!isNaN(n)) {
      return --n;
    }

    return NaN;
  },
  upper: function upper(t) {
    return (t || '').toUpperCase();
  },
  lower: function lower(t) {
    return (t || '').toLowerCase();
  },
  urlencode: function urlencode(url) {
    return encodeURIComponent(url || '');
  },
  ucfirst: function ucfirst(str) {
    return ((str || '')[0] || '').toUpperCase() + ((str || '').substring(1) || '');
  },
  is: function is(str, list) {
    return list.split(',').indexOf(str) >= 0;
  },
  match: function match(str, expr) {
    var e = R2L.delimiter2RegExp(expr);

    if (e) {
      return e.test(str);
    }
  },
  isYear: function isYear(str) {
    var no = R2L.converters.number(str),
        year = new Date().getFullYear();

    if (('' + no).length === 2 || ('' + no).length === 1 && '0' + no === str) {
      return no >= 58 || no >= 0 && no <= year % 2000;
    }

    if (('' + no).length === 4) {
      return no >= 1958 && no <= year;
    }

    return false;
  },
  not: function not(bool) {
    return !bool;
  },
  remap: function remap(val, map, dest) {
    if (!Array.isArray(map)) {
      map = [map];
    }

    if (!Array.isArray(dest)) {
      dest = [dest];
    }

    if (map.length !== dest.length) {
      throw '"matchMap" map.length !== dest.length';
    }

    for (var i = 0; i < map.length; i++) {
      var e = R2L.delimiter2RegExp(map[i]);

      if (e && e.test(val)) {
        return dest[i];
      }
    }

    return val;
  },
  equals: function equals(strFirst, strSecond) {
    return strFirst === strSecond;
  },
  nequals: function nequals(strFirst, strSecond) {
    return strFirst !== strSecond;
  },
  base64: function base64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }).replace('%20', ' '));
  },
  concat: function concat(strFirst, strSecond) {
    strFirst = strFirst || '';
    strSecond = strSecond || '';
    return strFirst.concat(strSecond);
  },
  debug: function debug(val) {
    debugger;
    return val;
  },
  sum: function sum(intFirst, intSecond) {
    var result = Number(intFirst) + Number(intSecond);
    return isNaN(result) ? 0 : result;
  },
  isNumeric: function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
};
exports.converters = converters;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regExpEscape = regExpEscape;
exports.xmlEscape = xmlEscape;
exports.supportNegativeLookbehind = supportNegativeLookbehind;
exports.getLookBehind = getLookBehind;
exports.getLookAhead = getLookAhead;
exports.replaceBoundariedWords = replaceBoundariedWords;
exports.delimiter2RegExp = delimiter2RegExp;
exports.simpleParse = simpleParse;
exports.getNonCapturingPattern = getNonCapturingPattern;
exports.matchIdentity = matchIdentity;
exports.identity = identity;
exports.getReferences = getReferences;
exports.mergeMatches = mergeMatches;

var _letters = require("./letters");

var _index = require("../ux/index");

var _index2 = require("../settings/index");

var _underscore = require("./underscore");

var _index3 = require("../index");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function regExpEscape(pattern) {
  return pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

;

function xmlEscape(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<':
        return '&lt;';

      case '>':
        return '&gt;';

      case '&':
        return '&amp;';

      case '\'':
        return '&apos;';

      case '"':
        return '&quot;';
    }
  });
}

function supportNegativeLookbehind() {
  try {
    var r = new RegExp("(?<!1)");
    return true;
  } catch (e) {
    return false;
  }
}

;

function getLookBehind(pattern) {
  return supportNegativeLookbehind() ? '(?<!' + pattern + ')' : '';
}

;

function getLookAhead(pattern) {
  return '(?!' + pattern + ')';
}

;
/**
 * Replace only where the search string is neighboured by boundaries
 * @param string toReplace
 * @param string replacement
 * @param string context
 * @param boolean allowAttribute
 *
 * @return string replaced text
 */

function replaceBoundariedWords(toReplace, replacement, context, allowAttribute) {
  if (allowAttribute !== false) {
    allowAttribute = true;
  }

  var letterPattern = "[/0-9" + _letters.letters.latin + _letters.letters.cyrillic + _letters.letters.greek + _letters.letters.specialChars + (allowAttribute ? '' : '"') + "]";
  var lookahead = getLookAhead(letterPattern);
  var lookbehind = getLookBehind(letterPattern);
  toReplace = lookbehind + toReplace + lookahead;

  if (!lookbehind) {
    return context.replace(new RegExp(toReplace, 'g'), function (match, index) {
      if (index > 0) {
        if (new RegExp(letterPattern).test(context[index - 1])) {
          return match;
        } else {
          return replacement;
        }
      }

      return replacement;
    });
  } else {
    return context.replace(new RegExp(toReplace, 'g'), replacement);
  }
}

;

function delimiter2RegExp(delimiter) {
  var expr = null;

  if (!_underscore._.isRegExp(delimiter)) {
    if (_index3.R2L.getNamedRule(delimiter)) {
      expr = _index3.R2L.getNamedRule(delimiter).pattern;
    }

    if (!expr && delimiter) {
      if (delimiter[0] === '/' && delimiter.length > 1) {
        var parts = delimiter.split('/');
        parts.shift();
        var modifiers = parts.pop();
        expr = new RegExp(parts.join('/'), modifiers);
      }
    }

    if (!expr && delimiter) {
      expr = new RegExp(regExpEscape(delimiter), 'gi');
    }
  } else {
    expr = delimiter;
  }

  return expr;
}

;

function simpleParse(tpl, data) {
  return tpl.replace(/\{\{\s*\$([^}]+?)\s*\}\}/ig, function (match, varName) {
    return varName && data.hasOwnProperty(varName) ? data[varName] : '';
  });
}

;

function getNonCapturingPattern(pattern) {
  return pattern.replace(/\((?!\?[<!=:])/g, function (match, position) {
    if (position > 3) {
      if (pattern[position - 3] + pattern[position - 2] + pattern[position - 1] === '(?=') {
        return match;
      }
    }

    if (position == 0 || position > 0 && pattern[position - 1] !== '\\') {
      return '(?:';
    }

    return match;
  });
}

;

function matchIdentity() {
  var match = {
    count: this.counter,
    match: this.match,
    wholeMatch: this.wholeMatch,
    type: this.rule.type,
    label: this.rule.rulelibelle,
    views: [],
    rule: this.rule
  },
      renderedViews = [];
  this.alternatives.sort(_index.orderSorter);
  var defaultRendered = false;

  _underscore._.each(this.alternatives.reverse(), function (_alternative) {
    if (_alternative.viewName == '_default' || !$.trim(_alternative.view) || renderedViews.indexOf(_alternative.view) >= 0) {
      return;
    }

    match.views.push({
      target: _alternative.viewName,
      view: _alternative.view,
      _default: !defaultRendered,
      order: _alternative.order
    });
    defaultRendered = true;
    renderedViews.push(_alternative.view);
  });

  return match;
}

function identity(inTextMatches) {
  var result = [];

  _underscore._.each(inTextMatches, function (_inTextMatch) {
    result.push(matchIdentity.call(_inTextMatch));
  });

  return result;
}

;

function getReferences() {
  var $this = $(this),
      inTextMatches = {},
      $ref2links = $this.find(".".concat(_index2.settings.generatedClassName));
  ;

  if (!$ref2links.length && !$($this).attr(_index2.settings.parsedAttribute)) {
    var $content = $('<div>' + $this.html() + '</div>');
    $content.parseReferences();
    $ref2links = $content.find(".".concat(_index2.settings.generatedClassName));
  }

  $ref2links.each(function () {
    var reference = $(this).getRef2linkMatch();

    if (!reference || !reference.reference) {
      return;
    }

    if (!inTextMatches.hasOwnProperty(reference.reference)) {
      inTextMatches[reference.reference] = Object.assign({}, reference);
      inTextMatches[reference.reference].counter = 0;
    } else {
      // the reference offsets should already be grouped, but not in the case of aliases
      reference.offsets.forEach(function (offset) {
        var existing = inTextMatches[reference.reference].offsets.filter(function (o) {
          return o.position === offset.position;
        }).length > 0;

        if (!existing) {
          inTextMatches[reference.reference].offsets.push(offset);
        }
      });
    }

    inTextMatches[reference.reference].counter++;
  });
  return inTextMatches;
}

;

function mergeMatches(matches1, matches2) {
  Object.keys(matches1).forEach(function (key) {
    if (matches2[key]) {
      // add offsets
      matches1[key].offsets = matches1[key].offsets.concat(matches2[key].offsets);
      matches1[key].counter += matches2[key].counter;
    }
  });
  return _objectSpread({}, matches2, {}, matches1);
}

},{"../index":4,"../settings/index":8,"../ux/index":19,"./letters":13,"./underscore":18}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.letters = void 0;
var letters = {
  latin: "a-zA-Z",
  cyrillic: "ЁёА-я",
  greek: "Α-ω",
  specialChars: "ÄäÅåÁáÀàÂâĂăĄąĀāĊċĆćČčÇçĎďĐđĘęĖėËëÉéÈèÊêĒēĚěĢģĠġĦħÏïÎîÌìÍíĪīĮįĶķŁłĹĺĽľĻļŃńŇňÑñŅņÖöÔôÓóŐőÒòÕõØøŔŕŘřŚśŠšȘșẞßȚțŤťÜüŮůÙùÚúŰűÛûŪūŲųŸÿŻżŹźŽžŒœÆæ"
};
exports.letters = letters;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneCoreIdentifiers = cloneCoreIdentifiers;
exports.cloneListIdentifiers = cloneListIdentifiers;
exports.cloneListCore = cloneListCore;
exports.getOffsetMap = getOffsetMap;
exports.getListCore = getListCore;
exports.getListShared = getListShared;
exports.getCoreIdentifiers = getCoreIdentifiers;
exports.getListVars = getListVars;
exports.getListSkips = getListSkips;
exports.getSubpartIdentifiers = getSubpartIdentifiers;
exports.getListIdentifiers = getListIdentifiers;

/**
 * Copy the identifiers of a subpart - Exclude point level
 * @param Object $sourceRef match object 
 * @param Object $destRef match object
 *
 * @return boolean result
 */
function cloneCoreIdentifiers(sourceRef, destRef) {
  var sourceIds = getSubpartIdentifiers(sourceRef.rule, sourceRef.matches);
  var coreIndexes = sourceRef.rule.coreIdentifiers ? String(sourceRef.rule.coreIdentifiers).split(" ") : [];
  var destVar = null;
  var destVars = getListVars(destRef.rule, destRef.matches);
  /* Constructs like "32.4" number.number (SV) should not clone identifiers */

  if (/^\d+\.\d+/.test(sourceRef.matches[0])) {
    return true;
  }
  /* Constructs with brackets like "13(b)" article(point letter) should not clone identifiers */


  if (destVars.length === 1 && !/^\d+\([a-z0-9]+\)/.test(destRef.matches[0])) {
    destVar = destVars[0].match;
    destRef.matches[parseInt(destVars[0].index)] = undefined;
  }

  var filteredSourceVars = [];

  for (var i = 0; i < sourceIds.length; i++) {
    if (coreIndexes.indexOf(sourceIds[i].index) !== -1) {
      filteredSourceVars.push(sourceIds[i]);
    } else {
      if (destVar) {
        destRef.matches[parseInt(sourceIds[i].index)] = destVar;
      }
    }
  }

  for (var i = 0; i < filteredSourceVars.length; i++) {
    if (!destRef.matches[parseInt(filteredSourceVars[i].index)]) {
      destRef.matches[parseInt(filteredSourceVars[i].index)] = filteredSourceVars[i].match;
    }
  }

  return true;
}
/**
 * Adjust destRef identifiers in case of standalone numbers by merging with source
 * @param Object $sourceRef match object 
 * @param Object $destRef match object
 *
 * @return boolean result
 */


function cloneListIdentifiers(sourceRef, destRef) {
  if (!sourceRef.rule || !sourceRef.rule.type) {
    return false;
  }

  var destVars = getListVars(destRef.rule, destRef.matches);
  var destIds = getListIdentifiers(destRef.rule, destRef.matches);
  destIds = destIds.filter(function (id) {
    return id.type === 'identifiers';
  });

  if (destVars.length === 1 && destIds.length === 1) {
    /* This match has variable offsets, meaning we need the context from source
     * Merge the variable value into the matches of the source. 
     */

    /* Don't overwrite prefix data */
    var sourceIds = getSubpartIdentifiers(sourceRef.rule, sourceRef.matches);
    var skipVars = getListSkips(sourceRef.rule, sourceRef.matches);
    var skipIndexes = skipVars.map(function (skipVar) {
      return skipVar.index;
    });
    /** 
     * If the source looks like this: "article 15 (4)" or "article 16(b)" then we need to analyse the destination 
     * in order to find the correct offsets
     */

    if (/\d+\s?\(([a-z]|[0-9]+)\)/.test(sourceRef.matches[0])) {
      /**
       * Constructs with brackets like "article 3(12) and 4 of Dir 497/2018" should not clone identifiers 
       */
      if (/^\d+(\(\w\))?$/.test(destRef.matches[0])) {
        // include all but the first sourceId as skip indexes
        for (var skipIndex = 1; skipIndex < sourceIds.length; skipIndex++) {
          skipIndexes.push(sourceIds[skipIndex].index);
        }
      }
    }
    /** If the raw reference (destination) is wrapped in brackets eg "art. 14(3) and (4)" we don't use skip vars */


    if (/^\(\d\)/.test(destRef.matches[0].trim())) {
      skipIndexes = [];
    }
    /** 
     * If the raw reference is a letter we don't use skip vars as it will be last-level
     * Example: article 15 point a) and b)
     */


    if (/^\(?[a-z]/.test(destRef.matches[0])) {
      skipIndexes = [];
    }
    /** 
     * Source constructs like article.paragraph should be handled differently. 
     * All raw subparts after them should be 1st level (SV) 
     */


    if (/\d\.[a-nA-N0-9]/.test(sourceRef.matches[0])) {
      for (var _skipIndex = 1; _skipIndex < sourceIds.length; _skipIndex++) {
        skipIndexes.push(sourceIds[_skipIndex].index);
      }
    }

    var filteredSourceIds = sourceIds.filter(function (sourceId) {
      return skipIndexes.indexOf(sourceId.index) === -1;
    });

    if (filteredSourceIds.length > 0) {
      destRef.matches[parseInt(destVars[0].index)] = undefined;
      /** 
       * Find a position to insert the variable. 
       * Usually it's last level eg. article 5 paragraphs 1 and 2
       * Sometimes it's one to the left eg. article 5 paragraphs 1(a) and 2(b)
       * If there is a mismatch between type (letter vs number) we can move one position to the left
       */

      var selectedSlot = filteredSourceIds.length - 1;

      if (filteredSourceIds.length > 1 && /\d+/.test(destVars[0].match) && /[a-z]/.test(filteredSourceIds[filteredSourceIds.length - 1].match)) {
        selectedSlot--;
        filteredSourceIds.splice(-1, 1);
      }

      filteredSourceIds[selectedSlot].match = destVars[0].match;

      for (var i = 0; i < filteredSourceIds.length; i++) {
        destRef.matches[parseInt(filteredSourceIds[i].index)] = filteredSourceIds[i].match;
      }
    }
  }

  return true;
}

;
/**
 * Copy prefix matches from one object to the other
 * @param Object $sourceRef match object 
 * @param Object $destRef match object
 *
 * @return boolean result
 */

function cloneListCore(sourceRef, destRef) {
  if (!sourceRef.rule || !sourceRef.rule.type || !sourceRef.rule.prefix) {
    return false;
  }

  var indexes;
  var listRef = getListCore(destRef.rule, destRef.matches);

  if (listRef.length === 0 && sourceRef.rule.prefix) {
    var indexes = String(sourceRef.rule.prefix).split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (typeof sourceRef.matches[indexes[i]] === "string" && typeof destRef.matches[indexes[i]] === "undefined") {
        destRef.matches[indexes[i]] = sourceRef.matches[indexes[i]];
      }
    }
  }

  var sharedRef = getListShared(destRef.rule, destRef.matches);

  if (sharedRef.length === 0 && sourceRef.rule.shared) {
    indexes = String(sourceRef.rule.shared).split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (typeof sourceRef.matches[indexes[i]] === "string" && typeof destRef.matches[indexes[i]] === "undefined") {
        destRef.matches[indexes[i]] = sourceRef.matches[indexes[i]];
      }
    }
  }

  return true;
}

;
/**
 * Get map of offsets for lists
 * @param Object[] references
 * 
 * @return Object map of full list matches
 */

function getOffsetMap(references) {
  var allOffsets = {};

  for (var i = 0; i < references.length; i++) {
    if (!Array.isArray(references[i].offsets)) {
      continue;
    }

    for (var j = 0; j < references[i].offsets.length; j++) {
      if (!allOffsets[references[i].offsets[j].context]) {
        allOffsets[references[i].offsets[j].context] = new Array();
      }

      allOffsets[references[i].offsets[j].context].push(references[i].offsets[j]);
    }
  }

  return allOffsets;
}

;
/**
 * Get base list information from the matches.
 * 
 * @param Object $rule
 * @param string[] matches
 * 
 * @return string[] 
 */

function getListCore(rule, matches) {
  var arr = new Array();

  if (rule.prefix) {
    rule.prefix = String(rule.prefix);
    var indexes = rule.prefix.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'prefix'
        });
      }
    }
  }

  return arr;
}

;
/**
 * Get shared list information from the matches.
 * 
 * @param Object $rule
 * @param string[] matches
 * 
 * @return string[] 
 */

function getListShared(rule, matches) {
  var arr = new Array();

  if (rule.shared) {
    rule.shared = String(rule.shared);
    var indexes = rule.shared.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'shared'
        });
      }
    }
  }

  return arr;
}

;

function getCoreIdentifiers(rule, matches) {
  var arr = new Array();

  if (rule.coreIdentifiers) {
    rule.coreIdentifiers = String(rule.coreIdentifiers);
    var indexes = rule.coreIdentifiers.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'core-identifiers'
        });
      }
    }
  }

  return arr;
}

;
/**
 * Get variables list information from the matches.
 * 
 * @param Object $rule
 * @param string[] matches
 * 
 * @return string[] 
 */

function getListVars(rule, matches) {
  var arr = new Array();

  if (rule.vars) {
    rule.vars = String(rule.vars);
    var indexes = rule.vars.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'vars'
        });
      }
    }
  }

  return arr;
}

;
/**
 * Get skip list information from the matches.
 * 
 * @param Object $rule
 * @param string[] matches
 * 
 * @return string[] 
 */

function getListSkips(rule, matches) {
  var arr = new Array();

  if (rule.skip) {
    rule.skip = String(rule.skip);
    var indexes = rule.skip.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'skip'
        });
      }
    }
  }

  return arr;
}

;
/**
 * Get subpart specific information from the matches
 * @param Object $rule
 * @param string[] matches
 * 
 * @return string[] 
 */

function getSubpartIdentifiers(rule, matches) {
  var arr = new Array();

  if (rule.identifiers) {
    rule.identifiers = String(rule.identifiers);
    var indexes = rule.identifiers.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'identifiers'
        });
      }
    }
  }

  return arr;
}

;
/**
 * Get list-item specific information from the matches
 * @param Object $rule
 * @param string[] matches
 * 
 * @return string[] 
 */

function getListIdentifiers(rule, matches) {
  var arr = new Array();

  if (rule.shared) {
    rule.shared = String(rule.shared);
    var indexes = rule.shared.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'shared'
        });
      }
    }
  }

  if (rule.identifiers) {
    rule.identifiers = String(rule.identifiers);
    var indexes = rule.identifiers.split(" ");

    for (var i = 0; i < indexes.length; i++) {
      if (matches[indexes[i]]) {
        arr.push({
          'index': indexes[i],
          'match': matches[indexes[i]],
          'type': 'identifiers'
        });
      }
    }
  }

  return arr;
}

;

},{}],15:[function(require,module,exports){
"use strict";

/** string repeat polifill (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) */
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    'use strict';

    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }

    var str = '' + this;
    count = +count;

    if (count != count) {
      count = 0;
    }

    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }

    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }

    count = Math.floor(count);

    if (str.length == 0 || count == 0) {
      return '';
    } // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:


    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }

    var rpt = '';

    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }

      count >>>= 1;

      if (count == 0) {
        break;
      }

      str += str;
    } // Could we try:
    // return Array(count + 1).join(this);


    return rpt;
  };
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharedCtx = void 0;

function SharedCtx() {
  var data = {};

  this.getData = function (text) {
    return data[text];
  };

  this.setMatches = function (text, matches) {
    if (!data[text]) {
      data[text] = {};
    }

    data[text].cursor = 0;
    data[text].text = text;
    data[text].matches = matches;
  };

  this.setCallback = function (text, fn) {
    if (!data[text]) {
      data[text] = {
        fns: []
      };
    }

    data[text].fns.push(fn);
  };

  this.callback = function (text) {
    if (data[text] && data[text].fns) {
      data[text].fns.forEach(function (callable) {
        callable.call();
      });
    }
  };

  this.reset = function (text) {
    data[text] = null;
  };
}

var sharedCtx = new SharedCtx();
exports.sharedCtx = sharedCtx;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preserveStates = preserveStates;
exports.restoreStates = restoreStates;
exports.clearStates = clearStates;

var _index = require("../index");

var _underscore = require("./underscore");

var states = {};
var stateCounter = 0;

function preserveStates($node) {
  var $ = _index.R2L.getJquery();

  $node.find(':input').each(function () {
    var $this = $(this),
        index = $this.attr('data-state-id'),
        state = {
      props: {},
      attrs: {}
    };

    if (typeof index === 'undefined') {
      index = stateCounter++;
      $this.attr('data-state-id', index);
    } else {
      index = parseInt(index, 10);
    }

    _underscore._.each(['checked', 'disabled', 'readonly', 'value', 'defaultChecked', 'selected', 'selectedIndex', 'defaultSelected'], function (propName, propIndex) {
      state.props[propName] = $this.prop(propName);

      if (typeof $this.attr(propName) !== 'undefined') {
        state.attrs[propName] = $this.attr(propName);
      }
    });

    states[index] = state;
  });
}

;

function restoreStates($node) {
  var $ = _index.R2L.getJquery();

  $node.find(':input').each(function () {
    var $this = $(this),
        stateId = $this.attr('data-state-id');

    if (typeof stateId !== 'undefined') {
      $this.attr(states[stateId].attrs);
      $this.prop(states[stateId].props);
    }
  });
}

;

function clearStates() {
  states = {};
  stateCounter = 0;
}

},{"../index":4,"./underscore":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = void 0;

var shallowProperty = function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = shallowProperty('length');

var isArrayLike = function isArrayLike(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

var optimizeCb = function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };

    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };

    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }

  return function () {
    return func.apply(context, arguments);
  };
};

var _ = {
  each: function each(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;

    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = Object.keys(obj);

      for (i = 0, length = keys.length; i < length; i++) {
        if (obj.hasOwnProperty(keys[i])) {
          iteratee(obj[keys[i]], keys[i], obj);
        }
      }
    }

    return obj;
  },
  toString: Object.prototype.toString
};
exports._ = _;

_.each(['Arguments', 'Array', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function (type) {
  _['is' + type] = function (obj) {
    return _.toString.call(obj) === '[object ' + type + ']';
  };
});

_.now = Date.now || function () {
  return new Date().getTime();
};

_.throttle = function (func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var now = _.now();

    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};

_.intersect = function (a, b) {
  var t;
  if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter

  return a.filter(function (e) {
    return b.indexOf(e) > -1;
  });
};

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderSorter = orderSorter;
exports.resetTooltips = resetTooltips;
exports.hideTooltipHandler = hideTooltipHandler;
exports.repositionTooltipHandler = repositionTooltipHandler;
exports.showTooltipHandler = showTooltipHandler;
exports.addStyle = addStyle;
exports.getTriggers = getTriggers;
exports.bindTooltips = bindTooltips;
exports.positionHandler = void 0;

var _index = require("../index");

var _index2 = require("../formatters/index");

var _functions = require("../utils/functions");

var _base = require("../utils/base64");

var _index3 = require("../publication/index");

var _underscore = require("../utils/underscore");

var TOOLTIP_CLASS = ".ref2link-tooltip";

function orderSorter(left, right) {
  return left.order - right.order;
}

;

var alternativesUnion = function alternativesUnion(left, right) {
  var $ = _index.R2L.getJquery();

  var viewKeys = {},
      alternativeWalker = function alternativeWalker(_value, _key) {
    var viewKey = [_value.match, _value.rule.type, _value.view].join('-----');

    if (viewKeys.hasOwnProperty(viewKey)) {
      return;
    }

    viewKeys[viewKey] = _value;
  };

  _underscore._.each(left, alternativeWalker);

  _underscore._.each(right, alternativeWalker);

  return $.map(viewKeys, function (alternative) {
    return alternative;
  }).sort(orderSorter);
};

var stopEvent = function stopEvent(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  ev.stopImmediatePropagation();
  return false;
};

function resetTooltips() {
  //reinitialize tooltips
  $(_index.R2L.settings["class"]).data('tooltip', null);
  $(TOOLTIP_CLASS).remove();
}

function hideTooltipHandler() {
  var $ = _index.R2L.getJquery();

  $(document).find(TOOLTIP_CLASS).each(function (index, el) {
    $(el).hide();
  });
}

;

function repositionTooltipHandler($el, $tooltip) {
  var zIndex = 1,
      offset = $el.offset();
  $el.parents().each(function () {
    zIndex = Math.max(parseInt($(this).css('z-index').replace(/\D+/g, ''), 10) || 1, zIndex);
  });
  $tooltip.css({
    zIndex: zIndex + 100,
    top: offset.top + $el.height(),
    left: offset.left
  });
}

;

var positionHandler = function positionHandler() {
  var $ = _index.R2L.getJquery();

  $(TOOLTIP_CLASS).each(function () {
    var $tooltip = $(this),
        $el = $tooltip.data('ref2link');
    repositionTooltipHandler($el, $tooltip);
  });
};

exports.positionHandler = positionHandler;

function showTooltipHandler(ev) {
  var $ = _index.R2L.getJquery();

  var $target = $(ev.target);
  var $tooltip;

  if ($target.attr('title')) {
    $target.data('_title', $target.attr('title'));
  }

  if (_index.R2L.options.tooltipTrigger === 'notooltip') {
    $target.attr('title', $target.data('_title'));
    return;
  }

  var $self = $(ev.target).closest(_index.R2L.settings["class"] + ', ' + TOOLTIP_CLASS).parents(_index.R2L.settings["class"] + ', ' + TOOLTIP_CLASS).last();

  if (!$self.length) {
    $self = $(ev.target).closest(_index.R2L.settings["class"] + ', ' + TOOLTIP_CLASS);
  }

  if ($self.is(TOOLTIP_CLASS)) {
    $self = $self.data('ref2link');
    $tooltip = $self.data('tooltip');
  }

  var ref2link = $self.getRef2linkMatch();

  if (!ref2link.alternatives) {
    return;
  }

  $tooltip = $self.data('tooltip');
  var alternatives = alternativesUnion(ref2link.alternatives, []);

  if (alternatives.length < 1 && 'view' == (_index.R2L.options.mode || _index.R2L.viewOptions.mode)) {
    return;
  }

  alternatives.sort(orderSorter);
  hideTooltipHandler();

  if ($tooltip && $tooltip.length) {
    $target.removeAttr('title');
    repositionTooltipHandler($self, $tooltip);
    $tooltip.show();
    return;
  }

  ref2link = Object.assign({}, ref2link);
  $tooltip = $((0, _functions.simpleParse)(_index.R2L.options.tooltip || _index.R2L.viewOptions.tooltip, ref2link));
  var $table = $tooltip.find('.table');
  var lastRule = null,
      lastMatch = null,
      renderedViews = [],
      hasRows = false;
  var attributes = (0, _index2.extractAttributes)(ref2link.views);

  _underscore._.each(alternatives, function (_alternative) {
    if (_alternative.viewName === "table") {
      return;
    }

    var viewKey = [_alternative.rule.rulelibelle, _alternative.view].join('-----');

    if (renderedViews.indexOf(viewKey) >= 0) {
      return;
    }

    var tpl,
        $row,
        $view = $(_alternative.view),
        $viewLink = $view.is(_index.R2L.settings.classSimple) ? $view : $view.find(_index.R2L.settings.classSimple);

    if (!lastMatch) {
      lastMatch = _alternative.reference;
    }

    if (_alternative.reference !== lastMatch) {
      var $subtooltip = $((0, _functions.simpleParse)(_index.R2L.options.tooltip || _index.R2L.viewOptions.tooltip, _alternative));
      $table = $subtooltip.find('.table');
      $tooltip.append($table);
      lastRule = null;
      lastMatch = _alternative.match;
    }

    var id = attributes["data-ref-celex"] || attributes["data-ref-ecli"] || attributes["data-ref-eli"] || attributes["data-ref-finlex-eli"];
    var metadata = id ? _index3.Publication.getMetadataById(id) : null;

    if (_alternative.rule.rulelibelle !== lastRule) {
      tpl = _index.R2L.options.ruleHeading || _index.R2L.viewOptions.ruleHeading;
      $row = $((0, _functions.simpleParse)(tpl, {
        rulelibelle: _alternative.rule.rulelibelle,
        match: ref2link.reference,
        force: metadata && metadata.force ? metadata.force.value : "",
        title: metadata ? String(metadata.title.value).replace(/#/g, "<br>") : ref2link.reference,
        date: metadata ? metadata.date.value : ""
      }));
      $table.append($row);
      lastRule = _alternative.rule.rulelibelle;
    }

    tpl = _index.R2L.options.rule || _index.R2L.viewOptions.rule;
    var title = $viewLink.attr('title');
    var href = $viewLink.attr('href') || $viewLink.find("a").attr('href');
    var selfHref = $self.attr('href') || $self.find("a").attr('href');

    if (title) {
      hasRows = _alternative;
      $row = $((0, _functions.simpleParse)(tpl, {
        title: title,
        href: href
      }));
      $row.data('alternative', _alternative);

      if (href == selfHref && $viewLink.html() == $self.html()) {
        if ($row.is('.active-indicator')) {
          $row.addClass('active').attr('title', 'Current link');
        }
      }

      $table.append($row);
      renderedViews.push(viewKey);
    }
  });

  if ('edit' == (_index.R2L.options.mode || _index.R2L.viewOptions.mode)) {
    hasRows = true;
    var $row = $((0, _functions.simpleParse)(_index.R2L.options.rule, {
      title: 'No link',
      href: ''
    }));
    $row.attr('title', 'Remove link');
    $table.append($row.removeClass('active-indicator').attr('data-action', 'remove'));
  }

  if (!hasRows) {
    return;
  }

  $tooltip.on('click', '[data-action]', function (ev) {
    var $this = $(this),
        $row = $this.closest('.row'),
        alternative = $row.length ? $row.data('alternative') : {},
        $view = alternative ? $(alternative.view) : $(''),
        $viewLink = $view.is(_index.R2L.settings.classSimple) ? $view : $view.find(_index.R2L.settings.classSimple),
        action = $this.attr('data-action');
    var href = $viewLink.attr('href') || $viewLink.find("a").attr('href');
    var selfHref = $self.attr('href') || $self.find("a").attr('href');

    switch (action) {
      case 'preview':
        if ($viewLink.length) {
          window.open(href);
        }

        break;

      case 'use':
        if ($view.length) {
          $self.setAlternative(alternative);
          $tooltip.hide();
        }

        break;

      case 'default-preview':
        window.open(selfHref);
        break;

      case 'remove':
        $self.removeReference();
        break;

      case 'close':
        $tooltip.hide();
        break;
    }

    hideTooltipHandler();
    return stopEvent(ev);
  });
  $target.attr('title', '');
  repositionTooltipHandler($self, $tooltip);
  $('body').append($tooltip);
  $self.data('tooltip', $tooltip);
  $tooltip.data('tooltip', $tooltip);
  $tooltip.data('ref2link', $self);
}

;

function addStyle(styleText, styleName) {
  var $ = _index.R2L.getJquery();

  var styleFileName = styleName.split('/').pop()
  /** filename */
  .split('?').shift()
  /** strip query string */
  .replace('ref2link-', ''),

  /** ref2link version of some common packages */
  unMinifiedStyleFileName = styleFileName.replace('.min', '');
  /** attempt to see if the style is already loaded and if not so add the style to the page */

  if (!$('link[href*="' + styleFileName + '"]').length && !$('link[href*="' + unMinifiedStyleFileName + '"]').length && styleText) {
    $('head').append($('<style type="text/css"></style>').html(styleText));
  }
}

;

function getTriggers() {
  return {
    'mouseenter': {
      show: ['mouseenter', _index.R2L.settings["class"] + ', ' + TOOLTIP_CLASS, showTooltipHandler],
      hide: ['mouseleave', _index.R2L.settings["class"] + ', ' + TOOLTIP_CLASS, hideTooltipHandler]
    },
    'notooltip': {
      show: null,
      hide: null
    }
  };
}

;

function bindTooltips(R2L) {
  R2L.bindTooltips = function () {
    if (this.options.tooltipTrigger === 'notooltip' || this.initialized) {
      return this;
    }

    var $ = this.getJquery();
    this.initialized = true;
    this.resetFilters();
    var cssMap = {};

    try {
      cssMap = JSON.parse(R2L.getConstant("R2L_CSS_MAP"));
    } catch (e) {
      console.error(e);
    }

    for (var cssIndex in cssMap) {
      addStyle(_base.Base64.decode(cssMap[cssIndex]), cssIndex); // css injection
    }

    var trigger = this.triggers[this.options.tooltipTrigger || this.viewOptions.tooltipTrigger];
    var $selector = $(trigger.show[4] || trigger.selector || document);
    $selector.on.apply($selector, trigger.show);
    $selector.on.apply($selector, trigger.hide);
    $(window).off('resize', positionHandler).on('resize', positionHandler);
  };

  R2L.unbindTooltips = function () {
    var $ = this.getJquery();
    var trigger = this.triggers[this.options.tooltipTrigger || this.viewOptions.tooltipTrigger];
    var $selector = $(trigger.show[4] || trigger.selector || document);
    $selector.off.apply($selector, trigger.show);
    $selector.off.apply($selector, trigger.hide);
    $(window).off('resize', positionHandler);
  };

  R2L.bindTooltips();
}

;

},{"../formatters/index":3,"../index":4,"../publication/index":6,"../utils/base64":10,"../utils/functions":12,"../utils/underscore":18}],20:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],21:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('nodejs.util.inspect.custom')
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

}).call(this,require("buffer").Buffer)
},{"base64-js":20,"buffer":21,"ieee754":22}],22:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[1]);

//ADDED FOR LEOS LOADING: START
    define(function (require, exports) {
        $ = require('jquery');
        // nothing to export really as it's jQuery plugin
    });
})(jQuery, window, typeof define === 'function' && define.amd ? define : function (factory) {
    if (typeof exports !== 'undefined') {
        factory(require, exports);
    }
});
//ADDED FOR LEOS LOADING: END