//react
import { useState } from 'react'
//api
import useSetHandleRoyalties from '../../apis/overview-transactions/xpoints/useSetAllRoyalties'
//recoil state
import { useRecoilState } from 'recoil'
import userState from '../../recoil/userRecoil'
//components
import { Button } from '@chakra-ui/react'
import Alert from '../../components/Alert'
import AnimatedPage from "../../components/AnimatedPage";
import AnimatedComponent from "../../components/AnimatedComponent"
import BackButton from "../../components/BackButton";

const Royalties = () => {
      const [user] = useRecoilState(userState)
      const [showAgentButton, setShowAgentButton] = useState(false);
      const [showAggButton, setShowAggButton] = useState(false);
      const [showShButton, setShowShButton] = useState(false);
      const [showMButton] = useState(false);

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
            <div className="royalties">
                  <BackButton />
                  <h1 className="page-name">Royalties</h1>

                  <AnimatedPage>
                        <div className="wrapper">
                              {isError && (
                                    <Alert
                                          status="error"
                                          message={error.response.data.message}
                                    />
                              )}

                              {isSuccess && (
                                    <Alert status="success" message={"You have successfully withdrawn your royalties"} />
                              )}
                              <main>
                                    <div className={user.royalties.agent_royalty || user.royalties.agent_royalty >= 0 ? `royalty` : `royalty blur`}>
                                          <p onClick={() => {
                                                setShowAgentButton(!showAgentButton)
                                                setShowAggButton(false)
                                                setShowShButton(false)
                                          }}>Agent <span>{user.royalties.agent_royalty}</span></p>
                                          {showAgentButton && (
                                                <AnimatedComponent>
                                                      <Button variant="solid" isLoading={isLoading} onClick={() => {
                                                            handleXpointmove("agent_royalty")
                                                      }}>Withdraw</Button>
                                                </AnimatedComponent>
                                          )}
                                    </div>

                                    <div className={user.royalties.aggregator_royalty || user.royalties.aggregator_royalty >= 0 ? `royalty` : `royalty blur`}>
                                          <p
                                                onClick={() => {
                                                      setShowAggButton(!showAggButton)
                                                      setShowShButton(false)
                                                      setShowAgentButton(false)
                                                }}
                                          >Aggregator <span>{user.royalties.aggregator_royalty}</span></p>
                                          {showAggButton && (
                                                <AnimatedComponent>
                                                      <Button variant="solid" isLoading={isLoading} onClick={() => {
                                                            handleXpointmove("aggregator_royalty")
                                                      }}>Withdraw</Button>
                                                </AnimatedComponent>
                                          )}
                                    </div>

                                    <div className={user.royalties.state_head_royalty || user.royalties.state_head_royalty >= 0 ? `royalty` : `royalty blur`}>
                                          <p onClick={() => {
                                                setShowShButton(!showShButton)
                                                setShowAggButton(false)
                                                setShowAgentButton(false)
                                          }}>State Head <span>{user.royalties.state_head_royalty}</span></p>
                                          {showShButton && (
                                                <AnimatedComponent>
                                                      <Button isLoading={isLoading} onClick={() => {
                                                            handleXpointmove("state_head_royalty")
                                                      }}>Withdraw</Button>
                                                </AnimatedComponent>
                                          )}
                                    </div>

                                    <div className="royalty blur">
                                          <p>Member <span></span></p>
                                          {showMButton && (
                                                <AnimatedComponent>
                                                      <Button variant="solid">Withdraw</Button>
                                                </AnimatedComponent>
                                          )}
                                    </div>
                              </main>
                        </div>
                  </AnimatedPage>
            </div>
      );
};

export default Royalties;
