import { motion } from "framer-motion";

function FadeIn({ children, delay = 0 }) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.6,
                delay
            }}

        >

            {children}

        </motion.div>

    );

}

export default FadeIn;