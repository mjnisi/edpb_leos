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

var redux = require('redux');
// `.default` is needed because 'redux-thunk' is built as an ES2015 module
var thunk = require('redux-thunk').default;

var annotations = require('../annotations');
var fixtures = require('../../../test/annotation-fixtures');
var util = require('../../util');
var unroll = require('../../../../shared/test/util').unroll;

var { actions, selectors } = annotations;

/**
 * Create a Redux store which only handles annotation actions.
 */
function createStore() {
  // Thunk middleware is needed for the ADD_ANNOTATIONS action.
  var enhancer = redux.applyMiddleware(thunk);
  var reducer = util.createReducer(annotations.update);
  return redux.createStore(reducer, annotations.init(), enhancer);
}

// Tests for most of the functionality in reducers/annotations.js are currently
// in the tests for the whole Redux store

describe('annotations reducer', function () {
  describe('#savedAnnotations', function () {
    var savedAnnotations = selectors.savedAnnotations;

    it('returns annotations which are saved', function () {
      var state = {
        annotations: [fixtures.newAnnotation(), fixtures.defaultAnnotation()],
      };
      assert.deepEqual(savedAnnotations(state), [fixtures.defaultAnnotation()]);
    });
  });

  describe('#findIDsForTags', function () {
    var findIDsForTags = selectors.findIDsForTags;

    it('returns the IDs corresponding to the provided local tags', function () {
      var ann = fixtures.defaultAnnotation();
      var state = {
        annotations: [Object.assign(ann, {$tag: 't1'})],
      };
      assert.deepEqual(findIDsForTags(state, ['t1']), [ann.id]);
    });

    it('does not return IDs for annotations that do not have an ID', function () {
      var ann = fixtures.newAnnotation();
      var state = {
        annotations: [Object.assign(ann, {$tag: 't1'})],
      };
      assert.deepEqual(findIDsForTags(state, ['t1']), []);
    });
  });

  describe('#getAnnotationCount', () => {
    it('returns 0 if no annotations are present', () => {
      const state = {
        annotations: [],
      };
      assert.equal(selectors.getAnnotationCount(state), 0);
    });

    it('returns 1 if 1 annotation are present', () => {
      const annotation = fixtures.newAnnotation();
      const state = {
        annotations: [annotation],
      };
      assert.equal(selectors.getAnnotationCount(state), 1);
    });

    it('returns 3 if 3 annotations are present', () => {
      const annotation = fixtures.newAnnotation();
      const state = {
        annotations: [annotation, annotation, annotation],
      };
      assert.equal(selectors.getAnnotationCount(state), 3);
    });
  });

  describe('#hideAnnotation', function () {
    it('sets the `hidden` state to `true`', function () {
      var store = createStore();
      var ann = fixtures.moderatedAnnotation({ hidden: false });

      store.dispatch(actions.addAnnotations([ann]));
      store.dispatch(actions.hideAnnotation(ann.id));

      var storeAnn = selectors.findAnnotationByID(store.getState(), ann.id);
      assert.equal(storeAnn.hidden, true);
    });
  });

  describe('#unhideAnnotation', function () {
    it('sets the `hidden` state to `false`', function () {
      var store = createStore();
      var ann = fixtures.moderatedAnnotation({ hidden: true });

      store.dispatch(actions.addAnnotations([ann]));
      store.dispatch(actions.unhideAnnotation(ann.id));

      var storeAnn = selectors.findAnnotationByID(store.getState(), ann.id);
      assert.equal(storeAnn.hidden, false);
    });
  });

  describe('#updateFlagStatus', function () {
    unroll('updates the flagged status of an annotation', function (testCase) {
      var store = createStore();
      var ann = fixtures.defaultAnnotation();
      ann.flagged = testCase.wasFlagged;
      ann.moderation = testCase.oldModeration;

      store.dispatch(actions.addAnnotations([ann]));
      store.dispatch(actions.updateFlagStatus(ann.id, testCase.nowFlagged));

      var storeAnn = selectors.findAnnotationByID(store.getState(), ann.id);
      assert.equal(storeAnn.flagged, testCase.nowFlagged);
      assert.deepEqual(storeAnn.moderation, testCase.newModeration);
    }, [{
      // Non-moderator flags annotation
      wasFlagged: false,
      nowFlagged: true,
      oldModeration: undefined,
      newModeration: undefined,
    }, {
      // Non-moderator un-flags annotation
      wasFlagged: true,
      nowFlagged: false,
      oldModeration: undefined,
      newModeration: undefined,
    },{
      // Moderator un-flags an already unflagged annotation
      wasFlagged: false,
      nowFlagged: false,
      oldModeration: { flagCount: 1 },
      newModeration: { flagCount: 1 },
    },{
      // Moderator flags an already flagged annotation
      wasFlagged: true,
      nowFlagged: true,
      oldModeration: { flagCount: 1 },
      newModeration: { flagCount: 1 },
    },{
      // Moderator flags annotation
      wasFlagged: false,
      nowFlagged: true,
      oldModeration: { flagCount: 0 },
      newModeration: { flagCount: 1 },
    },{
      // Moderator un-flags annotation
      wasFlagged: true,
      nowFlagged: false,
      oldModeration: { flagCount: 1 },
      newModeration: { flagCount: 0 },
    }]);
  });
});
