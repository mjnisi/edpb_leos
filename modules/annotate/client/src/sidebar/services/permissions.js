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

var STORAGE_KEY = 'hypothesis.privacy';

/**
 * Object defining which principals can read, update and delete an annotation.
 *
 * This is the same as the `permissions` field retrieved on an annotation via
 * the API.
 *
 * Principals are strings of the form `type:id` where `type` is `'acct'` (for a
 * specific user) or `'group'` (for a group).
 *
 * @typedef Permissions
 * @property {string[]} read - List of principals that can read the annotation
 * @property {string[]} update - List of principals that can edit the annotation
 * @property {string[]} delete - List of principals that can delete the
 * annotation
 */

/**
 * A service for generating and querying `Permissions` objects for annotations.
 *
 * It also provides methods to save and restore permissions preferences for new
 * annotations to local storage.
 */
// @ngInject
function Permissions(localStorage) {
  var self = this;

  function defaultLevel() {
    var savedLevel = localStorage.getItem(STORAGE_KEY);
    switch (savedLevel) {
    case 'private':
    case 'shared':
      return savedLevel;
    default:
      return 'shared';
    }
  }

  /**
   * Return the permissions for a private annotation.
   *
   * A private annotation is one which is readable only by its author.
   *
   * @param {string} userid - User ID of the author
   * @return {Permissions}
   */
  this.private = function (userid) {
    return {
      read: [userid],
      update: [userid],
      delete: [userid],
    };
  };

  /**
   * Return the permissions for an annotation that is shared with the given
   * group.
   *
   * @param {string} userid - User ID of the author
   * @param {string} groupId - ID of the group the annotation is being
   * shared with
   * @return {Permissions}
   */
  this.shared = function (userid, groupId) {
    return Object.assign(self.private(userid), {
      read: ['group:' + groupId],
    });
  };

  /**
   * Return the default permissions for an annotation in a given group.
   *
   * @param {string} userid - User ID of the author
   * @param {string} groupId - ID of the group the annotation is being shared
   * with
   * @return {Permissions}
   */
  this.default = function (userid, groupId) {
    if (defaultLevel() === 'private') {
      return self.private(userid);
    } else {
      return self.shared(userid, groupId);
    }
  };

  /**
   * Set the default permissions for new annotations.
   *
   * @param {'private'|'shared'} level
   */
  this.setDefault = function (level) {
    localStorage.setItem(STORAGE_KEY, level);
  };

  /**
   * Return true if an annotation with the given permissions is shared with any
   * group.
   *
   * @param {Permissions} perms
   * @return {boolean}
   */
  this.isShared = function (perms) {
    return perms.read.some(function (principal) {
      return principal.indexOf('group:') === 0;
    });
  };

  /**
   * Return true if a user can perform the given `action` on an annotation.
   *
   * @param {Permissions} perms
   * @param {'update'|'delete'} action
   * @param {string} userid
   * @return {boolean}
   */
  this.permits = function (perms, action, userid) {
    return perms[action].indexOf(userid) !== -1;
  };
}

module.exports = Permissions;
