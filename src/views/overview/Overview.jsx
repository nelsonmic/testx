import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Avatar } from '@chakra-ui/react'

//state
import userState from '../../recoil/userRecoil'
// import userProfileImageState from "../recoil/userProfileImageRecoil";

//api
import useGetUserInfo from '../../apis/profile/useGetUserInfo'
import useGetOverviewHistory from '../../apis/history/useGetOverviewHistory'
//assets
import naira from '../../assets/naira.svg'
//components
import TransactionRow from '../../components/TransactionRow'
import CardSkeleton from '../../components/CardSkeleton'
// import ImageFormatter from ".././components/ImageFormatter";
//utils
import * as utils from '../../utils'
import AnimatedPage from '../../components/AnimatedPage'
// import AlertMessage from "../components/Alert";

const Overview = () => {
  //   let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState)
  const showBalanceInitial = localStorage.getItem('showBalance')
  const [showBalance, setShowBalance] = useState(showBalanceInitial);
  console.log(showBalance)
  // const [userProfileImage] = useRecoilState(userProfileImageState);
  const [overviewHistory, setOverviewHistory] = useState([])
  const { isSuccess: isSuccessUser, data: dataUser } = useGetUserInfo()
  const {
    isSuccess: isSuccessHistory,
    data: dataHistory,
    isLoading: isOverviewHistoryLoader
  } = useGetOverviewHistory()

  useEffect(() => {
    if (isSuccessUser) {
      setUser(dataUser.data.data)
    }

    if (isSuccessHistory) {
      setOverviewHistory(dataHistory.data.data.transfers)
    }
  }, [
    isSuccessUser,
    dataUser,
    user,
    setUser,
    isSuccessHistory,
    dataHistory,
    setOverviewHistory,
  ])

  return (
    <div className='overview'>
      {/* <h3 className='page-name'>Overview</h3> */}
      <header>
        <div className='menu'>
          <svg
            width='24'
            height='24'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            color='#d40000'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h7'
            ></path>
          </svg>
        </div>

        <div className='user-greet'>
          <h1>
            Hey{' '}
            {utils.truncateText(
              user
                ? user.name
                  .split(' ')
                  .slice(0, -1)
                  .join(' ')
                : '',
              8
            )}
            !
          </h1>
          <Link to='/profile'>
            <Avatar
              src={user && user.profile_photo}
              size='sm'
            />
          </Link>
        </div>
      </header>
      <AnimatedPage>
        <div className='wrapper'>
          <main>
            <div className='balance-container'>
              <div className="total-balance">
                <h2>Total Balance</h2>
                <span>
                  {showBalance ? (
                    <svg onClick={() => {
                      setShowBalance(false)
                      window.localStorage.removeItem('showBalance')
                    }} width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" color="#fff"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                  ) : (
                    <svg onClick={() => {
                      setShowBalance(true)
                      window.localStorage.setItem('showBalance', true)
                    }} width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" color="#fff"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  )}
                </span>
              </div>

              <p className='account-balance'>
                <img src={naira} alt='naira' />
                {showBalance && showBalance ? user
                  ? utils.numbersWithCommas(
                    utils.truncateDecimals(user.balance)
                  )
                  : '0' : '****'}
              </p>
              <p className='wallet-address'>Wallet Address: {" "}<span>{user && utils.truncateTextWithAsterix(user.wallet_address, 4)}</span></p>
            </div>

            <div className='quick-action-container'>
              <p className='desc'>Quick Actions</p>
              <div className='balance-ctrls'>
                <span>
                  <Link to='/fund'>
                    <p>fund</p>
                  </Link>
                </span>

                <span>
                  <Link to='/withdraw'>
                    <p>Withdraw</p>
                  </Link>
                </span>


                <span>
                  <Link to='/xpoints'>
                    <p>Xpoints</p>
                  </Link>
                </span>

              </div>
              <div className='quick-action-items'>

                <div className='royalties'>
                  <span>
                    <svg
                      width='20'
                      height='20'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      color='#000'
                    >
                      <path
                        fillRule='evenodd'
                        d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </span>
                  <Link to='/royalties'>
                    <p>Royalties</p>
                  </Link>
                </div>


                <div className='dokitor'>
                  <span>
                    <svg
                      width='20'
                      height='20'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      color='#000'
                    >
                      <path fill='none' d='M0 0h24v24H0z'></path>
                      <path d='M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z'></path>
                    </svg>
                  </span>
                  <Link to='/dokitor'>
                    <p>Dokitor</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className='recent-transaction-history'>
              <p className='desc'>Recent Transactions</p>
              <div className='transaction-history-items'>
                {isOverviewHistoryLoader ? (
                  <CardSkeleton amount={5} />
                ) : (
                  <TransactionRow transactions={overviewHistory}>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 18 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M17.3315 8.94854H14.8744V6.58707H17.3315C17.7007 6.58707 18 6.28809 18 5.91881C18 5.5495 17.7007 5.25033 17.3315 5.25033H14.8744V1.97367C14.8744 1.49536 14.7799 1.14429 14.5936 0.930437C14.4165 0.726992 14.1837 0.632324 13.8612 0.632324C13.5536 0.632324 13.3295 0.726339 13.1559 0.928515C12.9717 1.14259 12.8783 1.49431 12.8783 1.97389V5.25073H8.2563L6.29109 2.27693C6.1229 2.01154 5.96476 1.76293 5.81118 1.5243C5.67292 1.3094 5.53806 1.13443 5.41068 1.00378C5.29791 0.888109 5.1694 0.798591 5.01909 0.729785C4.87727 0.665041 4.69697 0.632542 4.48366 0.632542C4.21159 0.632542 3.96462 0.707079 3.72813 0.860216C3.49411 1.01168 3.33234 1.19895 3.23354 1.43276C3.14681 1.65495 3.10093 1.99543 3.10093 2.43493V5.25051H0.668224C0.299092 5.25055 0 5.54971 0 5.91899C0 6.28827 0.299092 6.58725 0.66826 6.58725H3.10097V8.94897H0.66826C0.299092 8.94897 0 9.24807 0 9.61745C0 9.98662 0.299092 10.2855 0.66826 10.2855H3.10097V14.0266C3.10097 14.4908 3.1985 14.8383 3.39168 15.0591C3.57539 15.2697 3.80833 15.3674 4.12465 15.3674C4.42983 15.3674 4.66095 15.2692 4.85261 15.0583C5.04887 14.8422 5.14815 14.4949 5.14815 14.0266V10.2855H9.3305L11.5938 13.756C11.7512 13.9854 11.9137 14.217 12.0757 14.4441C12.2219 14.6479 12.3815 14.8276 12.5497 14.9776C12.7013 15.1134 12.8638 15.2128 13.0327 15.2735C13.2066 15.3361 13.4098 15.3678 13.6354 15.3678C14.2475 15.3678 14.8743 15.1805 14.8743 13.7908V10.2855H17.3314C17.7007 10.2855 17.9999 9.98618 17.9999 9.61702C18 9.24785 17.7007 8.94854 17.3315 8.94854ZM12.8782 6.58703V8.9485H10.7005L9.14004 6.58703H12.8782ZM5.14818 3.87362L6.04626 5.25033H5.14818V3.87362ZM5.14818 8.94854V6.58707H6.91829L8.45858 8.94854H5.14818ZM12.8782 12.2446L11.584 10.2855H12.8782V12.2446Z'
                        fill='#979797'
                      />
                    </svg>
                  </TransactionRow>
                )}
              </div>
            </div>
          </main>
          <Outlet context={[user]} />
        </div>
      </AnimatedPage>
    </div>
  )
}

export default Overview
