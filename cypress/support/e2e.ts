// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import '@cypress/grep'
import registerCypressGrep from '@cypress/grep/src/support'
import '@synthetixio/synpress/support/index'
import installLogsCollector from 'cypress-terminal-report/src/installLogsCollector'

import './commands'
import './connectWalletCommands'
import './selectTokenCommands'

const configOption = {
  collectTypes: ['cons:debug'],
  filterLog: function (args: [installLogsCollector.LogType, string, installLogsCollector.Severity]) {
    const [logType, message] = args
    return logType === 'cons:debug' && message.includes('zap data')
  },
}

installLogsCollector(configOption)
registerCypressGrep()
