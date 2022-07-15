//router
import { useNavigate, useOutletContext } from 'react-router-dom'
//api
import useSetHandleRoyalties from '../../apis/overview-transactions/xpoints/useSetAllRoyalties'
//components
import { Button } from '@chakra-ui/react'
import Alert from '../../components/Alert'
import AnimatedComponent from '../../components/AnimatedComponent'

const Xpoints = () => {
      const navigate = useNavigate()
      const [user] = useOutletContext()

      const {
            mutate: setHandleRoyalties,
            isLoading,
            isSuccess,
            isError,
            error
      } = useSetHandleRoyalties();

      const handleXpointmove = (royalty) => {
            const value = {
                  royalty: royalty,
            }
            setHandleRoyalties(value)
      }

      return (
            <AnimatedComponent>
                  <div className='xpoints'>
                        {isError && (
                              <Alert
                                    status="error"
                                    message={error.response.data.message}
                              />
                        )}

                        {isSuccess && (
                              <Alert status="success" message={"Your Xpoint Move was Successful"} />
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
                                    <AnimatedComponent>
                                          <div className='pin-inputs'>
                                                <p>You earn Xpoints as you pay bills with Xtrapay</p>
                                                <div className='select-fund-type'>
                                                      <h3>1 xpoint = 1 naira</h3>

                                                      <div className="xpoint-earned">
                                                            <h1>{user && user.royalties.xpoints}</h1>
                                                      </div>

                                                      <div className="submit-button">
                                                            <Button
                                                                  size="md"
                                                                  colorScheme="red"
                                                                  onClick={() => {
                                                                        handleXpointmove("beans");
                                                                  }}
                                                                  isLoading={isLoading}
                                                            >
                                                                  Move to Wallet
                                                            </Button>
                                                      </div>
                                                </div>
                                          </div>
                                    </AnimatedComponent>

                              </main>
                        </div>
                  </div>
            </AnimatedComponent>
      )
}

export default Xpoints
