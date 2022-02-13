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