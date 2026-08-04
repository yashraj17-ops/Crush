let highestZ = 1;

class Paper {
    constructor() {
        this.holdingPaper = false;
        this.currentPaperX = 0;
        this.currentPaperY = 0;
        this.prevX = 0;
        this.prevY = 0;
    }

    init(paper) {
        paper.style.position = "absolute";

        paper.addEventListener("pointerdown", (e) => {
            e.preventDefault();

            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;

            this.prevX = e.clientX;
            this.prevY = e.clientY;

            paper.setPointerCapture(e.pointerId);
        });

        paper.addEventListener("pointermove", (e) => {
            if (!this.holdingPaper) return;

            const dx = e.clientX - this.prevX;
            const dy = e.clientY - this.prevY;

            this.currentPaperX += dx;
            this.currentPaperY += dy;

            this.prevX = e.clientX;
            this.prevY = e.clientY;

            paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
        });

        paper.addEventListener("pointerup", () => {
            this.holdingPaper = false;
        });

        paper.addEventListener("pointercancel", () => {
            this.holdingPaper = false;
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".paper").forEach((paper) => {
        new Paper().init(paper);
    });
});
