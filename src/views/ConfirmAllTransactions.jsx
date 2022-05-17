//
import BackButton from "../components/BackButton";

//router
import { useOutletContext } from "react-router-dom";

const ConfirmAllTransactions = () => {
  const [
    allBanks,
    setSelectedBank,
    setSelectBankCode,
    transactionHash,
    accountNumber,
    amount,
    selectedBank,
    receipientName,
  ] = useOutletContext();
  console.log(
    allBanks,
    setSelectedBank,
    setSelectBankCode,
    transactionHash,
    accountNumber,
    amount,
    selectedBank,
    receipientName
  );
  return (
    <div className="confirm-all-transactions">
      <BackButton />
      <h1 className="page-name">Confirm Transaction</h1>
      <div className="wrapper">
        <main>
          <h1>
            {receipientName} | {selectedBank}
          </h1>
          <p>Are you sure you want to confirm all transactions?</p>
          <button>Confirm All Transactions</button>
        </main>
      </div>
    </div>
  );
};

export default ConfirmAllTransactions;
