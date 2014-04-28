// Generated by CoffeeScript 1.6.3
(function() {
  var Sync,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Sync = (function() {
    Sync.prototype.shouldListen = true;

    Sync.prototype.prev = [33, 37, 38];

    Sync.prototype.next = [9, 32, 34, 39, 40];

    Sync.prototype.path = "/advance";

    Sync.prototype.server = "http://localhost:9292/faye";

    function Sync() {
      this.recieveMessage = __bind(this.recieveMessage, this);
      this.checkKey = __bind(this.checkKey, this);
      document.onkeyup = this.checkKey;
      this.client = new Faye.Client(this.server);
      this.subscription = this.client.subscribe(this.path, this.recieveMessage);
    }

    Sync.prototype.checkKey = function(e) {
      var _ref, _ref1;
      if (_ref = e.keyCode, __indexOf.call(this.next, _ref) >= 0) {
        return this.sendMessage("next");
      } else if (_ref1 = e.keyCode, __indexOf.call(this.prev, _ref1) >= 0) {
        return this.sendMessage("previous");
      }
    };

    Sync.prototype.sendMessage = function(message) {
      this.shouldListen = false;
      return this.client.publish(this.path, {
        action: message
      });
    };

    Sync.prototype.recieveMessage = function(message) {
      if (!this.shouldListen) {
        return;
      }
      if (message.action === "next") {
        impress().next();
      } else if (message.action === "previous") {
        impress().prev();
      }
      return this.shouldIListen = true;
    };

    return Sync;

  })();

  if (typeof Faye !== "undefined" && Faye !== null) {
    window.sync = new Sync();
  }

}).call(this);