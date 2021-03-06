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

var Bridge = require('../bridge');
var RPC = require('../frame-rpc');

describe('shared.bridge', function() {
  var bridge;
  var createChannel;
  var fakeWindow;

  beforeEach(() => {
    bridge = new Bridge();

    createChannel = () => bridge.createChannel(fakeWindow, 'http://example.com', 'TOKEN');

    fakeWindow = {
      postMessage: sinon.stub(),
    };

    sinon.stub(window, 'addEventListener');
    sinon.stub(window, 'removeEventListener');
  });

  afterEach(() => sinon.restore());

  describe('#createChannel', function() {
    it('creates a new channel with the provided options', function() {
      var channel = createChannel();
      assert.equal(channel.src, window);
      assert.equal(channel.dst, fakeWindow);
      assert.equal(channel.origin, 'http://example.com');
    });

    it('adds the channel to the .links property', function() {
      var channel = createChannel();
      assert.isTrue(bridge.links.some(link => (link.channel === channel) && (link.window === fakeWindow)));
    });

    it('registers any existing listeners on the channel', function() {
      var message1 = sinon.spy();
      var message2 = sinon.spy();
      bridge.on('message1', message1);
      bridge.on('message2', message2);
      var channel = createChannel();
      assert.propertyVal(channel._methods, 'message1', message1);
      assert.propertyVal(channel._methods, 'message2', message2);
    });

    it('returns the newly created channel', function() {
      var channel = createChannel();
      assert.instanceOf(channel, RPC);
    });
  });

  describe('#call', function() {
    it('forwards the call to every created channel', function() {
      var channel = createChannel();
      sinon.stub(channel, 'call');
      bridge.call('method1', 'params1');
      assert.called(channel.call);
      assert.calledWith(channel.call, 'method1', 'params1');
    });

    it('provides a timeout', function(done) {
      var channel = createChannel();
      sinon.stub(channel, 'call');
      sinon.stub(window, 'setTimeout').yields();
      bridge.call('method1', 'params1', done);
    });

    it('calls a callback when all channels return successfully', function(done) {
      var channel1 = createChannel();
      var channel2 = bridge.createChannel(fakeWindow, 'http://example.com', 'NEKOT');
      sinon.stub(channel1, 'call').yields(null, 'result1');
      sinon.stub(channel2, 'call').yields(null, 'result2');

      var callback = function(err, results) {
        assert.isNull(err);
        assert.deepEqual(results, ['result1', 'result2']);
        done();
      };

      bridge.call('method1', 'params1', callback);
    });

    it('calls a callback with an error when a channels fails', function(done) {
      var error = new Error('Uh oh');
      var channel1 = createChannel();
      var channel2 = bridge.createChannel(fakeWindow, 'http://example.com', 'NEKOT');
      sinon.stub(channel1, 'call').throws(error);
      sinon.stub(channel2, 'call').yields(null, 'result2');

      var callback = function(err) {
        assert.equal(err, error);
        done();
      };

      bridge.call('method1', 'params1', callback);
    });

    it('destroys the channel when a call fails', function(done) {
      var channel = createChannel();
      sinon.stub(channel, 'call').throws(new Error(''));
      sinon.stub(channel, 'destroy');

      var callback = function() {
        assert.called(channel.destroy);
        done();
      };

      bridge.call('method1', 'params1', callback);
    });

    it('no longer publishes to a channel that has had an error', function(done) {
      var channel = createChannel();
      sinon.stub(channel, 'call').throws(new Error('oeunth'));
      bridge.call('method1', 'params1', function() {
        assert.calledOnce(channel.call);
        bridge.call('method1', 'params1', function() {
          assert.calledOnce(channel.call);
          done();
        });
      });
    });

    it('treats a timeout as a success with no result', function(done) {
      var channel = createChannel();
      sinon.stub(channel, 'call');
      sinon.stub(window, 'setTimeout').yields();
      bridge.call('method1', 'params1', function(err, res) {
        assert.isNull(err);
        assert.deepEqual(res, [null]);
        done();
      });
    });

    it('returns a promise object', function() {
      createChannel();
      var ret = bridge.call('method1', 'params1');
      assert.instanceOf(ret, Promise);
    });
  });

  describe('#on', function() {
    it('adds a method to the method registry', function() {
      createChannel();
      bridge.on('message1', sinon.spy());
      assert.isFunction(bridge.channelListeners.message1);
    });

    it('only allows registering a method once', function() {
      bridge.on('message1', sinon.spy());
      assert.throws(() => bridge.on('message1', sinon.spy()));
    });
  });

  describe('#off', () =>
    it('removes the method from the method registry', function() {
      createChannel();
      bridge.on('message1', sinon.spy());
      bridge.off('message1');
      assert.isUndefined(bridge.channelListeners.message1);
    })
  );

  describe('#onConnect', function() {
    it('adds a callback that is called when a channel is connected', function(done) {
      var channel;
      var callback = function(c, s) {
        assert.strictEqual(c, channel);
        assert.strictEqual(s, fakeWindow);
        done();
      };

      var data = {
        protocol: 'frame-rpc',
        method: 'connect',
        arguments: ['TOKEN'],
      };

      var event = {
        source: fakeWindow,
        origin: 'http://example.com',
        data,
      };

      addEventListener.yieldsAsync(event);
      bridge.onConnect(callback);
      channel = createChannel();
    });

    it('allows multiple callbacks to be registered', function(done) {
      var channel;
      var callbackCount = 0;
      var callback = (c, s) => {
        assert.strictEqual(c, channel);
        assert.strictEqual(s, fakeWindow);
        if (++callbackCount === 2) { done(); }
      };

      var data = {
        protocol: 'frame-rpc',
        method: 'connect',
        arguments: ['TOKEN'],
      };

      var event = {
        source: fakeWindow,
        origin: 'http://example.com',
        data,
      };

      addEventListener.callsArgWithAsync(1, event);
      bridge.onConnect(callback);
      bridge.onConnect(callback);
      channel = createChannel();
    });
  });

  describe('#destroy', () =>
    it('destroys all opened channels', function() {
      var channel1 = bridge.createChannel(fakeWindow, 'http://example.com', 'foo');
      var channel2 = bridge.createChannel(fakeWindow, 'http://example.com', 'bar');
      sinon.spy(channel1, 'destroy');
      sinon.spy(channel2, 'destroy');

      bridge.destroy();

      assert.called(channel1.destroy);
      assert.called(channel2.destroy);
    })
  );
});
