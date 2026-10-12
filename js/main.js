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
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
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
  document.querySelectorAll(".film__screen").forEach(function (screen) {
    screen.addEventListener("click", function () {
      var id = screen.getAttribute("data-youtube");
      if (!id) return;
      screen.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + encodeURIComponent(id) +
        '?autoplay=1&rel=0" title="웨딩 필름" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    });
  });

  // 예약 문의 양식: 아직 전송 기능이 연결되지 않아 안내 문구만 보여줍니다
  var form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var done = form.querySelector(".form__done");
      if (done) {
        done.hidden = false;
        done.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }
})();
