const swiper = new Swiper('.swiper', { loop: true, autoplay: { delay: 3000 } });

// from 시작하는 지점
// const gsapFrom = gsap.from('.about-greet', {y: 0, duration: 2, ease: "bounce"});

// from to 시작점과 끝지점 설정
// const gsapFromTo = gsap.fromTo('.about-greet', {y: 500}, {duration: 2, y: 0});

// to 끝나는 지점
// const gsapTo = gsap.to('.about-greet', {y: 500, duration: 2, ease: "bounce"});

const gsapFromTo = gsap.fromTo('.about-greet', { y: 0 }, { y: 400, duration: 3, ease: "bounce"  });