import AnimatedPage from "../../components/AnimatedPage";
import BackButton from "../../components/BackButton";

const Dokitor = () => {


      return (
            <div className="transactions-summary">
                  <BackButton />
                  <h1 className="page-name">Dokitor</h1>
                  <AnimatedPage>
                        <div className="wrapper">
                              <main>

                              </main>
                        </div>
                  </AnimatedPage>
            </div>
      );
};

export default Dokitor;
