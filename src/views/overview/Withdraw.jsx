// react
import { useState } from 'react'
//router
import { useNavigate } from 'react-router-dom'
//api
import useGetBankSettings from '../../apis/settings/bank/useGetBankSettings'

//components
import { Button, InputGroup } from '@chakra-ui/react'

import AnimatedComponent from '../../components/AnimatedComponent'
import NumberFormat from 'react-number-format'

const Withdraw = () => {
  const navigate = useNavigate()

  const [amount, setAmount] = useState('')
const [amountWithComma, setAmountWithComma] = useState('')


const {
  isSuccess: isSuccessBank,
  data: dataBank,
  isLoading: loadingBank,
  isError: isErrorBank,
  error: errorBank
} = useGetBankSettings()



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
;<div className='accounts'>
  <div className='account'>
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
  </div>
</div>

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
setAmountWithComma(value.formattedValue)

                    }}
                  />
                </InputGroup>
;<div className='submit-button'>
  <Button size='md' colorScheme='red'>
    Withdraw
  </Button>
</div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </AnimatedComponent>
  )
}

export default Withdraw
