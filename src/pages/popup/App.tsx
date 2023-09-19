import React from 'react'

const styles = {
  button: {
    backgroundColor: 'purple',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  popup: {
    minWidth: '300px',
  },
}

const App = (): JSX.Element => {
  return (
    <div style={styles.popup}>
      <button
        style={styles.button}
        onClick={() => {
          chrome.tabs.create({
            url: 'https://www.linkedin.com/jobs/search/?currentJobId=3722043882&distance=25&f_EA=true&f_JT=F%2CC&f_WT=2&geoId=103644278&keywords=javascript&origin=JOBS_HOME_SEARCH_CARDS',
          })
        }}
      >
        Search for jobs
      </button>
      <button
        style={styles.button}
        onClick={() => {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              const activeTab = tabs[0]

              chrome.tabs.sendMessage(activeTab.id ?? 0, {
                action: 'applied',
              })
            },
          )
        }}
      >
        Apply
      </button>
    </div>
  )
}

export default App
