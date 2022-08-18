import { Input, Button, Select } from "@chakra-ui/react";

const FollowUp = () => {

      return (
            <form className="phone-call">


                  <div className="inputs">
                        <label htmlFor="">Communication Channel</label>
                        <Select placeholder='Select option'>
                              <option value='option1'>Option 1</option>
                              <option value='option2'>Option 2</option>
                        </Select>
                  </div>
                  <div className="inputs">
                        <label htmlFor="">Follow Up Token</label>
                        <Input type="text" placeholder="234567" size="lg" />
                  </div>

                  <div className="btn">
                        <Button variant="solid">Proceed</Button>
                  </div>
            </form>
      )
}

export default FollowUp;