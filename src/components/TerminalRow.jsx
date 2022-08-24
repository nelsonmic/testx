import { Link } from "react-router-dom";
import { HStack, VStack } from "@chakra-ui/react";
import NoRecentTransactions from "./NoRecentTransactions";

const TerminalRow = ({ terminals, slice }) => {
      return terminals.length === 0 ? (
            <NoRecentTransactions />
      ) : (
            terminals.slice(0, slice).map((terminal, index) => {
                  const {
                        agent_name,
                        aggregator_name,
                        state_head_name,
                        serial_number,
                        phone_number,
                        pos_type,
                        location,
                        today,
                        yesterday,
                        last_seven_days
                  } = terminal;
                  return (
                        <Link
                              key={index}
                              to={`/terminal/summary/${agent_name}/${aggregator_name}/${state_head_name}/${serial_number}/${phone_number}/${pos_type}/${location}/${today}/${yesterday}/${last_seven_days}`}
                        >
                              <VStack spacing={2} className="transaction-row">
                                    <HStack
                                          spacing={4}
                                          justify="space-between"
                                          className="transaction-row-content"
                                    >
                                          <HStack spacing={4}>
                                                <span className="info">
                                                      <p className="transaction-type">Agent name</p>
                                                      <p className="transaction-date">
                                                            {agent_name}
                                                      </p>
                                                </span>
                                          </HStack>
                                          <HStack spacing={4}>
                                                <span className="info">
                                                      <p className="transaction-type">Aggregator name</p>
                                                      <p className="transaction-date">
                                                            {aggregator_name}
                                                      </p>
                                                </span>
                                          </HStack>

                                    </HStack>

                                    <HStack
                                          spacing={4}
                                          justify="space-between"
                                          className="transaction-row-content"
                                    >
                                          <HStack spacing={4}>
                                                <span className="info">
                                                      <p className="transaction-type">State-head name</p>
                                                      <p className="transaction-date">
                                                            {state_head_name}
                                                      </p>
                                                </span>
                                          </HStack>
                                          <HStack spacing={4}>
                                                <span className="info">
                                                      <p className="transaction-type">Serial number</p>
                                                      <p className="transaction-date">
                                                            {serial_number}
                                                      </p>
                                                </span>
                                          </HStack>

                                    </HStack>
                              </VStack>
                        </Link>
                  );
            })
      );
};

export default TerminalRow;
