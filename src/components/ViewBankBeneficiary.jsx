//router
import { useNavigate } from "react-router-dom";
//components
import Avatar from "react-avatar";

const ViewBankBeneficiary = ({
  name,
  bankName,
  accountNumber,
  bankCode,
  setSelectedBank,
  setSelectBankCode,
  setAccountNumber,
  setReceipientName,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="view-bank"
      onClick={() => {
        setSelectedBank(bankName);
        setSelectBankCode(bankCode);
        setAccountNumber(accountNumber);
        setReceipientName(name);
        navigate(-1);
      }}
    >
      <Avatar name={name} size={40} round={true} maxInitials={1} />
      <span>
        <p>{name}</p>
        <span>
          <p style={{ fontSize: "10px" }}>{bankName}</p>
          <p style={{ fontSize: "10px" }}>{accountNumber}</p>
        </span>
      </span>
    </div>
  );
};

export default ViewBankBeneficiary;
