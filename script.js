 // Clock functionality
    function createClockFace() {
      const hourMarks = document.getElementById('hour-marks');
      const hourNumbers = document.getElementById('hour-numbers');
      
      // Create hour marks (60 marks for each minute)
      for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        mark.className = 'hour-mark';
        mark.style.transform = `rotate(${i * 6}deg)`;
        
        // Make hour marks (every 5 minutes) slightly longer
        if (i % 5 === 0) {
          mark.style.height = '16px';
          mark.style.width = '5px';
          mark.style.opacity = '1';
        }
        
        hourMarks.appendChild(mark);
      }
      
      // Create hour numbers (1-12)
      for (let i = 1; i <= 12; i++) {
        const number = document.createElement('div');
        number.className = 'hour-number';
        number.textContent = i;
        
        // Position numbers around the clock
        const angle = (i * 30) * (Math.PI / 180); // Convert to radians
        const radius = 110; // Distance from center
        const x = 150 + radius * Math.sin(angle) - 15;
        const y = 150 - radius * Math.cos(angle) - 15;
        
        number.style.left = `${x}px`;
        number.style.top = `${y}px`;
        
        hourNumbers.appendChild(number);
      }
    }

    function updateClock() {
      const now = new Date();
      
      // Extract time values
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      
      // Calculate angles for clock hands
      const secondAngle = (seconds + milliseconds / 1000) * 6; // 360/60 = 6 degrees per second
      const minuteAngle = (minutes + seconds / 60) * 6; // 6 degrees per minute
      const hourAngle = (hours % 12 + minutes / 60) * 30; // 360/12 = 30 degrees per hour
      
      // Update clock hands
      document.getElementById('second-hand').style.transform = `rotate(${secondAngle}deg)`;
      document.getElementById('minute-hand').style.transform = `rotate(${minuteAngle}deg)`;
      document.getElementById('hour-hand').style.transform = `rotate(${hourAngle}deg)`;
      
      // Update digital time
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      
      const timeStr = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      document.getElementById('digital-time').textContent = timeStr;
      document.getElementById('time-display').textContent = timeStr;
      document.getElementById('ampm-display').textContent = ampm;
      
      // Update date display
      const day = now.getDate();
      const monthYear = now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      
      document.getElementById('date-day').textContent = day;
      document.getElementById('date-month-year').textContent = monthYear;
    }

    // Timer functionality
    let timerInterval;
    let timerRunning = false;
    let timerTime = 0;
    let timerCurrent = 0;

    function updateTimerDisplay() {
      let hours = Math.floor(timerCurrent / 3600);
      let minutes = Math.floor((timerCurrent % 3600) / 60);
      let seconds = timerCurrent % 60;
      
      hours = hours.toString().padStart(2, '0');
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
      
      document.getElementById('timer-display').textContent = 
        hours === '00' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
    }

    function startTimer() {
      if (timerRunning) return;
      
      const hours = parseInt(document.getElementById('hours').value) || 0;
      const minutes = parseInt(document.getElementById('minutes').value) || 0;
      const seconds = parseInt(document.getElementById('seconds').value) || 0;
      
      if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please set a timer value greater than 0');
        return;
      }
      
      timerTime = hours * 3600 + minutes * 60 + seconds;
      timerCurrent = timerTime;
      
      updateTimerDisplay();
      
      timerInterval = setInterval(() => {
        timerCurrent--;
        updateTimerDisplay();
        
        if (timerCurrent <= 0) {
          clearInterval(timerInterval);
          timerRunning = false;
          document.getElementById('start-timer').disabled = false;
          document.getElementById('pause-timer').disabled = true;
          alert('Timer finished!');
          playSound();
        }
      }, 1000);
      
      timerRunning = true;
      document.getElementById('start-timer').disabled = true;
      document.getElementById('pause-timer').disabled = false;
    }

    function pauseTimer() {
      if (!timerRunning) return;
      
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById('start-timer').disabled = false;
      document.getElementById('pause-timer').disabled = true;
    }

    function resetTimer() {
      clearInterval(timerInterval);
      timerRunning = false;
      timerCurrent = timerTime;
      updateTimerDisplay();
      document.getElementById('start-timer').disabled = false;
      document.getElementById('pause-timer').disabled = true;
    }

    // Stopwatch functionality
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;
    let lapCount = 1;

    function updateStopwatchDisplay() {
      let hours = Math.floor(stopwatchTime / 360000);
      let minutes = Math.floor((stopwatchTime % 360000) / 6000);
      let seconds = Math.floor((stopwatchTime % 6000) / 100);
      let milliseconds = stopwatchTime % 100;
      
      hours = hours.toString().padStart(2, '0');
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
      milliseconds = milliseconds.toString().padStart(2, '0');
      
      document.getElementById('stopwatch-display').textContent = 
        `${minutes}:${seconds}.${milliseconds}`;
    }

    function startStopwatch() {
      if (stopwatchRunning) return;
      
      stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay();
      }, 10);
      
      stopwatchRunning = true;
      document.getElementById('start-stopwatch').disabled = true;
      document.getElementById('pause-stopwatch').disabled = false;
    }

    function pauseStopwatch() {
      if (!stopwatchRunning) return;
      
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
      document.getElementById('start-stopwatch').disabled = false;
      document.getElementById('pause-stopwatch').disabled = true;
    }

    function resetStopwatch() {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
      stopwatchTime = 0;
      lapCount = 1;
      updateStopwatchDisplay();
      document.getElementById('start-stopwatch').disabled = false;
      document.getElementById('pause-stopwatch').disabled = true;
      document.getElementById('stopwatch-laps').innerHTML = '';
    }

    function lapStopwatch() {
      if (!stopwatchRunning) return;
      
      const lapTime = document.getElementById('stopwatch-display').textContent;
      const lapItem = document.createElement('div');
      lapItem.className = 'lap-item';
      lapItem.innerHTML = `<span>Lap ${lapCount}</span><span>${lapTime}</span>`;
      document.getElementById('stopwatch-laps').prepend(lapItem);
      lapCount++;
    }

    // Alarm functionality
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

    function saveAlarms() {
      localStorage.setItem('alarms', JSON.stringify(alarms));
    }

    function renderAlarms() {
      const alarmList = document.getElementById('alarm-list');
      alarmList.innerHTML = '';
      
      alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        
        const alarmTime = document.createElement('div');
        alarmTime.className = 'alarm-time';
        alarmTime.textContent = alarm.time;
        
        const alarmActions = document.createElement('div');
        alarmActions.className = 'alarm-actions';
        
        const alarmToggle = document.createElement('div');
        alarmToggle.className = `alarm-toggle ${alarm.active ? 'active' : ''}`;
        alarmToggle.addEventListener('click', () => toggleAlarm(index));
        
        const deleteAlarm = document.createElement('button');
        deleteAlarm.className = 'delete-alarm';
        deleteAlarm.innerHTML = '&times;';
        deleteAlarm.addEventListener('click', () => deleteAlarmItem(index));
        
        alarmActions.appendChild(alarmToggle);
        alarmActions.appendChild(deleteAlarm);
        
        alarmItem.appendChild(alarmTime);
        alarmItem.appendChild(alarmActions);
        
        alarmList.appendChild(alarmItem);
      });
    }

    function addAlarm() {
      const alarmTimeInput = document.getElementById('alarm-time');
      const time = alarmTimeInput.value;
      
      if (!time) {
        alert('Please select a time for the alarm');
        return;
      }
      
      alarms.push({
        time: time,
        active: true
      });
      
      saveAlarms();
      renderAlarms();
      alarmTimeInput.value = '';
    }

    function toggleAlarm(index) {
      alarms[index].active = !alarms[index].active;
      saveAlarms();
      renderAlarms();
    }

    function deleteAlarmItem(index) {
      alarms.splice(index, 1);
      saveAlarms();
      renderAlarms();
    }

    function checkAlarms() {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      alarms.forEach(alarm => {
        if (alarm.active && alarm.time === currentTime) {
          playSound();
          alert(`Alarm! It's ${alarm.time}`);
        }
      });
    }

    function playSound() {
      // In a real application, you would play an actual sound file
      // For this demo, we'll just use the browser's beep
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
      } catch (e) {
        // Fallback for browsers that don't support Web Audio API
        console.log("Beep! Alarm triggered.");
      }
    }

    // Navigation functionality
    function setupNavigation() {
      const navButtons = document.querySelectorAll('.nav-btn');
      
      navButtons.forEach(button => {
        button.addEventListener('click', () => {
          const target = button.getAttribute('data-target');
          
          // Update active button
          navButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Show/hide sections
          document.getElementById('clock-view').classList.add('hidden');
          document.getElementById('timer-view').classList.add('hidden');
          document.getElementById('stopwatch-view').classList.add('hidden');
          document.getElementById('alarm-view').classList.add('hidden');
          document.getElementById('blog-view').classList.add('hidden');
          
          if (target === 'clock') {
            document.getElementById('clock-view').classList.remove('hidden');
          } else if (target === 'timer') {
            document.getElementById('timer-view').classList.remove('hidden');
          } else if (target === 'stopwatch') {
            document.getElementById('stopwatch-view').classList.remove('hidden');
          } else if (target === 'alarm') {
            document.getElementById('alarm-view').classList.remove('hidden');
          } else if (target === 'blog') {
            document.getElementById('blog-view').classList.remove('hidden');
          }
        });
      });
    }

    // Initialize the application
    document.addEventListener('DOMContentLoaded', () => {
      // Start the clock
      createClockFace();
      updateClock();
      setInterval(updateClock, 100);
      
      // Set up timer controls
      document.getElementById('start-timer').addEventListener('click', startTimer);
      document.getElementById('pause-timer').addEventListener('click', pauseTimer);
      document.getElementById('reset-timer').addEventListener('click', resetTimer);
      
      // Set up stopwatch controls
      document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
      document.getElementById('pause-stopwatch').addEventListener('click', pauseStopwatch);
      document.getElementById('lap-stopwatch').addEventListener('click', lapStopwatch);
      document.getElementById('reset-stopwatch').addEventListener('click', resetStopwatch);
      
      // Set up alarm controls
      document.getElementById('add-alarm').addEventListener('click', addAlarm);
      
      // Set up navigation
      setupNavigation();
      
      // Render existing alarms
      renderAlarms();
      
      // Check alarms every minute
      setInterval(checkAlarms, 60000);
    });
 