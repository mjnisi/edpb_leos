/*
 * Copyright 2021 European Commission
 *
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *     https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and limitations under the Licence.
 */
'use strict';

var angular = require('angular');
var immutable = require('seamless-immutable');

var unroll = require('../../../shared/test/util').unroll;

var fixtures = immutable({
  annotations: [{
    $orphan: false,
    id: '1',
    references: [],
    target: [{selector: []}],
    text: 'first annotation',
    updated: 50,
    document: {},
  },{
    $orphan: false,
    id: '2',
    references: [],
    text: 'second annotation',
    target: [{selector: []}],
    updated: 200,
    document: {},
  },{
    $orphan: false,
    id: '3',
    references: ['2'],
    text: 'reply to first annotation',
    updated: 100,
    document: {},
  }],
});

describe('annotation threading', function () {
  var bridge;
  var store;
  var rootThread;

  beforeEach(function () {
    var fakeBridge = {};

    var fakeUnicode = {
      normalize: function (s) { return s; },
      fold: function (s) { return s; },
    };

    var fakeFeatures = {
      flagEnabled: sinon.stub().returns(true),
    };

    angular.module('app', [])
      .service('store', require('../../store'))
      .service('drafts', require('../../services/drafts'))
      .service('rootThread', require('../../services/root-thread'))
      .service('searchFilter', require('../../services/search-filter'))
      .service('viewFilter', require('../../services/view-filter'))
      .value('bridge', fakeBridge)
      .value('features', fakeFeatures)
      .value('settings', {})
      .value('unicode', fakeUnicode);

    angular.mock.module('app');

    angular.mock.inject(function (_store_, _rootThread_) {
      store = _store_;
      rootThread = _rootThread_;
    });
  });

  it('should display newly loaded annotations', function () {
    store.addAnnotations(fixtures.annotations);
    assert.equal(rootThread.thread(store.getState()).children.length, 2);
  });

  it('should not display unloaded annotations', function () {
    store.addAnnotations(fixtures.annotations);
    store.removeAnnotations(fixtures.annotations);
    assert.equal(rootThread.thread(store.getState()).children.length, 0);
  });

  it('should filter annotations when a search is set', function () {
    store.addAnnotations(fixtures.annotations);
    store.setFilterQuery('second');
    assert.equal(rootThread.thread(store.getState()).children.length, 1);
    assert.equal(rootThread.thread(store.getState()).children[0].id, '2');
  });

  unroll('should sort annotations by #mode', function (testCase) {
    store.addAnnotations(fixtures.annotations);
    store.setSortKey(testCase.sortKey);
    var actualOrder = rootThread.thread(store.getState()).children.map(function (thread) {
      return thread.annotation.id;
    });
    assert.deepEqual(actualOrder, testCase.expectedOrder);
  }, [{
    sortKey: 'Oldest',
    expectedOrder: ['1','2'],
  },{
    sortKey: 'Newest',
    expectedOrder: ['2','1'],
  }]);
});
