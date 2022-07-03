import AnimatedPage from "../../components/AnimatedPage";

const Transactions = () => {
  return (
    <div className="all-transactions">
      <h1 className="page-name">All Transactions</h1>
      <AnimatedPage>
        <div className="wrapper">
          <main></main>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default Transactions;
