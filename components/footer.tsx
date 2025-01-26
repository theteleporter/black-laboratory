'use client'

import { useEffect, useState } from 'react'
import { Kbd } from './kbd'
import { Fingerprint } from 'lucide-react'

function getFormattedDate() {
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

  return `© ${year}${month}${day}_${hours}${minutes}${seconds}.${milliseconds}_${timezoneStr}`;
}

export default function Footer() {
  const [formattedDate, setFormattedDate] = useState(getFormattedDate());
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      setFormattedDate(getFormattedDate());
    };

    const dateInterval = setInterval(updateDate, 1); // Update every millisecond
    const spinInterval = setInterval(() => {
      setIsSpinning((prev) => !prev); // Toggle spin state every 3 seconds
    }, 6000); // 6 seconds total (3 seconds spin + 3 seconds pause)

    return () => {
      clearInterval(dateInterval);
      clearInterval(spinInterval);
    };
  }, []);

  return (
    <footer className="mt-16 pb-8 text-xs font-extralight text-stone-300">
      <div className="pt-8">
      <div className='items-center flex gap-1 mb-2'><Kbd size="sm">⌘K</Kbd> or 2 <Kbd><Fingerprint className="w-3 h-3" /></Kbd> taps to search</div>
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
          <a href="https://theteleporter.vercel.app" className="text-stone-400 hover:cursor-pointer">THE TELEPORTER</a>
        </p>
      </div>
    </footer>
  );
}

