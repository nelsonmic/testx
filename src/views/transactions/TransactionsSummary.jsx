import { useParams } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import BackButton from "../../components/BackButton";
import * as utils from "../../utils";

const TransactionsSummary = () => {
  console.log(useParams());
  const {
    receipient,
    date,
    referenceno,
    desc,
    amount,
    fee,
    curbalance,
    prevbalance,
  } = useParams();
  return (
    <div className="transactions-summary">
      <BackButton />
      <h1 className="page-name">Summary</h1>
      <AnimatedPage>
        <div className="wrapper">
          <main>
            <div className="summary-icon">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 6.25V23.75H25V6.25H5ZM3.75 3.75H26.25C26.5815 3.75 26.8995 3.8817 27.1339 4.11612C27.3683 4.35054 27.5 4.66848 27.5 5V25C27.5 25.3315 27.3683 25.6495 27.1339 25.8839C26.8995 26.1183 26.5815 26.25 26.25 26.25H3.75C3.41848 26.25 3.10054 26.1183 2.86612 25.8839C2.6317 25.6495 2.5 25.3315 2.5 25V5C2.5 4.66848 2.6317 4.35054 2.86612 4.11612C3.10054 3.8817 3.41848 3.75 3.75 3.75ZM18.4913 12.2413L16.25 10H22.5V16.25L20.2588 14.0087L15.4288 18.8387L12.7775 16.1875L9.24125 19.7225L7.47375 17.955L12.7775 12.6513L15.4288 15.3038L18.4913 12.2413Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
            <h1 className="header-text">Transaction Summary</h1>
            <div className="summary-container">
              <div className="summary-item">
                <p>Receipient</p>
                <p>{receipient}</p>
              </div>
              <div className="summary-item">
                <p>Amount</p>
                <p>{utils.numbersWithCommas(utils.truncateDecimals(amount))}</p>
              </div>
              <div className="summary-item">
                <p>Narration</p>
                <p>{desc}</p>
              </div>
              <div className="summary-item">
                <p>Date</p>
                <p>{utils.formatDate(date)}</p>
              </div>
              <div className="summary-item">
                <p>Fee</p>
                <p>{utils.numbersWithCommas(utils.truncateDecimals(fee))}</p>
              </div>

              <div className="summary-item flex">
                <span>
                  <p>Current Balance</p>
                  <p>
                    {utils.numbersWithCommas(
                      utils.truncateDecimals(curbalance)
                    )}
                  </p>
                </span>

                <span>
                  <p>Previous Balance</p>
                  <p>
                    {utils.numbersWithCommas(
                      utils.truncateDecimals(prevbalance)
                    )}
                  </p>
                </span>
              </div>

              <div className="summary-item">
                <p>Reference Number</p>
                <p>{referenceno}</p>
              </div>
            </div>
            <div className="send">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                color="#ff0000"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </div>
          </main>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default TransactionsSummary;
