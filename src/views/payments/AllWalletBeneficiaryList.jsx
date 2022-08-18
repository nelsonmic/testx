//react
import { useState, useEffect } from "react";
//router
import { useOutletContext } from "react-router-dom";
//components
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import BackButton from "../../components/BackButton";
import ViewWalletBeneficiary from "../../components/ViewWalletBeneficiary";

const AllWalletBeneficiaryList = () => {
  const fullWalletBeneficiaryList = useOutletContext()[9];
  const setReceipientEmail = useOutletContext()[10];
  const setReceipientWalletAddress = useOutletContext()[11];
  const setReceipientName = useOutletContext()[12];
  const [query, setQuery] = useState("");
  const [filteredBankBeneficiary, setFilteredBankBeneficiary] = useState([]);

  useEffect(() => {
    if (fullWalletBeneficiaryList !== null) {
      setFilteredBankBeneficiary(fullWalletBeneficiaryList);
    }
  }, [fullWalletBeneficiaryList]);

  const handleSearch = (e) => {
    setQuery(e.target.value);

    if (fullWalletBeneficiaryList !== null) {
      setFilteredBankBeneficiary(
        fullWalletBeneficiaryList.filter((beneficial) =>
          beneficial.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  };

  return (
    <div className="bank-list">
      <BackButton />
      <h1 className="page-name">All Wallet Beneficiaries</h1>

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
            {fullWalletBeneficiaryList !== null
              ? filteredBankBeneficiary.map((beneficial, index) => {
                  return (
                    <ViewWalletBeneficiary
                      key={index}
                      name={beneficial.name}
                      email={beneficial.email}
                      walletAddress={beneficial.wallet_to}
                      setReceipientWalletAddress={setReceipientWalletAddress}
                      setReceipientEmail={setReceipientEmail}
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

export default AllWalletBeneficiaryList;
