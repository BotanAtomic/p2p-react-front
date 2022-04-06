import {createInputs, joinInputs} from "../../data/homeInputs";
import JoinRoom from "../JoinRoom/JoinRoom";
import styles from "./HomeContainer.module.css";

const HomeContainer = () => {

  return(
    <div className={styles.container}>
      <section className={`${styles.forms}`}>
        <JoinRoom header={"Join Room"} inputs={joinInputs} />
      </section>
    </div>
  );
};

export default HomeContainer;
