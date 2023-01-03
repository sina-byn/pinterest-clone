import { useEffect, useState } from 'react';

const useScrollToBottom = (onScrollToBottom: Function) => {
    const [triggered, setTriggered] = useState<boolean>(false);

    useEffect(() => {
        const scrollHandler = async () => {
            if ((window.innerHeight  + window.scrollY) < document.body.offsetHeight) return;

            if (!triggered) {
                setTriggered(true);
                await onScrollToBottom();
                setTriggered(false);
            }
        };

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [triggered]);
};

export default useScrollToBottom;