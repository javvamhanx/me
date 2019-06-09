/* Store components for easy reference */

var me = document.getElementById('me');
var backdrop = document.getElementById('me-backdrop-back');
var face = document.getElementById('me-face');
var mouth = document.getElementById('me-mouth');
var moustache = document.getElementById('me-moustache');
var eyeLeft = document.getElementById('me-eye-left');
var eyebrowLeft = document.getElementById('me-eyebrow-left');
var eyebrowRight = document.getElementById('me-eyebrow-right');

var eyeOpen = eyeLeft.getAttribute('d');
var eyeClosed = eyeLeft.getAttribute('data-closed-d');

/* Backdrop */

TweenMax.to(backdrop, 5, {
  rotation: 360,
  svgOrigin: '84 84',
  repeat: -1,
  ease: Linear.easeNone
});

/* Wink */

var makeWinkTimeline = function (ease, reverse, duration) {
  duration = duration || 0.3;
  return new TimelineMax()
    .to(eyeLeft, duration, {
      morphSVG: reverse ? eyeOpen : eyeClosed,
      ease: ease
    }, 0)
    .to(face, duration, {
      rotation: reverse ? 0 : 2,
      svgOrigin: '84 84',
      ease: ease
    }, 0)
    .to(mouth, duration, {
      rotation: reverse ? 0 : -2,
      svgOrigin: '64 103',
      ease: ease
    }, 0)
    .to(moustache, duration, {
      rotation: reverse ? 0 : -3,
      svgOrigin: '64 103',
      ease: ease
    }, 0)
    .to(eyebrowLeft, duration, {
      rotation: reverse ? 0 : 6,
      svgOrigin: '87 76',
      ease: ease
    }, 0)
    .to(eyebrowRight, duration, {
      rotation: reverse ? 0 : 8,
      svgOrigin: '80 74',
      ease: ease
    }, 0);
};

var winkTimeline = new TimelineMax({ paused: true })
  .add(makeWinkTimeline(Cubic.easeOut))
  .add(makeWinkTimeline(Quad.easeInOut, true, 0.35), '+=0.25');

var wink = function () {
  if (!winkTimeline.isActive()) {
    winkTimeline.restart();
  }
};

me.addEventListener('touchstart', wink);
me.addEventListener('mouseenter', wink);