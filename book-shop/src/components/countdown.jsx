import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const [countDown, setCountDown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newCountDown = calculateCountdown(targetDate);
            if (newCountDown.days <= 0 &&
                newCountDown.hours <= 0 &&
                newCountDown.minutes <= 0 &&
                newCountDown.seconds <= 0) {
                clearInterval(intervalId); 
            }
            setCountDown(newCountDown);
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [targetDate]); 

    const calculateCountdown = (targetDate) => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const renderCountdown = () => {
        const { days, hours, minutes, seconds } = countDown;

        return (
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": days }}>{days}</span>
                    </span>
                    days
                </div>
                <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": hours }}>{hours}</span>
                    </span>
                    hours
                </div>
                <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": minutes }}>{minutes}</span>
                    </span>
                    min
                </div>
                <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": seconds }}>{seconds}</span>
                    </span>
                    sec
                </div>
            </div>
        );
    };

    return renderCountdown();
};

export default Countdown;
