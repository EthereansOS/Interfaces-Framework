import {
  loadContent,
  searchForCodeErrors,
  extractHTMLDescription,
} from '@ethereansos/interfaces-core'

async function loadSurveyCode(
  { context, web3, web3ForLogs, networkId, walletAddress },
  organization,
  survey
) {
  if ((survey.codeName || !survey.replaces) && !survey.code) {
    try {
      survey.code = await loadContent(
        { web3, context, networkId },
        survey.sourceLocationId,
        survey.sourceLocation
      )
      if (
        survey.codeName !== 'getEmergencySurveyStaking' &&
        survey.sourceLocationId === 0
      ) {
        delete survey.code
      }
    } catch (ex) {
      console.log('loadSurveyCode, loadContent')
      console.log(ex)
    }

    survey.description = extractHTMLDescription({ context }, survey.code, true)
  }

  if (!survey.compareErrors) {
    survey.compareErrors = await searchForCodeErrors(
      { context },
      survey.location,
      survey.code,
      survey.codeName,
      survey.methodSignature,
      survey.replaces,
      true
    )

    survey.compareErrors = await searchForCodeErrors(
      { context },
      survey.location,
      survey.code,
      survey.codeName,
      survey.methodSignature,
      survey.replaces
    )
  }

  return survey
}

export default loadSurveyCode
