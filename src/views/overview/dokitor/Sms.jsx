import { Input, Button, RadioGroup, Radio, HStack, Select, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
const Sms = () => {
      const [sex, setSex] = useState("");
      return (
            <form className="phone-call">
                  <div className="inputs">
                        <label htmlFor="">Name</label>
                        <Input type="text" placeholder="Full name" size="lg" />
                  </div>

                  <div className="inputs">
                        <label htmlFor="">Phone Number</label>
                        <Input type="text" placeholder="Phone number" size="lg" />
                  </div>

                  <div className="inputs">
                        <label htmlFor="">Sex</label>
                        <RadioGroup onChange={setSex} value={sex}>
                              <HStack >
                                    <Radio value='male' colorScheme="red">Male</Radio>
                                    <Radio value='female' colorScheme="red">Female</Radio>
                              </HStack>
                        </RadioGroup>
                  </div>

                  <div className="inputs">
                        <label htmlFor="">Date of birth</label>
                        <Input type="date" size="lg" />
                  </div>

                  <div className="inputs">
                        <label htmlFor="">Choose language</label>
                        <Select placeholder='Select option'>
                              <option value='option1'>Option 1</option>
                              <option value='option2'>Option 2</option>
                              <option value='option3'>Option 3</option>
                        </Select>
                  </div>

                  <div className="checkbox">
                        <Checkbox>By clicking on the proceed you agree to our privacy policy and conditions you will be charged N100 for this service</Checkbox>
                  </div>
                  <div className="btn">
                        <Button variant="solid">Proceed</Button>
                  </div>
            </form>
      )
}

export default Sms;