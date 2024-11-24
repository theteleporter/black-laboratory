import { useEffect, useState } from 'react'

export default function Footer() {
  const [formattedDate, setFormattedDate] = useState('');

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

  return (
    <footer className="mt-16 pb-8 text-xs font-extralight text-stone-300">
      <div className="pt-8">
        <p>{formattedDate} BLACK LABS</p>
        <p>/ <a href="https://theteleporter.me" className="text-stone-400 hover:cursor-pointer">THE TELEPORTER</a></p>
      </div>
    </footer>
  );
}

