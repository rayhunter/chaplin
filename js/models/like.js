var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['mediator', 'models/model'], function(mediator, Model) {
  'use strict';
  var Like;
  return Like = (function(_super) {

    __extends(Like, _super);

    function Like() {
      this.processLike = __bind(this.processLike, this);
      Like.__super__.constructor.apply(this, arguments);
    }

    Like.prototype.initialize = function(attributes, options) {
      Like.__super__.initialize.apply(this, arguments);
      if (options && options.loadDetails) {
        _(this).extend($.Deferred());
        return this.getLike();
      }
    };

    Like.prototype.getLike = function() {
      var provider, user;
      user = mediator.user;
      if (!user) return;
      provider = user.get('provider');
      if (provider.name !== 'facebook') return;
      this.trigger('loadStart');
      return provider.getInfo(this.id, this.processLike);
    };

    Like.prototype.processLike = function(response) {
      this.trigger('load');
      this.set(response);
      return this.resolve();
    };

    return Like;

  })(Model);
});
