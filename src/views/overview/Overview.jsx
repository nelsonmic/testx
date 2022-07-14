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
    setOverviewHistory
  ])

  return (
    <div className='overview'>
      <h3 className='page-name'>Overview</h3>
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
              name={user && user.name}
              src={user && user.profile_photo}
              size='sm'
            />
            {/* <ImageFormatter
              source={
                user && user.profile_photo !== null
                  ? user.profile_photo
                  : userProfileImage
              }
              width="40px"
              height="40px"
              alt="User display profile"
            /> */}
          </Link>
        </div>
      </header>
      <AnimatedPage>
        <div className='wrapper'>
          <main>
            <div className='balance-container'>
              <h2>Current Balance</h2>
              <p className='account-balance'>
                <img src={naira} alt='naira' />
                {user
                  ? utils.numbersWithCommas(
                      utils.truncateDecimals(user.balance)
                    )
                  : '0'}
              </p>

              <div className='balance-ctrls'>
                <Link to='/fund'>
                  <div>
                    <svg
                      width='30'
                      height='30'
                      viewBox='0 0 30 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect width='30' height='30' rx='8' fill='white' />
                      <path
                        d='M21.9535 11.093H17.0698C15.9596 11.093 14.8948 11.5341 14.1098 12.3191C13.3247 13.1041 12.8837 14.1689 12.8837 15.2791C12.8837 16.3893 13.3247 17.454 14.1098 18.2391C14.8948 19.0241 15.9596 19.4651 17.0698 19.4651H21.9535V20.8605C21.9535 21.0455 21.88 21.223 21.7491 21.3538C21.6183 21.4846 21.4408 21.5581 21.2558 21.5581H8.69767C8.51264 21.5581 8.33518 21.4846 8.20434 21.3538C8.0735 21.223 8 21.0455 8 20.8605V9.69767C8 9.51264 8.0735 9.33518 8.20434 9.20434C8.33518 9.0735 8.51264 9 8.69767 9H21.2558C21.4408 9 21.6183 9.0735 21.7491 9.20434C21.88 9.33518 21.9535 9.51264 21.9535 9.69767V11.093ZM17.0698 12.4884H22.6512V18.0698H17.0698C16.3296 18.0698 15.6198 17.7757 15.0964 17.2524C14.5731 16.729 14.2791 16.0192 14.2791 15.2791C14.2791 14.5389 14.5731 13.8291 15.0964 13.3057C15.6198 12.7824 16.3296 12.4884 17.0698 12.4884ZM17.0698 14.5814V15.9767H19.1628V14.5814H17.0698Z'
                        fill='#FF0000'
                      />
                    </svg>

                    <p>fund</p>
                  </div>
                </Link>
                <Link to='/withdraw'>
                  <div>
                    <svg
                      width='35'
                      height='30'
                      viewBox='0 0 30 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect width='30' height='30' rx='8' fill='white' />
                      <path
                        d='M21.4399 11.2H18.8799V10.5599H20.7999V8.95994C20.7999 8.87512 20.7662 8.79376 20.7062 8.73371C20.6461 8.67367 20.5648 8.63997 20.4799 8.63997H8.95994C8.78327 8.63997 8.63997 8.78327 8.63997 8.95994V10.5599H10.5599V11.2H8V8.95994C8 8.70536 8.10112 8.46117 8.28114 8.28114C8.46116 8.10111 8.70537 8 8.95994 8L20.4799 8C20.7345 8 20.9787 8.10112 21.1587 8.28114C21.3388 8.46116 21.4399 8.70537 21.4399 8.95994L21.4399 11.2Z'
                        fill='#FF0000'
                      />
                      <path
                        d='M17.9196 21.4399H11.5196C11.265 21.4399 11.0209 21.3388 10.8408 21.1588C10.6608 20.9788 10.5596 20.7346 10.5596 20.48V8L18.8796 8V20.48C18.8796 20.7346 18.7783 20.9788 18.5983 21.1588C18.4183 21.3388 18.1741 21.4399 17.9195 21.4399H17.9196ZM11.1996 8.63994V20.4799C11.1996 20.5648 11.2333 20.6461 11.2934 20.7062C11.3533 20.7662 11.4348 20.7999 11.5196 20.7999H17.9196C18.0044 20.7999 18.0859 20.7662 18.1458 20.7062C18.2059 20.6461 18.2396 20.5648 18.2396 20.4799V8.63994H11.1996Z'
                        fill='#FF0000'
                      />
                      <path
                        d='M14.7203 16.1981C14.508 16.1998 14.3044 16.1142 14.1571 15.9614L13.4786 15.2829C13.3286 15.1339 13.2441 14.9313 13.2441 14.7198C13.2441 14.5083 13.3286 14.3056 13.4786 14.1566L14.1571 13.4781C14.3061 13.3281 14.5088 13.2437 14.7203 13.2437C14.9317 13.2437 15.1344 13.3281 15.2834 13.4781L15.9619 14.1566C16.1119 14.3056 16.1964 14.5083 16.1964 14.7198C16.1964 14.9313 16.1119 15.1339 15.9619 15.2829L15.2834 15.9614C15.1361 16.1142 14.9325 16.1998 14.7203 16.1981ZM14.7203 13.8813V13.8814C14.6775 13.8809 14.6363 13.897 14.6051 13.9261L13.9266 14.6046C13.868 14.6702 13.868 14.7693 13.9266 14.8349L14.6051 15.5134C14.6707 15.572 14.7698 15.572 14.8354 15.5134L15.5139 14.8349C15.5725 14.7693 15.5725 14.6702 15.5139 14.6046L14.8354 13.9261C14.8042 13.897 14.763 13.8809 14.7203 13.8814L14.7203 13.8813Z'
                        fill='#FF0000'
                      />
                      <path
                        d='M16.3203 9.91992H16.9603V11.8399H16.3203V9.91992Z'
                        fill='#FF0000'
                      />
                      <path
                        d='M12.4795 17.6001H13.1194V19.5201H12.4795V17.6001Z'
                        fill='#FF0000'
                      />
                      <path
                        d='M19.8398 20.1599H18.8799V19.52H19.8399H19.8398C19.9248 19.52 20.0061 19.4863 20.0662 19.4262C20.1261 19.3663 20.1598 19.2848 20.1598 19.2V12.48H20.7997L20.7999 19.2C20.7999 19.4546 20.6987 19.6988 20.5186 19.8788C20.3386 20.0588 20.0944 20.1599 19.8398 20.1599L19.8398 20.1599Z'
                        fill='#FF0000'
                      />
                    </svg>

                    <p>Withdraw</p>
                  </div>
                </Link>
                <Link to='/xpoints'>
                  <div>
                    <svg
                      width='30'
                      height='30'
                      viewBox='0 0 30 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect width='30' height='30' rx='8' fill='white' />
                      <path
                        d='M17 12.8125H15.875V14.5H14.1875V15.625H15.875V17.3125H17V15.625H18.6875V14.5H17V12.8125ZM9.125 15.0625C9.125 13.4931 10.0475 12.1375 11.3806 11.5075V10.2925C9.4175 10.99 8 12.8631 8 15.0625C8 17.2619 9.4175 19.135 11.3806 19.8325V18.6175C10.7063 18.2997 10.1363 17.7968 9.73689 17.1673C9.33753 16.5379 9.12531 15.8079 9.125 15.0625V15.0625ZM16.4375 10C13.6475 10 11.375 12.2725 11.375 15.0625C11.375 17.8525 13.6475 20.125 16.4375 20.125C19.2275 20.125 21.5 17.8525 21.5 15.0625C21.5 12.2725 19.2275 10 16.4375 10ZM16.4375 19C14.2663 19 12.5 17.2337 12.5 15.0625C12.5 12.8913 14.2663 11.125 16.4375 11.125C18.6087 11.125 20.375 12.8913 20.375 15.0625C20.375 17.2337 18.6087 19 16.4375 19Z'
                        fill='#FF0000'
                      />
                    </svg>

                    <p>Xpoints</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className='quick-action-container'>
              <p className='desc'>Quick Actions</p>
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
                  <p>Royalties</p>
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
                  <p>Dokitor</p>
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
