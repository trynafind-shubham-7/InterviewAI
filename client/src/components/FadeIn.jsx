import { motion } from "framer-motion";

function FadeIn({ children, delay = 0, duration = 0.5, direction = "up", className = "" }) {
    const directions = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 },
        none: { x: 0, y: 0 },
    };

    const initialOffset = directions[direction] || directions.up;

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...initialOffset
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default FadeIn;