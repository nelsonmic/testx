//react
import { useState, useEffect } from "react";
//Apis
import useGetMember from "../../apis/terminals/useGetMember";
//components
import AuditLogRow from "../../components/AuditLogRow";
import PaginationButton from "../../components/PaginationButton";
import BackButton from "../../components/BackButton";
//utills
import * as utils from '../../utils'

const AuditLog = () => {
      const [page, setPage] = useState(1)
      const [total, setTotal] = useState(0)
      const [transactions, setTransactions] = useState("");
      const { data: dataMember, isFetching: isFetchingMember } = useGetMember(page);


      useEffect(() => {

            if (dataMember) {
                  setTotal(dataMember.data.data.transactions.total);
                  setTransactions(dataMember.data.data.transactions.data);
            }
      }, [dataMember, setTransactions, setTotal]);

      return (
            <div className="general-terminal">
                  <BackButton />
                  <h1 className="page-name">Audit-log Terminal</h1>

                  <div className="wrapper">
                        <main>
                              <div className="header-details">
                                    <span className='audit-log'>
                                          <h3>Total Profit:</h3>
                                          <p>{dataMember && utils.numbersWithCommas(
                                                utils.truncateDecimals(dataMember.data.data.total_profit, 2)
                                          )}</p>
                                    </span>
                                    <span className='audit-log'>
                                          <h3>Members:</h3>
                                          <p>{dataMember && dataMember.data.data.members}</p>
                                    </span>

                              </div>

                              <div className="terminal-list">
                                    <AuditLogRow transactions={transactions} />
                              </div>
                              {isFetchingMember &&
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
                        </main>
                  </div>
                  <PaginationButton page={page} setPage={setPage} total={total} />
            </div >
      )
}

export default AuditLog;