import styles from './app.module.css';
import { AppRoutes } from './routes';

function App() {

  const token = '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';

  return (
    <div className={styles.conteiner}>
      <AppRoutes token={token}/>
    </div>
  );
}

export default App;