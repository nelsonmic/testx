//react
import { useState, useEffect } from "react";
//router
import { useOutletContext } from "react-router-dom";
//components
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import ViewBank from "../../components/ViewBank";

const BankList = () => {
  const [allBanks] = useOutletContext();
  const [query, setQuery] = useState("");
  const [filteredBanks, setFilteredBanks] = useState([]);

  useEffect(() => {
    if (allBanks !== null) {
      setFilteredBanks(allBanks);
    }
  } , [allBanks]);

  const handleSearch = (e) => {
    setQuery(e.target.value);

    if (allBanks !== null) {
        setFilteredBanks( allBanks.filter((bank) => bank.bankName.includes(query.toUpperCase())));
    }
  };


  return (
    <div className="bank-list">
      <BackButton />
      <h1 className="page-name">Select Bank</h1>

      <div className="wrapper">
        <main>
          <div className="bank-list-header">
            <InputGroup size="lg">
              <InputLeftElement
                pointerEvents="none"
                children={
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    color="#000"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                  </svg>
                }
              />
              <Input
                type="search"
                id="search"
                placeholder="Search Bank"
                value={query}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className="bank-list-body">
            {allBanks !== null
              ? filteredBanks.map((bank, index) => {
                  return <ViewBank bankName={bank.bankName} key={index} bankCode={bank.bankCode} />;
                })
              : ""}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BankList;
