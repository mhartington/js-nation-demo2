import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import {add} from 'ionicons/icons';
const Home: React.FC = () => {
  const [notes, setNotes] = useState<any>([])
  const initFS = async() => {
    Filesystem.requestPermissions();
  }
  const readDir = async() =>{
    const { files } = await Filesystem.readdir({
      directory: Directory.Documents,
      path: 'notes'
    })
    setNotes(files);
  }

  const mkDir = async() =>{
    await Filesystem.mkdir({
      directory: Directory.Documents,
      path: 'notes'
    }).then(
      () => console.log('dir made'), 
      () => console.log('dir already existed'))
  }


  const mkFile = async() => {
    const data = `${Date.now()}`;

    await Filesystem.writeFile({
      data,
      directory: Directory.Documents,
      path: `notes/${data}.txt`,
      encoding: Encoding.UTF8
    }).then(() => readDir())
  }

  useEffect(() => {
    const init = async() => {
      await initFS();
      await mkDir();
      await readDir();
    }
    init();
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={mkFile}>
                <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {notes.map((note: File) => (
          <pre key={note.name}>
            {JSON.stringify(note, null, 2)}
          </pre>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
