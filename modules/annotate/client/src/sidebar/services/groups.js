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
/**
 * @ngdoc service
 * @name  groups
 *
 * @description Provides access to the list of groups that the user is currently
 *              a member of and the currently selected group in the UI.
 *
 *              The list of groups is initialized from the session state
 *              and can then later be updated using the add() and remove()
 *              methods.
 */
'use strict';

let STORAGE_KEY = 'hypothesis.groups.focus';
//LEOS Change
let DEFAULT_GROUP = "__world__";

let events = require('../events');
let { awaitStateChange } = require('../util/state-util');
let serviceConfig = require('../service-config');
let SYSTEM_IDS = require('../../../leos/shared/system-id');

// @ngInject
function groups($rootScope, store, api, isSidebar, localStorage, serviceUrl, session,
                settings) {
  let documentUri;

  let svc = serviceConfig(settings);
  let authority = svc ? svc.authority : null;

  function getDefaultGroupId() {
    return DEFAULT_GROUP;
  }

  function getDocumentUriForGroupSearch() {
    function mainUri() {
      let uris = store.searchUris();
      if (uris.length === 0) {
        return null;
      }

      // We get the first HTTP URL here on the assumption that group scopes must
      // be domains (+paths)? and therefore we need to look up groups based on
      // HTTP URLs (so eg. we cannot use a "file:" URL or PDF fingerprint).
      return uris.find(uri => uri.startsWith('http'));
    }
    return awaitStateChange(store, mainUri);
  }

  /**
   * Fetch the list of applicable groups from the API.
   *
   * The list of applicable groups depends on the current userid and the URI of
   * the attached frames.
   */
  function load() {
    let uri = Promise.resolve(null);
    if (isSidebar) {
      uri = getDocumentUriForGroupSearch();
    }
    return uri.then(uri => {
      let params = {
        expand: 'organization',
      };
      if (authority) {
        params.authority = authority;
      }
      if (uri) {
        params.document_uri = uri;
      }
      return api.groups.list(params);
    }).then(gs => {
      let isFirstLoad = store.allGroups().length === 0;

      store.loadGroups(gs);
      if (isFirstLoad) {
        let prevFocusedGroup = localStorage.getItem(STORAGE_KEY);
        if (prevFocusedGroup === null && authority === SYSTEM_IDS.ISC) {
          prevFocusedGroup = settings.connectedEntity;
        }
        store.focusGroup(prevFocusedGroup);
      }

      return store.allGroups();
    });
  }

  function all() {
    return store.allGroups();
  }

  // Return the full object for the group with the given id.
  function get(id) {
    return store.getGroup(id);
  }

  /**
   * Leave the group with the given ID.
   * Returns a promise which resolves when the action completes.
   */
  function leave(id) {
    // The groups list will be updated in response to a session state
    // change notification from the server. We could improve the UX here
    // by optimistically updating the session state
    return api.group.member.delete({
      pubid: id,
      user: 'me',
    });
  }


  /** Return the currently focused group. If no group is explicitly focused we
   * will check localStorage to see if we have persisted a focused group from
   * a previous session. Lastly, we fall back to the first group available.
   */
  function focused() {
    return store.focusedGroup();
  }

  /** Set the group with the passed id as the currently focused group. */
  function focus(id) {
    store.focusGroup(id);
  }

  // Persist the focused group to storage when it changes.
  let prevFocusedId = store.focusedGroupId();
  store.subscribe(() => {
    let focusedId;
    if (authority === SYSTEM_IDS.ISC) {
      focusedId = settings.connectedEntity;
    } else {
      focusedId = store.focusedGroupId();
    }
    if (focusedId !== prevFocusedId) {
      prevFocusedId = focusedId;

      localStorage.setItem(STORAGE_KEY, focusedId);

      // Emit the `GROUP_FOCUSED` event for code that still relies on it.
      $rootScope.$broadcast(events.GROUP_FOCUSED, focusedId);
    }
  });

  // reset the focused group if the user leaves it
  $rootScope.$on(events.GROUPS_CHANGED, function () {
    // return for use in test
    return load();
  });

  // refetch the list of groups when user changes
  $rootScope.$on(events.USER_CHANGED, () => {
    // FIXME Makes a second api call on page load. better way?
    // return for use in test
    return load();
  });

  // refetch the list of groups when document url changes
  $rootScope.$on(events.FRAME_CONNECTED, () => {
    // FIXME Makes a third api call on page load. better way?
    // return for use in test
    return getDocumentUriForGroupSearch().then(uri => {
      if (documentUri !== uri) {
        documentUri = uri;
        return load();
      }
    });
  });

  return {
    all: all,
    get: get,

    leave: leave,
    load: load,

    focused: focused,
    focus: focus,

    //LEOS Change
    defaultGroupId : getDefaultGroupId
  };
}

module.exports = groups;
