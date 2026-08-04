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
        paper.addEventListener("mousedown", (e) => {
            e.preventDefault();

            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;

            this.prevX = e.clientX;
            this.prevY = e.clientY;
        });

        document.addEventListener("mousemove", (e) => {
            if (!this.holdingPaper) return;

            const dx = e.clientX - this.prevX;
            const dy = e.clientY - this.prevY;

            this.currentPaperX += dx;
            this.currentPaperY += dy;

            this.prevX = e.clientX;
            this.prevY = e.clientY;

            paper.style.transform =
                `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
        });

        document.addEventListener("mouseup", () => {
            this.holdingPaper = false;
        });
    }
}

document.querySelectorAll(".paper").forEach((paper) => {
    new Paper().init(paper);
});
