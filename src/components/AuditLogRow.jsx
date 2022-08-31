
import { HStack, VStack } from "@chakra-ui/react";
import NoRecentTransactions from "./NoRecentTransactions";
import * as utils from '../utils'

const AuditLogRow = ({ transactions }) => {
      return transactions.length === 0 ? (
            <NoRecentTransactions />
      ) : (
            transactions.map((log, index) => {
                  const {
                        details,
                        profit,
                        time_attended,
                        token_sent,
                  } = log;
                  return (
                        <VStack spacing={2} className="transaction-row" key={index}>
                              <HStack
                                    spacing={4}
                                    justify="space-between"
                                    className="transaction-row-content"
                              >
                                    <HStack spacing={4}>
                                          <span className="info">
                                                <p className="transaction-type">Details</p>
                                                <p className="transaction-date">
                                                      {details}
                                                </p>
                                          </span>
                                    </HStack>
                                    <HStack spacing={4}>
                                          <span className="info">
                                                <p className="transaction-type">Profit</p>
                                                <p className="transaction-date  right">
                                                      {profit}
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
                                                <p className="transaction-type">Time Attended</p>
                                                <p className="transaction-date">
                                                      {utils.formatDate(time_attended)}
                                                </p>
                                          </span>
                                    </HStack>
                                    <HStack spacing={4}>
                                          <span className="info">
                                                <p className="transaction-type">Token Sent</p>
                                                <p className="transaction-date right">
                                                      {token_sent}
                                                </p>
                                          </span>
                                    </HStack>

                              </HStack>
                        </VStack>

                  );
            })
      );
};

export default AuditLogRow;
