const CANVAS = document.getElementById('canvas');
const wordInput = document.getElementById('wordInput');
const c = CANVAS.getContext('2d');

CANVAS.height = window.innerHeight;
CANVAS.width = window.innerWidth;

const bouncingWordArr = [];
const wordTrack = {};
const repeatingWords = {};

class BouncingWord{
    constructor(text){
        this.text = text;
        this.displayText = text;
        this.x = Math.random() * (CANVAS.width - 100) + 50;
        this.y = Math.random() * (CANVAS.height - 100) + 50;
        this.dx = 3;
        this.dy = 3;
        this.textSize = 20;
        this.color = `hsl(${Math.random() * 365}, 100%, 50%)`;
    }

    draw(){
        c.font = `bold ${this.textSize}px system-ui`;
        c.fillStyle = this.color;
        c.fillText(this.displayText, this.x, this.y);
    }

    update(){
        if(repeatingWords[this.text] > 1){
            this.displayText = `${this.text}(${repeatingWords[this.text]}x)`;
        }
        let textWidth = c.measureText(this.displayText).width;
        
        if((textWidth + this.x) >= CANVAS.width){
            this.dx = -Math.abs(this.dx);
        }
        else if(this.x <= 0){
            this.dx = Math.abs(this.dx);
        }

        if(this.y >= CANVAS.height){
            this.dy = -Math.abs(this.dy);
        }
        else if (this.y <= this.textSize){
            this.dy = Math.abs(this.dy);
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
        
    }


}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, CANVAS.width, CANVAS.height);

    bouncingWordArr.forEach((bouncingWord)=>{
        bouncingWord.update();
    });
}

animate();

wordInput.addEventListener('keydown', (e)=>{
    if(e.key === "Enter"){
        if (wordInput.value.trim()){


            if (wordInput.value.trim() in repeatingWords){
                repeatingWords[wordInput.value.trim()]++;
                wordTrack[wordInput.value.trim()].color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                console.log(wordTrack[wordInput.value.trim()].color);

            }
            else{
                let newBouncingWord = new BouncingWord(wordInput.value.trim());
                repeatingWords[wordInput.value.trim()] = 1;
                wordTrack[wordInput.value.trim()] = newBouncingWord;
                bouncingWordArr.push(newBouncingWord);
                console.log(wordInput.value.trim())
            }
            console.log(repeatingWords);
            console.log(wordTrack);
        }
        else{
            alert('Cannot be Empty!');
        }

        wordInput.value = "";
    }
})







