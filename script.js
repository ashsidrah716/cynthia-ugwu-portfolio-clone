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

// Function calls
mouseMovementSqueeze();
