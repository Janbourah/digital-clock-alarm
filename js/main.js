// DOM Elements
const clockDisplay = document.getElementById("clockDisplay");
const alarmInput = document.getElementById("alarmInput");
const setAlarmBtn = document.getElementById("setAlarmBtn");
const alarmStatus = document.getElementById("alarmStatus");
const alertArea = document.getElementById("alertArea");
const snoozeBtn = document.getElementById("snoozeBtn");
const stopBtn = document.getElementById("stopBtn");

// Variables
let alarmTime = null; // Format: "HH:MM"
let isRinging = false;
// Using a free sample audio file for the alarm sound
const alarmAudio = new Audio("music/song.mp3");
alarmAudio.loop = true;
// 3. Trigger Alarm
function triggerAlarm() {
  isRinging = true;
  alarmAudio.play();
  alertArea.style.display = "block";
}
// 1. Live Clock Function
function updateClock() {
  const now = new Date();

  // Format to ensure two digits (e.g., "09" instead of "9")
  const hours = String(now.getHours()).padStart(2 ,"0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Display HH:MM:SS
  clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  // Check if current time matches alarm time
  // We only trigger at the exact 0th second of that minute so it doesn't re-trigger repeatedly
  if (
    alarmTime === `${hours}:${minutes}` &&
    now.getSeconds() === 0 &&
    !isRinging
  ) {
    triggerAlarm();
  }
}

// Helper function to silence audio and hide UI
function stopRinging() {
  isRinging = false;
  alarmAudio.pause();
  alarmAudio.currentTime = 0; // Reset audio to beginning
  alertArea.style.display = "none";
}



// 2. Alarm Setup
setAlarmBtn.addEventListener("click", () => {
  if (alarmInput.value) {
    alarmTime = alarmInput.value;
    alarmStatus.textContent = `Alarm set for ${alarmTime}`;
  }
});


// 4. Hard Mode: Snooze Logic
snoozeBtn.addEventListener("click", () => {
  stopRinging();

  // Calculate new time: current time + 2 minutes
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2);

  const newHours = String(now.getHours()).padStart(2, "0");
  const newMinutes = String(now.getMinutes()).padStart(2, "0");

  alarmTime = `${newHours}:${newMinutes}`;

  // Update the UI to reflect the new snooze time
  alarmInput.value = alarmTime;
  alarmStatus.textContent = `Snoozed! Next alarm at ${alarmTime}`;
});

// 5. Stop Alarm Completely
stopBtn.addEventListener("click", () => {
  stopRinging();
  alarmTime = null; // Clear the alarm
  alarmInput.value = "";
  alarmStatus.textContent = "Alarm stopped and cleared";
});



// Initialize the clock immediately, then update every 1000ms (1 second)
updateClock();
setInterval(updateClock, 1000);
