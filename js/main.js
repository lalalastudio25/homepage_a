(function () {
  var root = document.documentElement;
  root.classList.add("js");

  // 휴대폰 메뉴 열고 닫기
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = root.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // 화면을 내리면 메뉴바 아래에 얇은 선 표시
  var header = document.querySelector(".header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    // 첫 화면: 영상을 지나 내려오면 로고와 메뉴를 화면 맨 위에 붙이고,
    // 뒤에 깔린 구역이 어두우면 흰 글씨, 밝으면 원래 색으로 바꿉니다
    var hero = document.querySelector(".home .hero");
    if (hero) {
      var pinned = window.scrollY > hero.offsetHeight - header.offsetHeight;
      header.classList.toggle("is-pinned", pinned);
      var light = !pinned;
      header.classList.toggle("is-light", light);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 화면을 내릴 때 내용이 부드럽게 나타나기
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // 영상 재생: data-youtube 에 유튜브 영상 번호를 넣으면 눌렀을 때 재생됩니다
  // 유튜브에서 "퍼가기 허용"이 꺼진 영상(data-embed="off")과 파일을 직접 연 화면에서는
  // 사이트 안에서 재생할 수 없어, 유튜브를 새 창으로 엽니다
  var online = /^https?:$/.test(location.protocol);
  document.querySelectorAll(".film__screen").forEach(function (screen) {
    screen.addEventListener("click", function () {
      var id = screen.getAttribute("data-youtube");
      if (!id) return;
      if (!online || screen.getAttribute("data-embed") === "off") {
        window.open("https://www.youtube.com/watch?v=" + encodeURIComponent(id), "_blank", "noopener");
        return;
      }
      // 유튜브는 어느 사이트에서 재생하는지(주소)를 알려줘야 영상을 틀어 줍니다
      screen.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + encodeURIComponent(id) +
        "?autoplay=1&rel=0&playsinline=1&origin=" + encodeURIComponent(location.origin) +
        '" title="웨딩 필름" referrerpolicy="strict-origin-when-cross-origin"' +
        ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    });
  });

  // 첫 화면 배경 영상: 움직임 줄이기를 켠 기기에서는 재생하지 않고 대기 사진만 보여줍니다
  var heroClip = document.querySelector(".hero__video video");
  if (heroClip) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroClip.removeAttribute("autoplay");
      heroClip.pause();
    } else {
      // 자동 재생이 걸리지 않는 브라우저를 위해 한 번 더 재생을 요청합니다
      heroClip.muted = true;
      var played = heroClip.play();
      if (played && played.catch) played.catch(function () {});
    }
  }

  // 예식장 고르기 (Wedding Film): 누른 예식장의 영상만 보여줍니다
  var filter = document.querySelector(".film-filter");
  if (filter) {
    var filmed = filter.parentNode.querySelectorAll(".film[data-venue]");
    filter.addEventListener("click", function (event) {
      var chip = event.target.closest && event.target.closest("button[data-venue]");
      if (!chip) return;
      var venue = chip.getAttribute("data-venue");
      filter.querySelectorAll("button").forEach(function (other) {
        other.setAttribute("aria-pressed", other === chip ? "true" : "false");
      });
      filmed.forEach(function (film) {
        film.hidden = !!venue && film.getAttribute("data-venue") !== venue;
        if (!film.hidden) film.classList.add("is-visible");
      });
    });
  }

  // Product 왼쪽 목차: 화면 위쪽 40% 지점을 지난 마지막 상품에 점을 찍습니다
  var toc = document.querySelectorAll(".product-toc a");
  if (toc.length) {
    var markToc = function () {
      var line = window.innerHeight * 0.4, current = toc[0];
      toc.forEach(function (link) {
        var target = document.querySelector(link.getAttribute("href"));
        if (target && target.getBoundingClientRect().top <= line) current = link;
      });
      toc.forEach(function (link) { link.classList.toggle("is-current", link === current); });
    };
    window.addEventListener("scroll", markToc, { passive: true });
    window.addEventListener("resize", markToc);
    markToc();
  }

  // 예약 문의 양식: 적은 내용을 FormSubmit(formsubmit.co)을 거쳐 메일로 보냅니다
  // 받는 메일 주소는 reservation.html 의 <form data-mail="..."> 에서 바꿉니다
  var form = document.querySelector(".form");
  if (form) {
    var done = form.querySelector(".form__done");
    var send = form.querySelector('button[type="submit"]');
    var say = function (text) {
      done.textContent = text;
      done.hidden = false;
      done.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = function (name) { return (form.elements[name].value || "").trim() || "-"; };
      var label = send.textContent;
      send.disabled = true;
      send.textContent = "Sending...";
      fetch("https://formsubmit.co/ajax/" + form.getAttribute("data-mail"), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "[Lalala Studio] 예약 문의 - " + value("name"),
          _template: "table",
          _honey: form.elements._honey.value,
          "성함": value("name"),
          "연락처": value("phone"),
          "예식 날짜": value("date"),
          "예식 시간": value("time"),
          "예식 장소": value("venue"),
          "관심 있는 상품": value("plan"),
          "남기실 말씀": value("message")
        })
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (String(result.success) !== "true") throw new Error(result.message);
          form.reset();
          say("문의가 접수되었습니다. 확인 후 1~2일 안에 연락드리겠습니다.");
        })
        .catch(function () {
          say("전송에 실패했습니다. 잠시 후 다시 시도하시거나 카카오톡 채널로 문의해 주세요.");
        })
        .then(function () {
          send.disabled = false;
          send.textContent = label;
        });
    });
  }
})();

// ==========================================================
// 움직임: 부드러운 스크롤, 화면 전환, 글자 등장, 사진 시차, 강점 차례 강조
// ==========================================================
(function () {
  var root = document.documentElement;
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 부드러운 스크롤
  var lenis = null;
  if (window.Lenis && !calm) {
    lenis = new window.Lenis({ autoRaf: true, anchors: true });
    var toggle = document.querySelector(".nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (root.classList.contains("nav-open")) lenis.stop(); else lenis.start();
      });
    }
  }

  // 화면 전환: 사이트 안의 다른 화면으로 갈 때 막이 올라온 뒤 이동합니다
  document.addEventListener("click", function (event) {
    if (calm || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest && event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    var url;
    try { url = new URL(link.href, location.href); } catch (e) { return; }
    if (!/^(https?|file):$/.test(url.protocol) || url.host !== location.host) return;
    if (url.pathname === location.pathname) return;
    event.preventDefault();
    root.classList.remove("nav-open");
    root.classList.add("is-leaving");
    setTimeout(function () { location.href = url.href; }, 820);
  });
  // 뒤로 가기로 돌아왔을 때 막이 덮인 채 남지 않게 합니다
  window.addEventListener("pageshow", function () { root.classList.remove("is-leaving"); });

  // 제목: 단어 단위로 나눠서 화면에 들어올 때 하나씩 떠오르게 합니다
  var titles = document.querySelectorAll(".title, .statement__text");
  titles.forEach(function (title) {
    var index = 0;
    Array.prototype.slice.call(title.childNodes).forEach(function (node) {
      if (node.nodeType !== 3 || !node.textContent.trim()) return;
      var piece = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { piece.appendChild(document.createTextNode(" ")); return; }
        var word = document.createElement("span");
        word.className = "w";
        word.style.setProperty("--i", index++);
        word.textContent = part;
        piece.appendChild(word);
      });
      title.replaceChild(piece, node);
    });
  });
  if ("IntersectionObserver" in window) {
    var titleObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); titleObserver.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    titles.forEach(function (title) { titleObserver.observe(title); });
  } else {
    titles.forEach(function (title) { title.classList.add("is-in"); });
  }

  // 사진: 틀 안에 한 겹을 더 넣어, 스크롤할 때 천천히 움직이고 마우스를 올리면 커지게 합니다
  var movers = [];
  document.querySelectorAll(".photo").forEach(function (photo) {
    if (photo.classList.contains("hero") || !photo.style.backgroundImage) return;
    var layer = document.createElement("span");
    layer.className = "photo__img";
    layer.style.backgroundImage = photo.style.backgroundImage;
    photo.style.backgroundImage = "";
    photo.insertBefore(layer, photo.firstChild);
    if (!photo.classList.contains("film__screen") && !calm) {
      layer.setAttribute("data-parallax", "");
      movers.push({ box: photo, layer: layer });
    }
  });
  var heroVideo = document.querySelector(".hero__video video");
  var ticking = false;
  function move() {
    ticking = false;
    var view = window.innerHeight;
    movers.forEach(function (item) {
      var rect = item.box.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > view + 100) return;
      var progress = (rect.top + rect.height / 2 - view / 2) / view;
      progress = Math.max(-1, Math.min(1, progress));
      item.layer.style.transform = "translate3d(0," + (-progress * 8).toFixed(2) + "%,0)";
    });
    if (heroVideo && !calm && window.scrollY < view * 1.2) {
      heroVideo.style.transform = "translate3d(0," + (window.scrollY * 0.2).toFixed(1) + "px,0)";
    }
  }
  function requestMove() { if (!ticking) { ticking = true; requestAnimationFrame(move); } }
  window.addEventListener("scroll", requestMove, { passive: true });
  window.addEventListener("resize", requestMove);
  move();

  // 강점 4가지: 5초마다 다음 항목이 강조되고, 누르거나 마우스를 올리면 그 항목으로 바뀝니다
  var features = document.querySelector(".features");
  if (features) {
    var items = features.querySelectorAll(".feature");
    var bar = document.createElement("div");
    bar.className = "features-bar";
    bar.innerHTML = '<span class="features-bar__count"></span><span class="features-bar__line"><span class="features-bar__fill"></span></span>';
    features.parentNode.insertBefore(bar, features);
    features.classList.add("is-carousel");
    var count = bar.querySelector(".features-bar__count");
    var fill = bar.querySelector(".features-bar__fill");
    var current = 0, started = performance.now(), span = 5000;
    function show(next) {
      current = (next + items.length) % items.length;
      started = performance.now();
      items.forEach(function (item, i) { item.classList.toggle("is-active", i === current); });
      count.textContent = (current + 1) + " : " + items.length;
    }
    items.forEach(function (item, i) {
      item.addEventListener("click", function () { show(i); });
      item.addEventListener("mouseenter", function () { show(i); });
    });
    show(0);
    if (calm) { fill.style.transform = "none"; return; }
    (function tick(now) {
      var ratio = (now - started) / span;
      if (ratio >= 1) { show(current + 1); ratio = 0; }
      fill.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
      requestAnimationFrame(tick);
    })(performance.now());
  }
})();
