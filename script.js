let highestZ = 1;

class Paper {
    holdingPaper = false;

    prevX = 0;
    prevY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {

        paper.addEventListener('click', (e) => {
            e.preventDefault();

            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;

            const touch = e.click[0];
            this.prevX = touch.clientX;
            this.prevY = touch.clientY;
        }, { passive: false });

        paper.addEventListener('mousemove', (e) => {
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

        paper.addEventListener('mouseleave', () => {
            this.holdingPaper = false;
        });

        paper.addEventListener('mouseout', () => {
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


