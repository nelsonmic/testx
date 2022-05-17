//router
import { useNavigate } from "react-router-dom";

const ViewBank = ({ bankName, bankCode, changeBankInput, changeBankCode }) => {
    const navigate = useNavigate();
  return (
    <div className="view-bank" onClick={()=>{
        changeBankCode(bankCode)
        changeBankInput(bankName);
        navigate(-1);
      }} >
      <svg width="30" height="30" viewBox="0 0 43 43" fill="none">
        <circle cx="21.5" cy="21.5" r="21.5" fill="#FF3A3A20" />
        <path
          d="M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z"
          fill="#d40000"
        />
      </svg>
      <p>{bankName}</p>
    </div>
  );
};

export default ViewBank;
