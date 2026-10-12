# 웨딩 필름 스튜디오 홈페이지

웨딩 필름 스튜디오를 소개하고 예약 문의를 받는 홈페이지입니다.
별도의 설치나 빌드 없이 HTML, CSS, JavaScript 파일만으로 동작합니다.

## 미리 보기

`index.html` 파일을 브라우저에서 열면 바로 볼 수 있습니다.

## 페이지 구성

| 파일 | 페이지 | 내용 |
|---|---|---|
| `index.html` | 메인 | 대표 사진과 문구, 스튜디오 강점, 대표 영상, 예약 안내 |
| `about.html` | About | 스튜디오 소개, 촬영 철학, 대표 감독 |
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

영상 표지 버튼의 `data-youtube=""` 안에 유튜브 영상 번호를 넣으면, 표지를 눌렀을 때 그 영상이 재생됩니다.
비워 두면 눌러도 재생되지 않습니다.

### 색상과 글씨체

`css/style.css` 맨 위의 `:root` 부분에서 한 번에 바꿉니다.
대표 색은 짙은 녹색(`--green`), 바탕은 옅은 미색(`--bg`)입니다.
글씨체는 Google Fonts의 Cormorant Garamond와 Noto Serif KR을 사용합니다.

## 아직 채워야 할 것

- **스튜디오 이름**: 모든 페이지에 `STUDIO NAME`으로 들어가 있습니다.
- **연락처**: 전화번호(`010-0000-0000`), 이메일(`hello@example.com`), 주소, 인스타그램 링크가 예시 값입니다.
- **사진**: `images/` 폴더에 아직 사진이 없습니다.
- **영상**: 유튜브 영상 번호가 비어 있습니다.
- **예약 문의 양식**: 전송 기능이 연결되어 있지 않습니다. 제출하면 안내 문구만 보이고 실제로 접수되지는 않습니다.
