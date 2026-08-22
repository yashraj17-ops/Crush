let highestZ = 1;

// ===============================
// BACKGROUND MUSIC
// ===============================

const bgMusic = new Audio("./music.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.5;

let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgMusic
      .play()
      .then(() => {
        musicStarted = true;
      })
      .catch((error) => {
        console.log("Music could not start:", error);
      });
  }
}


// ===============================
// PAPER CLASS
// ===============================

class Paper {
  holdingPaper = false;

  mouseTouchX = 0;
  mouseTouchY = 0;

  mouseX = 0;
  mouseY = 0;

  prevMouseX = 0;
  prevMouseY = 0;

  velX = 0;
  velY = 0;

  rotation = Math.random() * 30 - 15;

  currentPaperX = 0;
  currentPaperY = 0;

  rotating = false;


  init(paper) {

    // ===============================
    // MOUSE MOVEMENT
    // ===============================

    document.addEventListener("mousemove", (e) => {

      if (!this.rotating) {

        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;

      }


      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;

      const dirLength = Math.sqrt(
        dirX * dirX + dirY * dirY
      );


      if (dirLength === 0) {
        return;
      }


      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;


      const angle = Math.atan2(
        dirNormalizedY,
        dirNormalizedX
      );


      let degrees = 180 * angle / Math.PI;

      degrees = (360 + Math.round(degrees)) % 360;


      if (this.rotating) {
        this.rotation = degrees;
      }


      // ===============================
      // MOVE PAPER
      // ===============================

      if (this.holdingPaper) {

        if (!this.rotating) {

          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;

        }


        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;


        paper.style.transform =
          `translateX(${this.currentPaperX}px) ` +
          `translateY(${this.currentPaperY}px) ` +
          `rotateZ(${this.rotation}deg)`;

      }

    });


    // ===============================
    // MOUSE DOWN
    // ===============================

    paper.addEventListener("mousedown", (e) => {

      // Start music on first paper interaction
      startMusic();


      if (this.holdingPaper) {
        return;
      }


      this.holdingPaper = true;


      // Bring paper to front
      paper.style.zIndex = highestZ;

      highestZ += 1;


      // ===============================
      // LEFT CLICK
      // ===============================

      if (e.button === 0) {

        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

      }


      // ===============================
      // RIGHT CLICK
      // ===============================

      if (e.button === 2) {

        this.rotating = true;

      }

    });


    // ===============================
    // MOUSE UP
    // ===============================

    window.addEventListener("mouseup", () => {

      this.holdingPaper = false;

      this.rotating = false;

    });

  }

}


// ===============================
// INITIALIZE ALL PAPERS
// ===============================

const papers = Array.from(
  document.querySelectorAll(".paper")
);


papers.forEach((paper) => {

  const p = new Paper();

  p.init(paper);

});
