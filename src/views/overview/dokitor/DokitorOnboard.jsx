//router
import { useNavigate } from 'react-router-dom';
//components
import { Button } from '@chakra-ui/react';
//assets
import hospital from '../../../assets/hospital.png'

const DokitorOnboard = () => {
      const navigate = useNavigate()
      return (
            <>
                  <div className="onboarding">
                        <img src={hospital} alt="hospital" />
                  </div>
                  <p style={{ textAlign: "center", margin: "2em 0 4em 0" }}>Using this service enables you to contact  a doctor and get quality medical services from the comfort of your home through the use of your mobile device.</p>
                  <Button onClick={() => {
                        navigate("/dokitor/menu")
                  }} style={{ border: "none", fontSize: "12px", color: "#fff", backgroundColor: "#ff0000", width: "100%", padding: "2em" }}>Proceed</Button>
            </>

      )
}

export default DokitorOnboard;