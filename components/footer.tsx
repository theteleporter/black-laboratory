'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [formattedDate, setFormattedDate] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
      const timezone = -now.getTimezoneOffset() / 60;
      const timezoneStr = timezone >= 0 ? `UTC+${timezone}` : `UTC${timezone}`;

      setFormattedDate(
        `© ${year}${month}${day}_${hours}${minutes}${seconds}.${milliseconds}_${timezoneStr}`
      );
    };

    const interval = setInterval(updateDate, 1); // Update every millisecond
    return () => clearInterval(interval);
  }, []);

  // Handle the fast spinning and pausing
  useEffect(() => {
    const spinInterval = setInterval(() => {
      setIsSpinning((prev) => !prev); // Toggle spin state every 3 seconds
    }, 6000); // 6 seconds total (3 seconds spin + 3 seconds pause)

    return () => clearInterval(spinInterval);
  }, []);

  return (
    <footer className="mt-16 pb-8 text-xs font-extralight text-stone-300">
      <div className="pt-8">
        <p>{formattedDate} BLACK LABS</p>
        <p className="flex items-center space-x-2">
          <span
            className={`${
              isSpinning ? 'spin-animation' : ''
            } inline-block`}
            style={{
              transition: 'transform 0.5s linear', // Fast rotation
              transform: isSpinning ? 'rotate(360deg)' : 'none', // Toggle rotation
            }}
          >
            /
          </span>
          <a href="https://theteleporter.me" className="text-stone-400 hover:cursor-pointer">THE TELEPORTER</a>
        </p>
      </div>
    </footer>
  );
}