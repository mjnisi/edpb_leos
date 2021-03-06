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

var groupList = require('../group-list');
var util = require('../../directive/test/util');

var groupFixtures = require('../../test/group-fixtures');

describe('groupList', function () {
  var $window;

  var PRIVATE_GROUP_LINK = 'https://hypothes.is/groups/hdevs';
  var OPEN_GROUP_LINK = 'https://hypothes.is/groups/pub';
  var RESTRICTED_GROUP_LINK = 'https://hypothes.is/groups/restricto';

  var groups;
  var fakeGroups;
  var fakeAnalytics;
  var fakeServiceUrl;
  var fakeSettings;

  before(function() {
    angular.module('app', [])
      .component('groupList', groupList)
      .factory('groups', function () {
        return fakeGroups;
      });
  });

  beforeEach(function () {

    fakeAnalytics = {
      track: sinon.stub(),
      events: {
        GROUP_LEAVE: 'groupLeave',
        GROUP_SWITCH: 'groupSwitch',
        GROUP_VIEW_ACTIVITY: 'groupViewActivity',
      },
    };

    fakeServiceUrl = sinon.stub();
    fakeSettings = {
      authDomain: 'example.com',
    };

    angular.mock.module('app', {
      analytics: fakeAnalytics,
      serviceUrl: fakeServiceUrl,
      settings: fakeSettings,
    });
  });

  beforeEach(angular.mock.inject(function (_$window_) {
    $window = _$window_;

    groups = [{
      id: 'public',
      links: {
        html: OPEN_GROUP_LINK,
      },
      name: 'Public Group',
      organization: groupFixtures.defaultOrganization(),
      type: 'open',
    },{
      id: 'h-devs',
      links: {
        html: PRIVATE_GROUP_LINK,
      },
      name: 'Hypothesis Developers',
      organization: groupFixtures.defaultOrganization(),
      type: 'private',
    }, {
      id: 'restricto',
      links: {
        html: RESTRICTED_GROUP_LINK,
      },
      name: 'Hello Restricted',
      organization: groupFixtures.defaultOrganization(),
      type: 'restricted',
    }];

    fakeGroups = {
      all: function () {
        return groups;
      },
      get: function (id) {
        var match = this.all().filter(function (group) {
          return group.id === id;
        });
        return match.length > 0 ? match[0] : undefined;
      },
      leave: sinon.stub(),
      focus: sinon.stub(),
      focused: sinon.stub(),
    };
  }));

  function createGroupList({ userid } = { userid: 'acct:person@example.com' }) {
    return util.createDirective(document, 'groupList', {
      auth: {
        status: userid ? 'logged-in' : 'logged-out',
        userid,
      },
    });
  }

  it('should render groups', function () {
    var element = createGroupList();
    var groupItems = element.find('.group-item');
    assert.equal(groupItems.length, groups.length + 1);
  });

  /**it('should render appropriate group name link title per group type', function() {
    var element = createGroupList();
    var nameLinks = element.find('.group-name-link');
    assert.equal(nameLinks.length, groups.length + 1);

    assert.include(nameLinks[0].title, 'Show public annotations'); // Open
    assert.include(nameLinks[1].title, 'Show and create annotations in'); // Private
    assert.include(nameLinks[2].title, 'Show public annotations'); // Restricted
  });*/ //LEOS Share links are hidden
/**
  it('should render organization logo for focused group', function () {
    const org = groupFixtures.organization({ logo: 'http://www.example.com/foobar' });
    const group = groupFixtures.expandedGroup({
      organization: org,
    });
    fakeGroups.focused = () => { return group; };

    const element = createGroupList();
    const imgEl = element.find('.dropdown-toggle > img.group-list-label__icon');

    assert.equal(imgEl[0].src, org.logo);
  });

  it('should render fallback icon for focused group when no logo (private)', function () {
    const org = groupFixtures.organization({ logo: null });
    const group = groupFixtures.expandedGroup({
      organization: org,
      type: 'private',
    });
    fakeGroups.focused = () => { return group; };

    const element = createGroupList();
    const iconEl = element.find('.dropdown-toggle > i.h-icon-group');

    assert.ok(iconEl[0]);
  });

  it('should render fallback icon for focused group when no logo (restricted)', function () {
    const org = groupFixtures.organization({ logo: null });
    const group = groupFixtures.expandedGroup({
      organization: org,
      type: 'restricted',
    });
    fakeGroups.focused = () => { return group; };

    const element = createGroupList();
    const iconEl = element.find('.dropdown-toggle > i.h-icon-public');

    assert.ok(iconEl[0]);
  });

  it('should render fallback icon for focused group when no logo (open)', function () {
    const org = groupFixtures.organization({ logo: null });
    const group = groupFixtures.expandedGroup({
      organization: org,
      type: 'open',
    });
    fakeGroups.focused = () => { return group; };

    const element = createGroupList();
    const iconEl = element.find('.dropdown-toggle > i.h-icon-public');

    assert.ok(iconEl[0]);
  });

  it('should render organization icons for first group in each organization', function () {
    const orgs = [
      groupFixtures.defaultOrganization(),
      groupFixtures.organization(),
    ];
    groups = [
      groupFixtures.expandedGroup({ organization: orgs[0] }),
      groupFixtures.expandedGroup({ organization: orgs[0] }),
      groupFixtures.expandedGroup({ organization: orgs[1] }),
      groupFixtures.expandedGroup({ organization: orgs[1] }),
    ];

    const element = createGroupList();
    const iconContainers = element.find('.group-menu-icon-container');
    const iconImages = element.find('.group-menu-icon-container > img');

    assert.lengthOf(iconContainers, groups.length);
    assert.lengthOf(iconImages, orgs.length);
  });

  it('should not render organization icons for menu groups if missing', function () {
    const orgs = [
      groupFixtures.organization({ logo: null }),
      groupFixtures.organization({ logo: null }),
    ];
    groups = [
      groupFixtures.expandedGroup({ organization: orgs[0] }),
      groupFixtures.expandedGroup({ organization: orgs[0] }),
      groupFixtures.expandedGroup({ organization: orgs[1] }),
      groupFixtures.expandedGroup({ organization: orgs[1] }),
    ];

    const element = createGroupList();
    const iconContainers = element.find('.group-menu-icon-container');
    const iconImages = element.find('.group-menu-icon-container > img');

    assert.lengthOf(iconContainers, groups.length);
    assert.lengthOf(iconImages, 0);
  });

  it('should render share links', function () {
    var element = createGroupList();
    var shareLinks = element.find('.share-link-container');
    assert.equal(shareLinks.length, groups.length);

    var link = element.find('.share-link');
    assert.equal(link.length, groups.length);

    assert.equal(link[0].href, OPEN_GROUP_LINK);
    assert.equal(link[1].href, PRIVATE_GROUP_LINK);
    assert.equal(link[2].href, RESTRICTED_GROUP_LINK);
  });

  it('should not render share links if they are not present', function () {
    groups = [
      {
        type: 'private',
      },
      {
        id: 'anOpenGroup',
        type: 'open',
        links: {},
      },
    ];
    var element = createGroupList();
    var links = element.find('.share-link-container');
    assert.equal(links.length, 0);
  });

  [{
    // Logged-in third party user.
    firstPartyAuthDomain: 'example.com',
    authDomain: 'publisher.org',
    userid: 'acct:person@publisher.org',
  },{
    // Logged-out third party user.
    firstPartyAuthDomain: 'example.com',
    authDomain: 'publisher.org',
    userid: null,
  }].forEach(({ firstPartyAuthDomain, authDomain, userid }) => {
    it('should not render share links for third-party groups', () => {
      fakeSettings.authDomain = firstPartyAuthDomain;
      fakeSettings.services = [{
        authority: authDomain,
      }];

      var element = createGroupList({ userid });
      var shareLinks = element.find('.share-link-container');

      assert.equal(shareLinks.length, 0);
    });
  });

  it('should track metrics when a user attempts to view a groups activity', function () {
    var element = createGroupList();
    var link = element.find('.share-link');
    link.click();
    assert.calledWith(fakeAnalytics.track, fakeAnalytics.events.GROUP_VIEW_ACTIVITY);
  });

  function clickLeaveIcon(element, acceptPrompt) {
    var leaveLink = element.find('.h-icon-cancel-outline');

    // accept prompt to leave group
    $window.confirm = function () {
      return acceptPrompt;
    };
    leaveLink.click();
  }

  it('should leave group when the leave icon is clicked', function () {
    var element = createGroupList();
    clickLeaveIcon(element, true);
    assert.ok(fakeGroups.leave.calledWith('h-devs'));
    assert.calledWith(fakeAnalytics.track, fakeAnalytics.events.GROUP_LEAVE);
  });

  it('should not leave group when confirmation is dismissed', function () {
    var element = createGroupList();
    clickLeaveIcon(element, false);
    assert.notCalled(fakeGroups.leave);
    assert.notCalled(fakeAnalytics.track);
  });

  it('should not change the focused group when leaving', function () {
    var element = createGroupList();
    clickLeaveIcon(element, true);
    assert.notCalled(fakeGroups.focus);
    assert.calledWith(fakeAnalytics.track, fakeAnalytics.events.GROUP_LEAVE);
  });
  */ //LEOS leave group icon is hidden
  it('should change current group focus when click another group', function () {
    var element = createGroupList();
    var groupItems = element.find('.group-item');

    // click the second group
    groupItems[1].click();

    assert.calledOnce(fakeGroups.focus);
    assert.calledWith(fakeAnalytics.track, fakeAnalytics.events.GROUP_SWITCH);
  });

  it('should open a window when "New Group" is clicked', function () {
    fakeServiceUrl
      .withArgs('groups.new')
      .returns('https://test.hypothes.is/groups/new');

    var element = createGroupList();
    $window.open = sinon.stub();

    var newGroupLink =
      element[0].querySelector('.new-group-btn a');
    angular.element(newGroupLink).click();
    assert.calledWith($window.open, 'https://test.hypothes.is/groups/new',
      '_blank');
  });
});
