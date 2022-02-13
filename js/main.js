//document = html 자체다 라고 생각해도 무방하다.
const searchEl = document.querySelector('.search');
// searchEl안에서 input 요소르르 찾는 형식으로 수정
const searchInputEl = searchEl.querySelector('input');

//input요소가 소속되어 있는 search클래스를 가진 div 요소 아무곳을
//선택해도 포커스가 되도록 설정
searchEl.addEventListener('click', function(){
  //검색 부분의 input요소에 focus를 해라.
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function(){
  //특정 요소에 클래스 정보를 가진 객체에서 어떤 클래스 내용을 추가하겠다.
  searchEl.classList.add('focused');
  //html속성을 지정한다.
  searchInputEl.setAttribute('placeholder', '통합검색');
});

//포커스가 해제되었을때
searchInputEl.addEventListener('blur', function(){
  //특정 요소에 클래스 정보를 가진 객체에서 어떤 클래스 내용을 추가하겠다.
  searchEl.classList.remove('focused');
  //html속성을 지정한다.
  searchInputEl.setAttribute('placeholder', '');
});

//배지가 특정 위치에 있을때 사라지도록 설정
/**
 * 페이지 스크롤에 따른 요소 제어
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector('header .badges')
// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
//_.throttle(함수, 시간)으로 사용 가능
//window는 우리가 보고 있는 화면 자체다.
window.addEventListener('scroll', _.throttle(function () {
  // 페이지 스크롤 위치가 500px이 넘으면.
  if (window.scrollY > 500) {
    // Badge 요소 숨기기!
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    })
    // 상단으로 스크롤 버튼 보이기!
    //gsap에서 제공하는 .to()라는 애니메이션 함수 사용]
    //gsap.to(요소, 지속시간, 옵션)
    //많은 자바스크립트 라이브러리가 객체 데이터를 사용한다.
    gsap.to(toTopEl, .2, {
      x: 0
    })

  // 페이지 스크롤 위치가 500px이 넘지 않으면.
  } else {
    // Badge 요소 보이기!
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    })
    // 상단으로 스크롤 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    })
  }
  // 300 = 3초를 의미
}, 300))


/**
 * 순서대로 나타나는 기능
 */
// 나타날 요소들(.fade-in) 찾기.
const fadeEls = document.querySelectorAll('.visual .fade-in')
// 나타날 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEl, index) {
  // 각 요소들을 순서대로(delay) 보여지게 함!
  gsap.to(fadeEl, 1, {
    // 0.7초 후에 두번째 요소는 1.4초 후에, 세번째는 2.1초 후에 보일 것이다.
    delay: (index + 1) * .7, 
    opacity: 1
  })
})

//공지사항 슬라이더 적용하기
/**
 * 슬라이드 요소 관리
 new 생성자(클래스) 이다. 
  new Swiper(선택자, 옵션) */
 new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
})
// 사진 3장을 슬라이드 하는 슬라이더
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  loop: true, // 반복 재생 여부
  slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  pagination: { // 페이지 번호 사용 여부
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
    nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
  }
})
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})

/**
 * Promotion 슬라이드 토글 기능
 */
// 슬라이드 영역 요소 검색!
const promotionEl = document.querySelector('.promotion')
// 슬라이드 영역를 토글하는 버튼 검색!
const promotionToggleBtn = document.querySelector('.toggle-promotion')
// 슬라이드 영역 숨김 여부 기본값!
let isHidePromotion = false //보이고 있다.
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () {
  //특정 값을 반대로 적용하기 위해서, !표는 변수 앞에 붙인다. true -> false 으로
  // 슬라이드 영역 숨김 여부를 반댓값으로 할당!
  isHidePromotion = !isHidePromotion
  // 요소를 숨겨야 하면,
  //보이거나 안보이는 것은 클래스만으로 제어하는 것이 좋다.
  if (isHidePromotion) {
    promotionEl.classList.add('hide')
  // 요소가 보여야 하면,
  } else {
    promotionEl.classList.remove('hide')
  }
})

/* 배경 이미지 앞에 떠다니는 이미지 적용하기 */
/**
 * 부유하는 요소 관리
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 부유하는(떠 다니는) 요소를 만드는 함수
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {//옵션
      delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
      repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
      ease: Power1.easeInOut // Easing 함수 적용.
    }
  )
}
floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)