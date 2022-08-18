//react
import { useState, useEffect } from "react";
//router
import { useOutletContext } from "react-router-dom";
//components
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import ViewBankBeneficiary from "../../components/ViewBankBeneficiary";

const AllBankBeneficiaryList = () => {
  const fullBeneficiaryList = useOutletContext()[9];
  const setSelectedBank = useOutletContext()[1];
  const setSelectBankCode = useOutletContext()[2];
  const setAccountNumber = useOutletContext()[10];
  const setReceipientName = useOutletContext()[11];
  const [query, setQuery] = useState("");
  const [filteredBankBeneficiary, setFilteredBankBeneficiary] = useState([]);

  useEffect(() => {
    if (fullBeneficiaryList !== null) {
      setFilteredBankBeneficiary(fullBeneficiaryList);
    }
  }, [fullBeneficiaryList]);

  const handleSearch = (e) => {
    setQuery(e.target.value);

    if (fullBeneficiaryList !== null) {
      setFilteredBankBeneficiary(
        fullBeneficiaryList.filter((beneficial) =>
          beneficial.account_name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  };

  return (
    <div className="bank-list">
      <BackButton />
      <h1 className="page-name">All Bank Beneficiaries</h1>

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
                placeholder="Search Beneficiary"
                value={query}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className="bank-list-body">
            {fullBeneficiaryList !== null
              ? filteredBankBeneficiary.map((beneficial, index) => {
                  return (
                    <ViewBankBeneficiary
                      key={index}
                      name={beneficial.account_name}
                      bankName={beneficial.bank_name}
                      accountNumber={beneficial.account_number}
                      bankCode={beneficial.bank_code}
                      setSelectedBank={setSelectedBank}
                      setSelectBankCode={setSelectBankCode}
                      setAccountNumber={setAccountNumber}
                      setReceipientName={setReceipientName}
                    />
                  );
                })
              : ""}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllBankBeneficiaryList;
