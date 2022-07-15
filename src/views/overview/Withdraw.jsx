// react
import { useState } from 'react'
//router
import { useNavigate } from 'react-router-dom'
//api
import useGetBankSettings from '../../apis/settings/bank/useGetBankSettings'
import useSetInitializeBankTransfer from '../../apis/payments/banktransfer/useSetInitializeBankTransfer'
import useSetProcessAllTransactions from '../../apis/useSetProcessAllTransactions'


//components
import { Button, InputGroup, PinInput, PinInputField } from '@chakra-ui/react'
import Alert from '../../components/Alert'
import AnimatedComponent from '../../components/AnimatedComponent'
import NumberFormat from 'react-number-format'

const Withdraw = () => {
  const navigate = useNavigate()

  const [amount, setAmount] = useState('')
  const [pin, setPin] = useState('')


  const {
    isSuccess: isSuccessBank,
    data: dataBank,
    isLoading: loadingBank,
  } = useGetBankSettings()

  const {
    mutate: setInitializeBankTransfer,
    isSuccess: isSuccessBankTransfer,
    data: dataBankTransfer,
    isLoading: loadingBankTransfer,
    isError: isErrorBankTransfer,
    error: errorBankTransfer
  } = useSetInitializeBankTransfer();

  const {
    mutate: setProcessAllTransactions,
    isSuccess: isSuccessProcessAllTransactions,
    isLoading: loadingProcessAllTransactions,
    isError: isErrorProcessAllTransactions,
    error: errorProcessAllTransactions
  } = useSetProcessAllTransactions()

  const handleChange = (e) => {
    setPin(e);
  };

  const handleComplete = (value) => {
    const values = {
      transactionHash: isSuccessBankTransfer && dataBankTransfer.data.data.hash,
      value: value
    }
    setProcessAllTransactions(values);
  };


  const handleWithdraw = () => {
    const value = {
      selectBankCode: isSuccessBank && dataBank.data.data[0].bank_code,
      selectedBank: isSuccessBank && dataBank.data.data[0].bank_name,
      accountNumber: isSuccessBank && dataBank.data.data[0].bank_acct_no,
      receipientName: isSuccessBank && dataBank.data.data[0].bank_acct_name,
      description: "Wallet deposit",
      amount: amount,
    }
    setInitializeBankTransfer(value);
  }



  return (
    <AnimatedComponent>
      <div className='withdraw'>
        {isErrorProcessAllTransactions && (
          <Alert
            status="error"
            message={errorProcessAllTransactions.response.data.message}
          />
        )}

        {isErrorBankTransfer && (
          <Alert
            status="error"
            message={errorBankTransfer.response.data.message}
          />
        )}

        {isSuccessProcessAllTransactions && (
          <Alert status="success" message={"Your Withdrawal was Successful"} />
        )}
        <div className='wrapper'>
          <p
            className='done'
            onClick={() => {
              navigate('/')
            }}
          >
            Done
          </p>
          <main>
            <div className='pin-inputs'>
              <p>
                Withdraw funds from your XtraPay Wallet into your bank Account
              </p>
              <div className='accounts'>
                <div className='account'>
                  {loadingBank ? (
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
                  ) : (
                    <>
                        <svg width='30' height='30' viewBox='0 0 43 43' fill='none'>
                          <circle cx='21.5' cy='21.5' r='21.5' fill='#FF3A3A20' />
                          <path
                            d='M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z'
                            fill='#d40000'
                          />
                        </svg>
                        <span>
                          <p className='account-name'>
                            {isSuccessBank && dataBank.data.data[0].bank_acct_name}
                          </p>
                          <span>
                            <p style={{ fontSize: '10px' }}>
                              {isSuccessBank && dataBank.data.data[0].bank_name}
                            </p>
                            <p style={{ fontSize: '10px' }}>
                              {isSuccessBank && dataBank.data.data[0].bank_acct_no}
                            </p>
                          </span>
                        </span>
                    </>
                  )}
                </div>
              </div>

              <div className='inputs'>
                <label htmlFor='amount'>Amount</label>
                <InputGroup size='lg' >
                  <NumberFormat
                    className='chakra-input css-1lw1oo1 input'
                    id='amount'
                    thousandSeparator={true}
                    value={amount}
                    placeholder='5,000'
                    isNumericString={true}
                    onValueChange={value => {
                      setAmount(value.floatValue)

                    }}
                  />
                </InputGroup>


                {isSuccessBankTransfer ? null : (
                  <div className='submit-button'>
                    <Button size='md' colorScheme='red' isLoading={loadingBankTransfer} onClick={() => {
                      handleWithdraw()
                    }}>
                      Withdraw
                    </Button>
                  </div>
                )}

                {isSuccessBankTransfer && (
                  <AnimatedComponent>
                    <div className="pin-inputs">
                      <p>Enter your 4 digit transaction pin</p>
                      <div className="inputs">
                        <PinInput
                          mask
                          size="lg"
                          value={pin}
                          onChange={handleChange}
                          className="pin-input-container"
                        >
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                        </PinInput>
                      </div>

                      <div className="submit-button">
                        <Button
                          size="md"
                          colorScheme="red"
                          onClick={() => {
                            handleComplete(pin);
                          }}
                          isLoading={loadingProcessAllTransactions}
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  </AnimatedComponent>
                )}

              </div>


            </div>
          </main>
        </div>
      </div>
    </AnimatedComponent>
  )
}

export default Withdraw
