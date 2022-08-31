import { Link } from "react-router-dom";
import { HStack, VStack } from "@chakra-ui/react";
import NoRecentTransactions from "./NoRecentTransactions";

const AgentTerminalRow = ({ terminals, slice }) => {
      return terminals.length === 0 ? (
            <NoRecentTransactions />
      ) : (
            terminals.slice(0, slice).map((terminal, index) => {
                  const {
                        amount,
                        maskedpan,
                        payment_date,
                        sync_date,
                        rrn,
                        status_desc,
                        terminal_id,
                        transaction_ref,
                  } = terminal;
                  return (
                        <Link
                              key={index}
                              to={`/agent-terminal/summary/${amount}/${maskedpan}/${payment_date}/${sync_date}/${rrn}/${status_desc}/${terminal_id}/${transaction_ref}`}
                        >
                              <VStack spacing={2} className="transaction-row">
                                    <HStack
                                          spacing={4}
                                          justify="space-between"
                                          className="transaction-row-content"
                                    >
                                          <HStack spacing={4}>
                                                <span className="info">
                                                      <p className="transaction-type">Date</p>
                                                      <p className="transaction-date">
                                                            {payment_date}
                                                      </p>
                                                </span>
                                          </HStack>
                                          <HStack spacing={4}>
                                                <span className="info">
                                                      <p className="transaction-type" style={{ textAlign: "right" }}>Terminal ID</p>
                                                      <p className="transaction-date">
                                                            {terminal_id}
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
                                                      <p className="transaction-type">Amount</p>
                                                      <p className="transaction-date">
                                                            {amount}
                                                      </p>
                                                </span>
                                          </HStack>
                                          <HStack spacing={4}>
                                                <span className="info">
                                                      <p className="transaction-type" style={{ textAlign: "right" }}>Status</p>
                                                      <p className="transaction-date">
                                                            {status_desc}
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

export default AgentTerminalRow;
