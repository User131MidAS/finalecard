// Puzzle answers and the pattern shown on the card.
// kanye's game of life ahh patter.
const pattern = [
	[0, 1, 1, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[0, 1, 0, 0, 0, 1, 0],
	[0, 0, 1, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0],
];

const numberAnswer = [ 4, 44, 42];
const passcodeAnswer = [4, "wewsharpeyes"];
const cardPasswords = [ "4", "alexisasiaaries", "ravenasiaaries", "password", "again", "12345678", "123456789", "1234567890"];

// Turn the small puzzle pattern into visible grid cells (ant-man reference).
function drawBoard(board) {
	for (let row = 0; row < pattern.length; row++) {
		for (let column = 0; column < pattern[row].length; column++) {
			const cell = document.createElement("div");

			if (pattern[row][column] === 1) {
				cell.className = "cell on";
			} else {
				cell.className = "cell";
			}

			board.appendChild(cell);
		}
	}
}

// Draw the static pattern used on the puzzle board and card cover.
drawBoard(document.getElementById("coverArt"));

// Elements and state used to open the card and reveal the puzzles.
const card = document.getElementById("card");
const stage = document.querySelector(".stage");
const inside = document.getElementById("inside");
const toggleButton = document.getElementById("toggleBtn");
const secretButton = document.getElementById("secretTrigger");
const musicVideo = document.getElementById("musicVideo");
const videoHintArrow = document.getElementById("videoHintArrow");
const hintNote = document.getElementById("hintNote");
let passwordGateOpened = false;

// Keep the card visuals, button labels, and hidden content in sync.
function setCardOpen(isOpen) {
	card.classList.toggle("open", isOpen);
	stage.classList.toggle("is-open", isOpen);
	inside.inert = !isOpen;

	if (isOpen) {
		toggleButton.textContent = "Close";
	} else {
		toggleButton.textContent = "Open";
	}

	toggleButton.setAttribute("aria-expanded", String(isOpen));
	musicVideo.classList.toggle("hidden", !isOpen || passwordGateOpened);
	videoHintArrow.classList.toggle("hidden", !isOpen || passwordGateOpened);
	hintNote.classList.toggle("hidden", !isOpen || passwordGateOpened);
	secretButton.classList.toggle("hidden", isOpen);
}

// Open or close the card from its main button.
function toggleCard() {
	setCardOpen(!card.classList.contains("open"));
}

// Reveal the password form when the hidden cover button is clicked.
function showPasswordGate() {
	passwordGateOpened = true;
	stage.classList.add("has-password-gate");
	document.getElementById("passwordGate").classList.remove("hidden");
	musicVideo.classList.add("hidden");
	setCardOpen(true);
	document.getElementById("passwordInput").focus();
}

// Check the card password and reveal the puzzle section.
function checkCardPassword() {
	const passwordInput = document.getElementById("passwordInput");
	const passwordMessage = document.getElementById("passwordMessage");

	if (cardPasswords.includes(passwordInput.value.trim())) {
		document.getElementById("passwordGate").classList.add("hidden");
		document.getElementById("puzzle").classList.remove("hidden");
		card.classList.add("wide");
		passwordMessage.textContent = "";
	} else {
		passwordMessage.textContent = "Incorrect password. Please try again.";
		passwordMessage.className = "msg bad";
		passwordInput.select();
	}
}

// Check Puzzle 1 and reveal Puzzle 2 when the answer is accepted.
function checkFirstPuzzle() {
	const answer = Number(document.getElementById("answer").value);
	const message = document.getElementById("msg1");

	if (numberAnswer.includes(answer)) {
		message.className = "msg ok";
		document.getElementById("p1").classList.add("hidden");
		document.getElementById("p2").classList.remove("hidden");
	} else {
		message.textContent = "Not quite. try again.";
		message.className = "msg bad";
	}
}

// Check Puzzle 2's passcode and reveal Puzzle 3.
function checkPasscode() {
	const passcode = Number(document.getElementById("num2").value);
	const message = document.getElementById("passcodeMessage");

	if (passcodeAnswer.includes(passcode)) {
		message.className = "msg ok";
		document.getElementById("p2").classList.add("hidden");
		document.getElementById("p3").classList.remove("hidden");
	} else {
		message.textContent = "That number is not correct. Try again.";
		message.className = "msg bad";
	}
}

// Check Puzzle 3's riddle and reveal the final message.
function checkRiddleAnswer() {
	const answer = document.getElementById("riddleAnswer").value.trim().toLowerCase();
	const message = document.getElementById("riddleMessage");

	if (answer === "hole") {
		document.getElementById("puzzle").classList.add("hidden");
		document.getElementById("message").classList.remove("hidden");
	} else {
		message.textContent = "Not quite. Try again.";
		message.className = "msg bad";
	}
}

// Connect the page buttons to their actions.
toggleButton.addEventListener("click", toggleCard);
secretButton.addEventListener("click", showPasswordGate);
document.getElementById("passwordBtn").addEventListener("click", checkCardPassword);
document.getElementById("checkBtn").addEventListener("click", checkFirstPuzzle);
document.getElementById("checkPasscodeBtn").addEventListener("click", checkPasscode);
document.getElementById("checkRiddleBtn").addEventListener("click", checkRiddleAnswer);