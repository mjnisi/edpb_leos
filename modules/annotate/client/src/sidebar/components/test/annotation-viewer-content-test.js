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

// Fake implementation of the API for fetching annotations and replies to
// annotations.
function FakeApi(annots) {
  this.annots = annots;

  this.annotation = {
    get: function (query) {
      var result;
      if (query.id) {
        result = annots.find(function (a) {
          return a.id === query.id;
        });
      }
      return Promise.resolve(result);
    },
  };

  this.search = function (query) {
    var result;
    if (query.references) {
      result = annots.filter(function (a) {
        return a.references && a.references.indexOf(query.references) !== -1;
      });
    }
    return Promise.resolve({rows: result});
  };
}

describe('annotationViewerContent', function () {

  before(function () {
    angular.module('h', [])
      .component('annotationViewerContent',
        require('../annotation-viewer-content'));
  });

  beforeEach(angular.mock.module('h'));

  function createController(opts) {
    var locals = {
      $location: {},
      $routeParams: { id: 'test_annotation_id' },
      store: {
        setAppIsSidebar: sinon.stub(),
        setCollapsed: sinon.stub(),
        highlightAnnotations: sinon.stub(),
        subscribe: sinon.stub(),
      },
      api: opts.api,
      rootThread: {thread: sinon.stub()},
      streamer: {
        setConfig: function () {},
        connect: function () {},
      },
      streamFilter: {
        setMatchPolicyIncludeAny: function () {
          return {
            addClause: function () {
              return {
                addClause: function () {},
              };
            },
          };
        },
        getFilter: function () {},
      },
      annotationMapper: {
        loadAnnotations: sinon.spy(),
      },
    };

    var $componentController;
    angular.mock.inject(function (_$componentController_) {
      $componentController = _$componentController_;
    });
    locals.ctrl = $componentController('annotationViewerContent', locals, {
      search: {},
    });
    return locals;
  }

  describe('the standalone view for a top-level annotation', function () {
    it('loads the annotation and all replies', function () {
      var fakeApi = new FakeApi([
        {id: 'test_annotation_id'},
        {id: 'test_reply_id', references: ['test_annotation_id']},
      ]);
      var controller = createController({api: fakeApi});
      return controller.ctrl.ready.then(function () {
        assert.calledOnce(controller.annotationMapper.loadAnnotations);
        assert.calledWith(controller.annotationMapper.loadAnnotations,
          sinon.match(fakeApi.annots));
      });
    });

    it('does not highlight any annotations', function () {
      var fakeApi = new FakeApi([
        {id: 'test_annotation_id'},
        {id: 'test_reply_id', references: ['test_annotation_id']},
      ]);
      var controller = createController({api: fakeApi});
      return controller.ctrl.ready.then(function () {
        assert.notCalled(controller.store.highlightAnnotations);
      });
    });
  });

  describe('the standalone view for a reply', function () {
    it('loads the top-level annotation and all replies', function () {
      var fakeApi = new FakeApi([
        {id: 'parent_id'},
        {id: 'test_annotation_id', references: ['parent_id']},
      ]);
      var controller = createController({api: fakeApi});
      return controller.ctrl.ready.then(function () {
        assert.calledWith(controller.annotationMapper.loadAnnotations,
          sinon.match(fakeApi.annots));
      });
    });

    it('expands the thread', function () {
      var fakeApi = new FakeApi([
        {id: 'parent_id'},
        {id: 'test_annotation_id', references: ['parent_id']},
      ]);
      var controller = createController({api: fakeApi});
      return controller.ctrl.ready.then(function () {
        assert.calledWith(controller.store.setCollapsed, 'parent_id', false);
        assert.calledWith(controller.store.setCollapsed, 'test_annotation_id', false);
      });
    });

    it('highlights the reply', function () {
      var fakeApi = new FakeApi([
        {id: 'parent_id'},
        {id: 'test_annotation_id', references: ['parent_id']},
      ]);
      var controller = createController({api: fakeApi});
      return controller.ctrl.ready.then(function () {
        assert.calledWith(controller.store.highlightAnnotations,
          sinon.match(['test_annotation_id']));
      });
    });
  });
});
