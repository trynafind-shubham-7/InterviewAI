import { motion } from "framer-motion";

function ScaleCard({ children }) {

    return (

        <motion.div

            whileHover={{
                scale: 1.04
            }}

            whileTap={{
                scale: 0.98
            }}

            transition={{
                duration: 0.2
            }}

        >

            {children}

        </motion.div>

    );

}

export default ScaleCard;