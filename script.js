// Functions
function circleMouseFollower(x, y, xScale, yScale) {
  document.querySelector("#mini-circle").style.transform =
    `translate(${x}px, ${y}px) scale(${xScale}, ${yScale})`;
}

// squeeze mouse during movement
let timer;

function mouseMovementSqueeze() {
  // set default values
  let xScale = 1;
  let yScale = 1;

  let xPrevious = 0;
  let yPrevious = 0;

  window.addEventListener("mousemove", function (details) {
    clearTimeout(timer);

    let xDifference = Math.abs(details.clientX - xPrevious);
    let yDifference = Math.abs(details.clientY - yPrevious);

    xScale = gsap.utils.clamp(
      0.7,
      1.5,
      gsap.utils.mapRange(0, 50, 0.7, 1.5, xDifference),
    );
    yScale = gsap.utils.clamp(
      0.7,
      1.5,
      gsap.utils.mapRange(0, 50, 0.7, 1.5, yDifference),
    );

    xPrevious = details.clientX;
    yPrevious = details.clientY;

    circleMouseFollower(details.clientX, details.clientY, xScale, yScale);

    timer = setTimeout(function () {
      circleMouseFollower(details.clientX, details.clientY, 1, 1);
    }, 100);
  });
}

// image hover effect
document.querySelectorAll(".element").forEach(function (element) {
  let img = element.querySelector("img");
  let prevPosition = 0;
  let rotateDifference = 0;
  let rotation = 0;
  let timer2;

  // image disappearing after mouse leaves
  element.addEventListener("mouseleave", function (e) {
    clearTimeout(timer2);

    gsap.to(img, {
      rotate: 0,
      opacity: 0,
      ease: "power1.out",
    });
  });

  // image movement
  element.addEventListener("mousemove", function (details) {
    clearTimeout(timer2);

    let difference = details.clientY - element.getBoundingClientRect().top;
    rotateDifference = details.clientX - prevPosition;
    prevPosition = details.clientX;

    rotation = gsap.utils.clamp(
      -50,
      50,
      gsap.utils.mapRange(-80, 80, -50, 50, rotateDifference),
    );

    gsap.to(img, {
      opacity: 1,
      ease: "power1.out",
      top: difference - img.offsetHeight / 2,
      left: details.clientX - img.offsetWidth / 2,
      rotate: rotation,
    });

    timer2 = setTimeout(function () {
      gsap.to(img, {
        rotate: 0,
      });
    }, 100);
  });
});

// Function calls
mouseMovementSqueeze();
