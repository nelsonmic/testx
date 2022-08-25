import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
      Accordion,
      AccordionItem,
      AccordionButton,
      AccordionPanel,
      Box,

} from '@chakra-ui/react'

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

                  <Accordion allowMultiple className="accordion">

                        <AccordionItem>
                              {({ isExpanded }) => (
                                    <>
                                          <h2>
                                                <AccordionButton>
                                                      <Box flex='1' textAlign='left'>
                                                            Terminals
                                                      </Box>
                                                      {isExpanded ? (
                                                            "-"
                                                      ) : (
                                                            "+"
                                                      )}
                                                </AccordionButton>
                                          </h2>
                                          <AccordionPanel pb={4}>
                                                <ul className="sub-menu">
                                                      <li><Link to="/terminal/agent">Agent</Link></li>
                                                      <li><Link to="/terminal/statehead">StateHead</Link></li>
                                                      <li><Link to="terminal/aggregator">Aggregator</Link></li>
                                                      <li><Link to="/">Audit-log</Link></li>
                                                </ul>
                                          </AccordionPanel>
                                    </>
                              )}
                        </AccordionItem>
                        <ul className="other-menus">
                              <li><Link to="/">My cards</Link></li>
                              <li><Link to="/">Request card</Link></li>
                        </ul>
                  </Accordion>
            </motion.div>
      )
}

export default SideMenu;