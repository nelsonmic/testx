//react
import { useState, useEffect } from "react";
//Apis
import useGetAgent from "../../apis/terminals/useGetAgent";
import useGetAgentTransactions from "../../apis/terminals/useGetAgentTransactions";
//components
import AgentTerminalRow from "../../components/AgentTerminalRow";
import PaginationButton from "../../components/PaginationButton";
import BackButton from "../../components/BackButton";
import {
      InputGroup,
      InputLeftElement,
      Select,
} from "@chakra-ui/react";

const Agent = () => {
      const [agent, setAgent] = useState([])
      const [agentTransactions, setAgentTransactions] = useState([]);
      const [page, setPage] = useState(1)
      const [total, setTotal] = useState(0)
      const [selectSerialNumber, setSelectSerialNumber] = useState("");
      const { data: dataSerial, isLoading: isloadingSerial } = useGetAgent();
      const { data: dataAgent, isFetching: isFetchingAgent, refetch } = useGetAgentTransactions(page, selectSerialNumber)

      useEffect(() => {
            if (dataSerial) {
                  setAgent(dataSerial.data.data)
                  setSelectSerialNumber(dataSerial.data.data[0].serial_number);
            };

            if (dataAgent) {
                  setTotal(dataAgent.data.data.total);
                  setAgentTransactions(dataAgent.data.data.data);
            }
      }, [dataSerial, setAgent, agent, dataAgent, setTotal]);

      return (
            <div className="general-terminal">
                  <BackButton />
                  <h1 className="page-name">Agent Terminal</h1>

                  <div className="wrapper">
                        <main>
                              <div className="select-serial-number">
                                    <div className="inputs">
                                          <InputGroup size="lg">
                                                <InputLeftElement
                                                      children={
                                                            isloadingSerial ? (
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
                                                            ) : null
                                                      }
                                                />
                                                <Select
                                                      placeholder="Select a terminal"
                                                      size="lg"
                                                      onChange={(e) => {
                                                            setSelectSerialNumber(e.target.value);
                                                            refetch(page, selectSerialNumber);
                                                      }}
                                                >
                                                      {agent
                                                            ? agent.map((item, index) => {
                                                                  return (
                                                                        <option
                                                                              key={index}
                                                                              value={item.serial_number}
                                                                        >
                                                                              {item.serial_number}
                                                                        </option>
                                                                  );
                                                            })
                                                            : null}
                                                </Select>
                                          </InputGroup>
                                    </div>
                              </div>
                              <div className="terminal-list">
                                    <AgentTerminalRow terminals={agentTransactions} />
                              </div>
                              {isFetchingAgent &&
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

export default Agent;