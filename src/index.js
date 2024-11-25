import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import BCSBanner from './images/bcs2024/BCS-2425-banner.jpg';
import BCSLogo from './images/bcs2024/bcs24-25-logo-sm.png';
import Victor from './images/victor.jpg';
import Hitler from './images/hitler.svg';

const root = ReactDOM.createRoot(document.getElementById('root'));

const CountdownTimer = () => {
  const targetDate = new Date('2024-12-07T08:00:00');

  const countDown = () => {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const [timeLeft, setTimeLeft] = useState(countDown());

  useEffect(() => {
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(countDown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div style={styles.container}>
      <img src={BCSBanner} />
      <h1 style={styles.timer}>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </h1>
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <h2>Time's up!</h2>
      )}
      <img src={BCSLogo} />
      <div>
        <img src={Victor} width='80' height='80' />
        <img src={Hitler} style={styles.rotate} width='80' height='80' />
        <img src={Victor} style={styles.flipped} width='80' height='80' />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
  },
  timer: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'red'
  },
  flipped: {
    transform: 'scaleX(-1)',
  },
  rotate: {
    animation: 'rotate 3s linear infinite'
  }
};

const rotateKeyframes = `
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = rotateKeyframes;
document.head.appendChild(styleSheet);

root.render(<CountdownTimer />);
