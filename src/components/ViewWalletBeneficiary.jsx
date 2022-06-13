//router
import { useNavigate } from "react-router-dom";
//components
import Avatar from "react-avatar";

const ViewWalletBeneficiary = ({
  name,
  email,
  walletAddress,
  setReceipientWalletAddress,
  setReceipientEmail,
  setReceipientName,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="view-bank"
      onClick={() => {
        setReceipientName(name);
        setReceipientEmail(email);
        setReceipientWalletAddress(walletAddress);
        navigate(-1);
      }}
    >
      <Avatar name={name} size={40} round={true} maxInitials={1} />
      <span>
        <p>{name}</p>
        <span>
          <p style={{ fontSize: "10px" }}>{email}</p>
          <p style={{ fontSize: "10px" }}>{walletAddress}</p>
        </span>
      </span>
    </div>
  );
};

export default ViewWalletBeneficiary;
