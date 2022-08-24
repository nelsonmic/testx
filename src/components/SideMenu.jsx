import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const animations = {
      initial: { opacity: 0, x: -80 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -80 },
};

const SideMenu = ({ close }) => {
      return (
            <motion.div
                  variants={animations}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="side-menu"
            >
                  <p onClick={() => close(false)} className="close">Close</p>
                  <ul>
                        <li><Link to="/terminal/agent">Agent</Link></li>
                        <li><Link to="/">StateHead</Link></li>
                        <li><Link to="terminal/aggregator">Aggregator</Link></li>
                        <li><Link to="/">Member</Link></li>
                  </ul>
            </motion.div>
      )
}

export default SideMenu;