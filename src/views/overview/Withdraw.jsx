// react
import { useState } from 'react'
//router
import { useNavigate } from 'react-router-dom'
//api
// import useGetBankSettings from '../../apis/settings/bank/useGetBankSettings'
//components
import { InputGroup } from '@chakra-ui/react'
import AnimatedComponent from '../../components/AnimatedComponent'
import NumberFormat from 'react-number-format'

const Withdraw = () => {
  const navigate = useNavigate()

  const [amount, setAmount] = useState('')
  //   const [amountWithComma, setAmountWithComma] = useState('')

  //   const {
  //     isSuccess: isSuccessBank,
  //     data: dataBank,
  //     isLoading: loadingBank,
  //     isError: isErrorBank,
  //     error: errorBank
  //   } = useGetBankSettings()

  //   if (isSuccessBank) console.log(dataBank.data.data[0])

  return (
    <AnimatedComponent>
      <div className='withdraw'>
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
              <div className='inputs'>
                <label htmlFor='amount'>Amount</label>
                <InputGroup size='lg'>
                  {/* <InputLeftElement
                        pointerEvents="none"
                        children={<p style={{ fontSize: "14px" }}>N</p>}
                      /> */}
                  <NumberFormat
                    className='chakra-input css-1lw1oo1'
                    id='amount'
                    thousandSeparator={true}
                    value={amount}
                    placeholder='5,000'
                    isNumericString={true}
                    onValueChange={value => {
                      setAmount(value.floatValue)
                      //     setAmountWithComma(value.formattedValue)
                    }}
                  />
                </InputGroup>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AnimatedComponent>
  )
}

export default Withdraw
