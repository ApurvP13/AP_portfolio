/* 
typewriter effect
*/

const words = [
  "Dev_",
  "Designer_",
  "Coder_",
  "Creator_",
  "Artist_",
  "Wizard_",
  "Chill Guy_",
];

// Element reference
const textElement = document.getElementById("text");

// Settings
const typingSpeed = 150; // milliseconds between each character
const wordPause = 1000; // time to pause after word is typed
const deletingSpeed = 100; // speed to delete the word

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

export function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    // Deleting mode
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex <= 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, typingSpeed);
    } else {
      setTimeout(typeEffect, deletingSpeed);
    }
  } else {
    // Typing mode
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, wordPause);
    } else {
      setTimeout(typeEffect, typingSpeed);
    }
  }
}

// Start the animation
typeEffect();
