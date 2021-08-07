import React, { useEffect, useState } from 'react';

export default ({ date }) => {
  const [time, setTime] = useState('Now');
  function Timing() {
    const msMin = 60 * 1000;
    const msH = msMin * 60;
    const msD = msH * 24;
    const msW = msD * 7;
    const msMon = msD * 30;
    const now = new Date();
    const then = new Date(date || null);
    const dif = now.getTime() - then.getTime();
    if (dif < msMin) {
      setTime('Now');
    } else if (dif < msH) {
      setTime(Math.round(dif / msMin) + ' min');
    } else if (dif < msD) {
      setTime(Math.round(dif / msH) + ' hour');
    } else if (dif < msW) {
      setTime(Math.round(dif / msD) + ' day');
    } else if (dif < msMon) {
      setTime(Math.round(dif / msW) + ' week');
    } else if (now.getFullYear() === then.getFullYear()) {
      setTime(
        new Date(date).toLocaleDateString('en-GB', {
          month: 'long',
          day: 'numeric',
        })
      );
    } else {
      setTime(
        new Date(date).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
    }
  }
  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      Timing();
      setInterval(Timing, 60000);
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span>{time}</span>;
};
