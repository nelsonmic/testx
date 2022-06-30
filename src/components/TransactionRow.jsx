import { Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import NoRecentTransactions from "./NoRecentTransactions";
import * as utils from ".././utils";

const TransactionRow = ({ transactions, children }) => {
  return transactions.length === 0 ? (
    <NoRecentTransactions />
  ) : (
    transactions.slice(0, 6).map((transaction, index) => {
      const {
        receiver,
        time_created,
        hash,
        narration,
        money_sent,
        fees,
        current_balance,
        previous_balance,
      } = transaction;
      return (
        <Link
          to={`/t/${receiver}/${time_created}/${hash}/${narration}/${money_sent}/${fees}/${current_balance}/${previous_balance}`}
          key={index}
        >
          <HStack
            key={index}
            spacing={4}
            justify="space-between"
            className="transaction-row"
          >
            <HStack spacing={4}>
              <span className="svg">
                {transaction.type === "Debit" ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.33491 14.6703C7.12047 14.4593 7 14.1732 7 13.8749C7 13.5766 7.12047 13.2905 7.33491 13.0795L14.1982 6.32939C14.4127 6.11848 14.7036 6 15.0069 6C15.3102 6 15.6011 6.11848 15.8156 6.32939L22.6789 13.0795C22.8873 13.2917 23.0026 13.5758 23 13.8708C22.9974 14.1658 22.877 14.448 22.665 14.6565C22.4529 14.8651 22.166 14.9834 21.8661 14.986C21.5661 14.9886 21.2772 14.8752 21.0615 14.6703L16.1508 9.84056V22.875C16.1508 23.1734 16.0303 23.4595 15.8157 23.6705C15.6012 23.8815 15.3103 24 15.0069 24C14.7035 24 14.4126 23.8815 14.1981 23.6705C13.9835 23.4595 13.863 23.1734 13.863 22.875V9.84056L8.95236 14.6703C8.73785 14.8812 8.44695 14.9996 8.14363 14.9996C7.84032 14.9996 7.54942 14.8812 7.33491 14.6703V14.6703Z"
                      fill="#FF0000"
                    />
                    <rect
                      width="30"
                      height="30"
                      rx="8"
                      fill="#FF3A3A"
                      fillOpacity="0.2"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="30"
                      height="30"
                      rx="8"
                      fill="#09D85C"
                      fillOpacity="0.2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.6651 15.3297C22.8795 15.5407 23 15.8268 23 16.1251C23 16.4234 22.8795 16.7095 22.6651 16.9205L15.8018 23.6706C15.5873 23.8815 15.2964 24 14.9931 24C14.6898 24 14.3989 23.8815 14.1844 23.6706L7.3211 16.9205C7.11273 16.7083 6.99744 16.4242 7.00004 16.1292C7.00265 15.8342 7.12295 15.552 7.33503 15.3435C7.54712 15.1349 7.83402 15.0166 8.13394 15.014C8.43386 15.0114 8.72281 15.1248 8.93854 15.3297L13.8492 20.1594L13.8492 7.12502C13.8492 6.82664 13.9697 6.54049 14.1843 6.32951C14.3988 6.11853 14.6897 6 14.9931 6C15.2965 6 15.5874 6.11853 15.8019 6.32951C16.0165 6.54049 16.137 6.82664 16.137 7.12502V20.1594L21.0476 15.3297C21.2622 15.1188 21.5531 15.0004 21.8564 15.0004C22.1597 15.0004 22.4506 15.1188 22.6651 15.3297V15.3297Z"
                      fill="#0ACF83"
                    />
                  </svg>
                )}
              </span>
              <span className="info">
                <p className="transaction-type">{transaction.details}</p>
                <p className="transaction-date">
                  {utils.formatDate(transaction.time_created)}
                </p>
              </span>
            </HStack>
            <span className="amount">
              <HStack spacing={1} justify="flex-end">
                {children}
                <p
                  className={`amount-value ${
                    transaction.type === "Debit" ? "debit-text" : "credit-text"
                  }`}
                >
                  {utils.numbersWithCommas(
                    utils.truncateDecimals(transaction.money_sent)
                  )}
                </p>
              </HStack>
              {/* <p
              className={`status ${
                transaction.status === "Confirmed"
                  ? "success-state credit-text"
                  : transaction.status === "Failed"
                  ? "failed-state debit-text"
                  : "pending-state pending-text"
              }`}
            >
              {transaction.status}
            </p> */}
            </span>
          </HStack>
        </Link>
      );
    })
  );
};

export default TransactionRow;
