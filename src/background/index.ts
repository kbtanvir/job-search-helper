import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
//  ...
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.action === 'saveJobDetails') {
    console.log('saving', msg)

    const { jobTitle, jobDescription, companyName } = msg

    const jobDetails = {
      jobTitle,
      jobDescription,
      companyName,
    }

    setJobDetails(jobDetails)

    resp({ message: 'Job details saved' })
  }
})

async function setJobDetails(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'jobs'), data)

    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.log(error)
  }
}
