let highestZ = 1;

class Paper {
    holdingPaper = false;

    prevX = 0;
    prevY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {

        paper.addEventListener('touchstart', (e) => {
            e.preventDefault();

            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;

            const touch = e.touches[0];
            this.prevX = touch.clientX;
            this.prevY = touch.clientY;
        }, { passive: false });

        paper.addEventListener('touchmove', (e) => {
            if (!this.holdingPaper) return;
            e.preventDefault();

            const touch = e.touches[0];

            const dx = touch.clientX - this.prevX;
            const dy = touch.clientY - this.prevY;

            this.currentPaperX += dx;
            this.currentPaperY += dy;

            this.prevX = touch.clientX;
            this.prevY = touch.clientY;

            paper.style.transform =
                `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
        }, { passive: false });

        paper.addEventListener('touchend', () => {
            this.holdingPaper = false;
        });

        paper.addEventListener('touchcancel', () => {
            this.holdingPaper = false;
        });
    }
}

document.querySelectorAll('.paper').forEach(paper => {
    new Paper().init(paper);
});
const enterScreen = document.getElementById("enterScreen");
const music = document.getElementById("bgMusic");

enterScreen.addEventListener("click", () => {
    music.play().then(() => {
        enterScreen.remove();
    }).catch(err => {
        console.log("Audio failed:", err);
    });
});


