//react
import { useState, useEffect } from "react";
//Apis
import useGetStatehead from "../../apis/terminals/useGetStatehead";
//components
import PaginationButton from "../../components/PaginationButton";
import BackButton from "../../components/BackButton";
import TerminalRow from "../../components/TerminalRow";


const Statehead = () => {
      const [statehead, setStatehead] = useState([])
      const [page, setPage] = useState(1)
      const [total, setTotal] = useState(0)
      const { data, isFetching } = useGetStatehead(page);

      useEffect(() => {
            if (data) {
                  setStatehead(data.data.data.transfers)
                  setTotal(data.data.data.pagination.total)
            };
      }, [data, setStatehead, statehead, setTotal, total]);

      return (
            <div className="general-terminal">
                  <BackButton />
                  <h1 className="page-name">Statehead Terminal</h1>

                  <div className="wrapper">
                        <main>

                              <div className="terminal-list">
                                    <TerminalRow terminals={statehead} />
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
                        </main>
                  </div>
                  <PaginationButton page={page} setPage={setPage} total={total} />
            </div >
      )
}

export default Statehead;