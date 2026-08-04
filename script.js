init(paper) {

    paper.addEventListener('mousedown', (e) => {
        e.preventDefault();

        this.holdingPaper = true;
        paper.style.zIndex = highestZ++;

        this.prevX = e.clientX;
        this.prevY = e.clientY;
    });

    paper.addEventListener('mousemove', (e) => {
        if (!this.holdingPaper) return;

        e.preventDefault();

        const dx = e.clientX - this.prevX;
        const dy = e.clientY - this.prevY;

        this.currentPaperX += dx;
        this.currentPaperY += dy;

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        paper.style.transform =
            `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
    });

    paper.addEventListener('mouseup', () => {
        this.holdingPaper = false;
    });

    paper.addEventListener('mouseleave', () => {
        this.holdingPaper = false;
    });
}

document.querySelectorAll('.paper').forEach(paper => {
    new Paper().init(paper);
});

const enterScreen = document.getElementById("enterScreen");
const music = document.getElementById("bgMusic");

enterScreen.addEventListener("click", () => {
    music.play()
        .then(() => {
            enterScreen.remove();
        })
        .catch(err => {
            console.log("Audio failed:", err);
        });
});
