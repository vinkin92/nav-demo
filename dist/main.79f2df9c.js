// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var _this = this;

var sitelist = $('.sitelist');
var $lastLi = sitelist.find('.last');
var siteName = $('.alert .siteName');
var siteURL = $('.alert .siteURL');
var data = localStorage.getItem('nav');
var objData = JSON.parse(data);
var pattern = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
var logo;
var hashMap = objData || [{
  logo: 'https://xiedaimala.com/favicon.ico',
  name: '写代码啦',
  url: 'https://xiedaimala.com/',
  sort: '',
  number: 1
}, {
  logo: 'https://www.baidu.com/favicon.ico',
  name: '爱奇艺',
  url: 'https://www.baidu.com/',
  sort: '',
  number: 2
}, {
  logo: 'https://www.bilibili.com/favicon.ico',
  name: '哔哩哔哩',
  url: 'https://www.bilibili.com',
  sort: '',
  number: 3
}, {
  logo: 'https://www.vip.com/favicon.ico',
  name: '唯品会',
  url: 'https://www.vip.com/',
  sort: '',
  number: 4
}, {
  logo: 'https://fz.58.com/favicon.ico',
  name: '58同城',
  url: 'https://fz.58.com/',
  sort: '',
  number: 5
}, {
  logo: 'https://www.zhihu.com/favicon.ico',
  name: '知乎',
  url: 'https://www.zhihu.com/',
  sort: '',
  number: 6
}]; // 初始化页面网址

var render = function render() {
  // 查找sitelist里面所有元素，.last除外
  sitelist.find('li:not(.last').remove();
  hashMap.forEach(function (node) {
    var $li = template(node).insertBefore($lastLi);
    clickEvent($li, node);
  });
}; // 给元素注册点击事件


var clickEvent = function clickEvent($li, node) {
  $li.on('click', function () {
    window.open(node.url);
  });
  $li.on('click', '.close', function (e) {
    e.stopPropagation();
    console.log('1');
    console.log($li.remove()); // hashMap.splice(index, 1)
  });
  $li.on('click', '.edit', function (e) {
    e.stopPropagation();
    $('.alert').removeClass('hidden');
    var state = $(this).attr("data-index");

    if (siteName.val() === '' || siteURL.val() === '') {
      siteName.attr('value', node.name);
      siteURL.attr('value', node.url);
    }

    $('.confirm').attr('data-state', state);
  });
  var time; //let time

  $li.on('touchstart', function (e) {
    e.stopPropagation();
    time = setTimeout(function () {
      $('.alert').removeClass('hidden');
      $('.siteName').focus().select();
      var state = $(this).attr("data-index");

      if (siteName.val() === '' || siteURL.val() === '') {
        siteName.attr('value', node.name);
        siteURL.attr('value', node.url);
      }

      $('.confirm').attr('data-state', state);
    }, 1000);
  });
  $li.mouseup(function (e) {
    e.stopPropagation();
    clearTimeout(time);
  });
}; // 模板


var template = function template(node) {
  return $("\n    <li data-index=".concat(node.number, ">\n        <div class=\"site\">\n            <div class=\"logo\"><img src=\"").concat(node.logo, "\" onerror=\"this.src='./img/\u672A\u627E\u5230\u56FE\u7247.jpg';this.onerror=null\"></div>\n            <div class=\"text\">").concat(node.name, "</div>\n            <div class=\"close\" >\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-Close\"></use>\n                </svg>\n            </div>\n            <div class=\"edit\" data-index=\"").concat(node.number, "\">\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-edit\" data-index='").concat(node.number, "'></use>\n                </svg>\n            </div>\n        </div>\n    </li>\n    "));
};

var add = function add(data) {
  if (!data) {} else {
    console.log('1111');
    var $li = template(hashMap[hashMap.length - 1]).insertBefore($lastLi);
    clickEvent($li, hashMap[hashMap.length - 1]);
  }
};

render(); // ------------- 点击添加按钮 ----------------

$('.addButton').on('click', function () {
  $('.alert').removeClass('hidden');
  $('.siteName').focus();
}); // ------------- 点击取消按钮 -------------

$('.cancel').on('click', function () {
  $('.alert input').val('');
  $(_this).attr("data-state", '0');
  $('.alert').addClass('hidden');
}); // ------------- 点击完成按钮 -------------

$('.confirm').on('click', function () {
  var siteName = $('.siteName').val();
  var siteURL = $('.siteURL').val();
  var state = $(this).attr("data-state");

  if (!siteURL) {
    $('.siteURL').focus();
    alert('网址不能为空');
    return false;
  } else if (siteURL.indexOf('http' !== 0)) {
    siteURL = 'https://' + siteURL;

    if (!pattern.test(siteURL)) {
      alert('请输入正确的网址');
      return false;
    }
  } else if (!pattern.test(siteURL)) {
    alert('请输入正确的网址');
    return false;
  }

  var urlReg = /^http(s)?:\/\/(.*?)\//;

  if (siteURL.charAt(siteURL.length - 1) !== '/') {
    siteURL += '/';
    logo = urlReg.exec(siteURL)[0] + 'favicon.ico';
  }

  if (!siteName) {
    siteName = urlReg.exec(siteURL)[2];
    console.log(siteName);
  }

  if (state == 0) {
    hashMap.push({
      logo: logo,
      name: siteName,
      url: siteURL,
      sort: '',
      number: hashMap[hashMap.length - 1].number + 1
    });
    add('true');
  } else {
    console.log('111');
    hashMap.forEach(function (element, i) {
      console.log(i + ":" + hashMap[i].number + 'state:' + state);

      if (hashMap[i].number == state) {
        console.log(hashMap[i]);
        hashMap[i].logo = logo;
        hashMap[i].name = siteName;
        hashMap[i].url = siteURL;
        hashMap[i].sort = '';
        var $li = template(hashMap[i]);
        clickEvent($li, hashMap[i]);
        $("li[data-index=".concat(state, "]")).replaceWith($li); // <li data-index=${node.number}>/

        console.log(hashMap);
        return;
      }
    });
  }

  $(this).attr("data-state", '0');
  $('.alert').addClass('hidden');
  $('.alert input').val('');
}); // ------------- 点击分类1 -------------

$('.sort1').on('click', function () {
  alert('该功能未开放');
}); // ------------- 点击分类2 -------------

$('.sort2').on('click', function () {
  alert('该功能未开放');
}); //---存数据到本地

window.onbeforeunload = function () {
  var str = JSON.stringify(hashMap);
  localStorage.setItem('nav', str);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.79f2df9c.js.map