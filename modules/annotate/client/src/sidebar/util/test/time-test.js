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

var time = require('../time');

var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var month = day * 30;
var year = day * 365;

var FIXTURES_TO_FUZZY_STRING = [
  [10, 'Just now'],
  [29, 'Just now'],
  [49, '49 secs'],
  [minute + 5, '1 min'],
  [3 * minute + 5, '3 mins'],
  [hour, '1 hr'],
  [4 * hour, '4 hrs'],
  [27 * hour, '1 Jan'],
  [3 * day + 30 * minute, '1 Jan'],
  [6 * month + 2 * day, '1 Jan'],
  [1 * year, '1 Jan 1970'],
  [1 * year + 2 * month, '1 Jan 1970'],
  [2 * year, '1 Jan 1970'],
  [8 * year, '1 Jan 1970'],
];

var FIXTURES_NEXT_FUZZY_UPDATE = [
  [10, 5], // we have a minimum of 5 secs
  [29, 5],
  [49, 5],
  [minute + 5, minute],
  [3 * minute + 5, minute],
  [4 * hour, hour],
  [27 * hour, null],
  [3 * day + 30 * minute, null],
  [6 * month + 2 * day, null],
  [8 * year, null],
];

describe('sidebar.util.time', function () {

  beforeEach(function () {
    sinon.useFakeTimers();

    // Ensure that the current local date is 01/01/1970, as this is assumed by
    // test expectations
    var offset = new Date().getTimezoneOffset();
    if (offset > 0) {
      sinon.clock.tick(offset * 60 * 1000);
    }
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('.toFuzzyString', function () {

    function mockIntl() {
      return {
        DateTimeFormat: function () {
          return {
            format: function () {
              if (new Date().getYear() === 70) {
                return '1 Jan';
              } else {
                return '1 Jan 1970';
              }
            },
          };
        },
      };
    }

    it('Handles empty dates', function () {
      var t = null;
      var expect = '';
      assert.equal(time.toFuzzyString(t, mockIntl()), expect);
    });

    var testFixture = function (f) {
      return function () {
        var t = new Date().toISOString();
        var expect = f[1];
        sinon.clock.tick(f[0] * 1000);
        assert.equal(time.toFuzzyString(t, mockIntl()), expect);
      };
    };

    for (var i = 0, f; i < FIXTURES_TO_FUZZY_STRING.length; i++) {
      f = FIXTURES_TO_FUZZY_STRING[i];
      it('creates correct fuzzy string for fixture ' + i,
        testFixture(f));
    }

    it('falls back to simple strings for >24hrs ago', function () {
      // If window.Intl is not available then the date formatting for dates
      // more than one day ago falls back to a simple date string.
      var d = new Date().toISOString();
      sinon.clock.tick(day * 2 * 1000);

      assert.equal(time.toFuzzyString(d, null), 'Thu Jan 01 1970');
    });

    it('falls back to simple strings for >1yr ago', function () {
      // If window.Intl is not available then the date formatting for dates
      // more than one year ago falls back to a simple date string.
      var d = new Date().toISOString();
      sinon.clock.tick(year * 2 * 1000);

      assert.equal(time.toFuzzyString(d, null), 'Thu Jan 01 1970');
    });

  });

  describe('.decayingInterval', function () {
    it('uses a short delay for recent timestamps', function () {
      var date = new Date();
      var callback = sinon.stub();
      time.decayingInterval(date, callback);
      sinon.clock.tick(6 * 1000);
      assert.calledWith(callback, date);
      sinon.clock.tick(6 * 1000);
      assert.calledTwice(callback);
    });

    it('uses a longer delay for older timestamps', function () {
      var date = new Date();
      var ONE_MINUTE = minute * 1000;
      sinon.clock.tick(10 * ONE_MINUTE);
      var callback = sinon.stub();
      time.decayingInterval(date, callback);
      sinon.clock.tick(ONE_MINUTE / 2);
      assert.notCalled(callback);
      sinon.clock.tick(ONE_MINUTE);
      assert.calledWith(callback, date);
      sinon.clock.tick(ONE_MINUTE);
      assert.calledTwice(callback);
    });

    it('returned function cancels the timer', function () {
      var date = new Date();
      var callback = sinon.stub();
      var cancel = time.decayingInterval(date, callback);
      cancel();
      sinon.clock.tick(minute * 1000);
      assert.notCalled(callback);
    });

    it('does not set a timeout for dates > 24hrs ago', function () {
      var date = new Date();
      var ONE_DAY = day * 1000;
      sinon.clock.tick(10 * ONE_DAY);
      var callback = sinon.stub();

      time.decayingInterval(date, callback);
      sinon.clock.tick(ONE_DAY * 2);

      assert.notCalled(callback);
    });
  });

  describe('.nextFuzzyUpdate', function () {
    it('Handles empty dates', function () {
      var t = null;
      var expect = null;
      assert.equal(time.nextFuzzyUpdate(t), expect);
    });

    var testFixture = function (f) {
      return function () {
        var t = new Date().toISOString();
        var expect = f[1];
        sinon.clock.tick(f[0] * 1000);
        assert.equal(time.nextFuzzyUpdate(t), expect);
      };
    };

    for (var i = 0, f; i < FIXTURES_NEXT_FUZZY_UPDATE.length; i++) {
      f = FIXTURES_NEXT_FUZZY_UPDATE[i];
      it('gives correct next fuzzy update time for fixture ' + i,
        testFixture(f));
    }
  });
});
