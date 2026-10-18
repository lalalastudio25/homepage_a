# Lalala Studio 홈페이지

웨딩 필름 스튜디오 Lalala Studio를 소개하고 예약 문의를 받는 홈페이지입니다.
별도의 설치나 빌드 없이 HTML, CSS, JavaScript 파일만으로 동작합니다.

## 미리 보기

`index.html` 파일을 브라우저에서 열면 바로 볼 수 있습니다.

## 페이지 구성

| 파일 | 페이지 | 내용 |
|---|---|---|
| `index.html` | 메인 | 배경 영상 |
| `about.html` | About | 스튜디오 소개, 대표 감독 |
| `wedding-film.html` | Wedding Film | 영상 목록 |
| `product.html` | Product | 상품 안내 |
| `reservation.html` | Reservation | 연락처와 예약 문의 양식 |

## 폴더 구조

```
.
├── index.html
├── about.html
├── wedding-film.html
├── product.html
├── reservation.html
├── css/style.css      색상, 글씨체, 화면 배치
├── js/main.js         메뉴, 화면 효과, 영상 재생, 문의 양식
└── images/            사진을 넣는 폴더
```

## 내용 바꾸는 방법

### 사진

`images/` 폴더에 정해진 이름의 JPG 파일을 넣으면 해당 자리에 자동으로 나타납니다.
사진이 없는 자리는 녹색 바탕으로 보입니다.
파일 이름 목록은 [`images/사진 넣는 방법.txt`](images/사진%20넣는%20방법.txt)에 있습니다.

### 영상

메인 첫 화면의 배경 영상은 `videos/hero.mp4`입니다. 같은 이름으로 파일을 바꿔 넣으면 영상이 바뀝니다. 원본을 그대로 넣지 말고 웹용으로 줄여서(지금은 1600×900, 소리 없음, 약 13MB) 넣습니다. 영상이 뜨기 전에는 `images/hero.jpg`가 보입니다.

영상 표지 버튼의 `data-youtube=""` 안에 유튜브 영상 번호를 넣으면, 표지를 눌렀을 때 그 영상이 재생됩니다.
비워 두면 눌러도 재생되지 않습니다.
지금은 유튜브 채널 [@lalalastudio_wedding](https://www.youtube.com/@lalalastudio_wedding)의 영상 8편이 연결되어 있습니다.

### 색상과 글씨체

`css/style.css` 맨 위의 `:root` 부분에서 한 번에 바꿉니다.
대표 색은 짙은 녹색(`--green`), 바탕은 옅은 미색(`--bg`)입니다.
글씨체는 Google Fonts의 Cormorant Garamond와 Noto Serif KR을 사용합니다.

### 움직임

부드러운 스크롤, 화면 전환 막, 제목 글자 등장, 사진 시차, 마우스 올림 효과는 `css/style.css` 맨 아래 "움직임" 부분과 `js/main.js` 맨 아래에 모여 있습니다.
부드러운 스크롤은 [Lenis](https://lenis.darkroom.engineering/)를 인터넷에서 불러와 사용합니다.

## 아직 채워야 할 것

- **사진**: 영상 표지와 첫 화면 외의 사진(About 등)이 아직 없습니다.
- **상품 가격**: Product 페이지에 구성은 들어 있지만 가격은 없습니다. 문의는 카카오톡 채널로 안내합니다.
- **가격표**: 상품 가격이 아직 없습니다. 가격이 정해지면 Product 페이지에 표로 넣습니다.
- **자주 묻는 질문**: 원본 제공, 음악 선택, 환불 규정, 외부 업체 반입 제한 홀 질문은 답이 정해지면 추가합니다.
- **예약 문의 양식**: 제출하면 FormSubmit(formsubmit.co)을 거쳐 `lalalastudio25@gmail.com`으로 메일이 옵니다. 처음 한 번은 FormSubmit이 보내는 확인 메일에서 승인 버튼을 눌러야 그다음부터 문의가 도착합니다. 받는 주소는 `reservation.html`의 `data-mail`에서 바꿉니다.
