// CSS variables / JS variables
var dinoRestY = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dinoRestY'));
var dinoRightX = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dinoW'));
var dinoHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dinoH'));
var obstacleHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--obstacleH'));
var obstacleWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--obstacleW'));
var scoreSpan = document.getElementById("scoreSpan");
var gameWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gameW'));
var obstacleStartPosX = gameWidth + obstacleWidth;
var dinosaur = document.getElementById("dinosaur");
var obstacle = document.getElementById("obstacle");
var rawScore = 0;
var score = 0;
var dinoTop;
var position = obstacleStartPosX;
var gameOver = false;
var speed;

// timer variable
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

// FUNCTIONS	
	
	// dinosaur jumps on spacebar press
	async function jump() {

		// checks to see if dinosaur is already mid-air
		if (dinosaur.classList.contains("animate")) {
			
        	return; 
			
    	}
		
		dinosaur.classList.add("animate");
		
		// 0.5 second cd
		await sleep(500);
		
		dinosaur.classList.remove("animate");

	}


	// checks for collision
	function checkDead() {

		const dinoRect = dinosaur.getBoundingClientRect();
		const obstacleRect = obstacle.getBoundingClientRect();

		if (
			dinoRect.right > obstacleRect.left &&
			(dinoRect.left + 20) < obstacleRect.right &&
			dinoRect.bottom > obstacleRect.top
		) {
			gameOver = true;
			alert("Game Over. SCORE: " + score);
			return;
		}
		
		rawScore += Math.floor(10 * Math.random());
		score = rawScore / 10;
		scoreSpan.textContent = "Score: " + score;
	}


	// moves the obstacle
	function increaseSpeed() {
		
		if (speed < 1600){
			
			speed = 2000 - (400 + score);

		} else if(speed < 1200){
			
			speed = 1200;
			
		}
		
		speed = 2000 - (2 * score);
		obstacle.style.animationDuration = speed + "ms";
		
	}

	// repeat / call all functions
	function gameRun() {
		
		if (gameOver == true){
			
			return;
			
		}
		
		checkDead();
		increaseSpeed();
		requestAnimationFrame(gameRun);
		
	}

	gameRun();

