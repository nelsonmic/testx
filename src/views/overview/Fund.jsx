// react
import { useState } from 'react'
//router
import { useNavigate, useOutletContext } from 'react-router-dom'
//api
import useSetInitializeFund from '../../apis/overview-transactions/fund/useSetInitializeFund'
//components
import { Button, InputGroup, Input } from '@chakra-ui/react'
import AnimatedComponent from '../../components/AnimatedComponent'
import NumberFormat from 'react-number-format'

const Fund = () => {
  const [user] = useOutletContext()
  const navigate = useNavigate()
  const [showCardModal, setShowCardModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountWithComma, setAmountWithComma] = useState('')

  //initialize fund wallet
  const {
    mutate: setInitializeFund,
    isLoading: isLoadingInitializeFund,
    isSuccess: initializeFundSuccess,
    data: initializeFundData,
    error: errorInitializeFundData,
    isError: isErrorInitializeFund
  } = useSetInitializeFund()

  if (isErrorInitializeFund) console.log(errorInitializeFundData)

  const handleCardDeposit = () => {
    const value = {
      amount
    }
    setInitializeFund(value)
  }

  return (
    <AnimatedComponent>
      <div className='fund'>
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
            {showCardModal || showTransferModal ? null : (
              <AnimatedComponent>
                <div className='pin-inputs'>
                  <p>Fund your XtraPay Wallet</p>
                  <div className='select-fund-type'>
                    <h3>Fund Wallet</h3>
                    <div className='type'>
                      <div
                        className='card'
                        onClick={() => {
                          setShowCardModal(!showCardModal)
                        }}
                      >
                        <svg
                          width='80'
                          height='71'
                          viewBox='0 0 80 71'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <circle
                            cx='56'
                            cy='15'
                            r='56'
                            fill='black'
                            fillOpacity='0.07'
                          />
                        </svg>
                        <p>Card</p>
                        <svg
                          width='80'
                          height='71'
                          viewBox='0 0 80 71'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <circle
                            cx='56'
                            cy='15'
                            r='56'
                            fill='black'
                            fillOpacity='0.07'
                          />
                        </svg>
                      </div>
                      <div
                        className='transfer'
                        onClick={() => {
                          setShowTransferModal(!showTransferModal)
                        }}
                      >
                        <svg
                          width='80'
                          height='71'
                          viewBox='0 0 80 71'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <circle
                            cx='56'
                            cy='15'
                            r='56'
                            fill='black'
                            fillOpacity='0.07'
                          />
                        </svg>
                        <p>Transfer</p>
                        <svg
                          width='80'
                          height='71'
                          viewBox='0 0 80 71'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <circle
                            cx='56'
                            cy='15'
                            r='56'
                            fill='black'
                            fillOpacity='0.07'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedComponent>
            )}

            {showCardModal && (
              <AnimatedComponent>
                <div className='pin-inputs'>
                  <p
                    className='back'
                    onClick={() => {
                      setShowCardModal(!showCardModal)
                    }}
                  >{`<`}</p>
                  <p>Fund your XtraPay Wallet</p>
                  <div className='select-fund-type'>
                    <h3>By Card Deposit</h3>
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
                  </div>

                  {initializeFundSuccess && (
                    <div className='confirm-fund-wallet'>
                      <p>
                        You are about to deposit{' '}
                        <span className='deposit-amount'>
                          {' '}
                          {amountWithComma}{' '}
                        </span>
                        naira into your Xtrapay wallet
                      </p>

                      <form
                        action={
                          initializeFundSuccess &&
                          initializeFundData.data.data.form_values.action
                        }
                        method={
                          initializeFundSuccess &&
                          initializeFundData.data.data.form_values.method
                        }
                      >
                        {console.log(initializeFundData.data.data.form_values)}
                        <Input
                          type='hidden'
                          name='amount'
                          id='amount'
                          value={
                            initializeFundSuccess &&
initializeFundData.data.data.form_values.amount

                          }
                        />
                        <Input
                          type='hidden'
                          name='currency'
                          id='currency'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.currency
                          }
                        />
                        <Input
                          type='hidden'
                          name='cust_id'
                          id='cust_id'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.cust_id
                          }
                        />
                        <Input
                          type='hidden'
                          name='cust_name'
                          id='cust_name'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.cust_name
                          }
                        />
                        <Input
                          type='hidden'
                          name='hash'
                          id='hash'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.hash
                          }
                        />
                        <Input
                          type='hidden'
                          name='pay_item_id'
                          id='pay_item_id'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.pay_item_id
                          }
                        />
                        <Input
                          type='hidden'
                          name='product_id'
                          id='product_id'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.product_id
                          }
                        />
                        <Input
                          type='hidden'
                          name='site_name'
                          id='site_name'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.site_name
                          }
                        />
                        <Input
                          type='hidden'
                          name='site_redirect_url'
                          id='side_redirect_url'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values
                              .site_redirect_url
                          }
                        />
                        <input
                          type='hidden'
                          name='txn_ref'
                          id='tnx_ref'
                          value={
                            initializeFundSuccess &&
                            initializeFundData.data.data.form_values.txn_ref
                          }
                        />

                        <div className='submit-button'>
                          <Button size='md' colorScheme='red' type='submit'>
                            Confirm
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                  {initializeFundSuccess ? null : (
                    <div className='submit-button'>
                      <Button
                        size='md'
                        colorScheme='red'
                        isLoading={isLoadingInitializeFund}
                        onClick={() => {
                          handleCardDeposit()
                        }}
                      >
                        Proceed
                      </Button>
                    </div>
                  )}
                </div>
              </AnimatedComponent>
            )}

            {showTransferModal && (
              <AnimatedComponent>
                <div className='pin-inputs'>
                  <p
                    className='back'
                    onClick={() => {
                      setShowTransferModal(!showTransferModal)
                    }}
                  >{`<`}</p>
                  <p>Fund your XtraPay Wallet</p>
                  <div className='select-fund-type'>
                    <h3>Make a bank transfer to any of these accounts</h3>
                    <div className='accounts'>
                      <div className='account'>
                        <svg
                          width='30'
                          height='30'
                          viewBox='0 0 43 43'
                          fill='none'
                        >
                          <circle
                            cx='21.5'
                            cy='21.5'
                            r='21.5'
                            fill='#FF3A3A20'
                          />
                          <path
                            d='M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z'
                            fill='#d40000'
                          />
                        </svg>
                        <span>
                          <p className='account-name'>
                            {user.reserved_accounts.account_name}
                          </p>
                          <span>
                            <p style={{ fontSize: '10px' }}>
                              {user.reserved_accounts.bank_name_1}
                            </p>
                            <p style={{ fontSize: '10px' }}>
                              {user.reserved_accounts.account_num_1}
                            </p>
                          </span>
                        </span>
                      </div>

                      <div className='account'>
                        <svg
                          width='30'
                          height='30'
                          viewBox='0 0 43 43'
                          fill='none'
                        >
                          <circle
                            cx='21.5'
                            cy='21.5'
                            r='21.5'
                            fill='#FF3A3A20'
                          />
                          <path
                            d='M12 28H32V30H12V28ZM14 20H16V27H14V20ZM19 20H21V27H19V20ZM23 20H25V27H23V20ZM28 20H30V27H28V20ZM12 15L22 10L32 15V19H12V15ZM14 16.236V17H30V16.236L22 12.236L14 16.236ZM22 16C21.7348 16 21.4804 15.8946 21.2929 15.7071C21.1054 15.5196 21 15.2652 21 15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14C22.2652 14 22.5196 14.1054 22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16Z'
                            fill='#d40000'
                          />
                        </svg>
                        <span>
                          <p className='account-name'>
                            {user.reserved_accounts.account_name}
                          </p>
                          <span>
                            <p style={{ fontSize: '10px' }}>
                              {user.reserved_accounts.bank_name_2}
                            </p>
                            <p style={{ fontSize: '10px' }}>
                              {user.reserved_accounts.account_num_2}
                            </p>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedComponent>
            )}
          </main>
        </div>
      </div>
    </AnimatedComponent>
  )
}

export default Fund
