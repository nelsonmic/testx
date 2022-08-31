//react
import { useEffect, useState } from 'react';
//api
import useGetOverviewHistory from '../../apis/history/useGetOverviewHistory'
//components
import TransactionRow from '../../components/TransactionRow'
import CardSkeleton from '../../components/CardSkeleton'
import AnimatedPage from "../../components/AnimatedPage";
import { Input } from '@chakra-ui/react';
import PaginationButton from '../../components/PaginationButton';
import { Link } from 'react-router-dom';


const Transactions = () => {
  const [overviewHistory, setOverviewHistory] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0)

  const {
    isSuccess: isSuccessHistory,
    data: dataHistory,
    isLoading: isOverviewHistoryLoader,
    isFetching,
  } = useGetOverviewHistory(page)

  useEffect(() => {

    if (isSuccessHistory) {
      setOverviewHistory(dataHistory.data.data.transfers)
      setTotal(dataHistory.data.data.pagination.total_pages)
    }
  }, [
    isSuccessHistory,
    dataHistory,
    setOverviewHistory,
  ])

  return (
    <div className="all-transactions">
      <h1 className="page-name">All Transactions</h1>
      <AnimatedPage>
        <div className="wrapper">
          <main>
            <div className="search-wrapper">
              <span className='audit-log'><Link to="/terminal/audit-log">Audit-log</Link></span>
              <Input placeholder="Search" type="search" />
            </div>
            {isFetching &&
              <span className='refetching'>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 57 57"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  color="#d4000080"
                >
                  <g transform="translate(1 1)" fillRule="evenodd">
                    <circle cx="5" cy="50" r="5">
                      <animate
                        attributeName="cy"
                        begin="0s"
                        dur="2.2s"
                        values="50;5;50;50"
                        calcMode="linear"
                        repeatCount="indefinite"
                      ></animate>
                      <animate
                        attributeName="cx"
                        begin="0s"
                        dur="2.2s"
                        values="5;27;49;5"
                        calcMode="linear"
                        repeatCount="indefinite"
                      ></animate>
                    </circle>
                    <circle cx="27" cy="5" r="5">
                      <animate
                        attributeName="cy"
                        begin="0s"
                        dur="2.2s"
                        from="5"
                        to="5"
                        values="5;50;50;5"
                        calcMode="linear"
                        repeatCount="indefinite"
                      ></animate>
                      <animate
                        attributeName="cx"
                        begin="0s"
                        dur="2.2s"
                        from="27"
                        to="27"
                        values="27;49;5;27"
                        calcMode="linear"
                        repeatCount="indefinite"
                      ></animate>
                    </circle>
                    <circle cx="49" cy="50" r="5">
                      <animate
                        attributeName="cy"
                        begin="0s"
                        dur="2.2s"
                        values="50;50;5;50"
                        calcMode="linear"
                        repeatCount="indefinite"
                      ></animate>
                      <animate
                        attributeName="cx"
                        from="49"
                        to="49"
                        begin="0s"
                        dur="2.2s"
                        values="49;5;27;49"
                        calcMode="linear"
                        repeatCount="indefinite"
                      ></animate>
                    </circle>
                  </g>
                </svg>
              </span>}
            <div className='recent-transaction-history'>
              <div className='transaction-history-items'>
                {isOverviewHistoryLoader ? (
                  <CardSkeleton amount={15} />
                ) : (
                  <TransactionRow transactions={overviewHistory}>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 18 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M17.3315 8.94854H14.8744V6.58707H17.3315C17.7007 6.58707 18 6.28809 18 5.91881C18 5.5495 17.7007 5.25033 17.3315 5.25033H14.8744V1.97367C14.8744 1.49536 14.7799 1.14429 14.5936 0.930437C14.4165 0.726992 14.1837 0.632324 13.8612 0.632324C13.5536 0.632324 13.3295 0.726339 13.1559 0.928515C12.9717 1.14259 12.8783 1.49431 12.8783 1.97389V5.25073H8.2563L6.29109 2.27693C6.1229 2.01154 5.96476 1.76293 5.81118 1.5243C5.67292 1.3094 5.53806 1.13443 5.41068 1.00378C5.29791 0.888109 5.1694 0.798591 5.01909 0.729785C4.87727 0.665041 4.69697 0.632542 4.48366 0.632542C4.21159 0.632542 3.96462 0.707079 3.72813 0.860216C3.49411 1.01168 3.33234 1.19895 3.23354 1.43276C3.14681 1.65495 3.10093 1.99543 3.10093 2.43493V5.25051H0.668224C0.299092 5.25055 0 5.54971 0 5.91899C0 6.28827 0.299092 6.58725 0.66826 6.58725H3.10097V8.94897H0.66826C0.299092 8.94897 0 9.24807 0 9.61745C0 9.98662 0.299092 10.2855 0.66826 10.2855H3.10097V14.0266C3.10097 14.4908 3.1985 14.8383 3.39168 15.0591C3.57539 15.2697 3.80833 15.3674 4.12465 15.3674C4.42983 15.3674 4.66095 15.2692 4.85261 15.0583C5.04887 14.8422 5.14815 14.4949 5.14815 14.0266V10.2855H9.3305L11.5938 13.756C11.7512 13.9854 11.9137 14.217 12.0757 14.4441C12.2219 14.6479 12.3815 14.8276 12.5497 14.9776C12.7013 15.1134 12.8638 15.2128 13.0327 15.2735C13.2066 15.3361 13.4098 15.3678 13.6354 15.3678C14.2475 15.3678 14.8743 15.1805 14.8743 13.7908V10.2855H17.3314C17.7007 10.2855 17.9999 9.98618 17.9999 9.61702C18 9.24785 17.7007 8.94854 17.3315 8.94854ZM12.8782 6.58703V8.9485H10.7005L9.14004 6.58703H12.8782ZM5.14818 3.87362L6.04626 5.25033H5.14818V3.87362ZM5.14818 8.94854V6.58707H6.91829L8.45858 8.94854H5.14818ZM12.8782 12.2446L11.584 10.2855H12.8782V12.2446Z'
                        fill='#979797'
                      />
                    </svg>
                  </TransactionRow>
                )}
              </div>
            </div>
            <PaginationButton page={page} setPage={setPage} total={total} />
          </main>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default Transactions;
