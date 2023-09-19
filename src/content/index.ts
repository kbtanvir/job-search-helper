(async () => {
  console.log('content.js loaded')

  chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg.action === 'applied') {
      const jobTitleElement: any = document.querySelector(
        'h2.jobs-unified-top-card__job-title',
      )

      const jobDescriptionElement: any = document.querySelector(
        '.jobs-description__content span',
      )

      const jobTitle = jobTitleElement ? jobTitleElement.innerText : ''

      let jobDescription = jobDescriptionElement
        ? jobDescriptionElement.innerText
        : ''

      // remove extra space and line breaks from description

      jobDescription = jobDescription.replace(/\s+/g, ' ').trim()

      let companyName: any = document.querySelector(
        '.jobs-unified-top-card__primary-description',
      )

      companyName = companyName ? companyName.innerText : ''

      // split the company name to remove the location

      companyName = companyName.split('-')[0]

      await chrome.runtime.sendMessage({
        action: 'saveJobDetails',
        jobTitle,
        jobDescription,
        companyName,
      })

    }
  })
})()
