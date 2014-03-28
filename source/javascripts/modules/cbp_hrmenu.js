var cbpHorizontalMenu = (function() {
  var b,g,c,d,self = this;
  function f(el) {
    self.$el = $(el);
    console.log(self.$el);
    self.b = self.$el.find("> ul > li"),
    self.g = self.b.children("a"),
    self.c = $("body"),
    self.d = -1;
    self.g.on("click", a);
    self.b.on("click", function(h) {h.stopPropagation() })
  }

  function a(j) {
    if (self.d !== -1) {
      self.b.eq(self.d).removeClass("cbp-hropen")
    }
    var i = $(j.currentTarget).parent("li"),
      h = i.index();
    if (self.d === h) {
      i.removeClass("cbp-hropen");
      self.d = -1
    } else {
      i.addClass("cbp-hropen");
      self.d = h;
      self.c.off("click").on("click", e)
    }
    return false
  }

  function e(h) {
    self.b.eq(d).removeClass("cbp-hropen");
    self.d = -1
  }
  return {
    init: f
  }
})();

$.fn.cbpHorizontalMenu = function(){
  cbpHorizontalMenu.init(this);
  return this;
}
