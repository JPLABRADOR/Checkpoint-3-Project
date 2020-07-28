var employeeManager = {}
var employeeFieldData = require('../testAssets/employeeManagerV2Array')

module.exports = {
    beforeEach: browser => {
        employeeManager = browser.page.employeeManagerV2Page()
        employeeManager
            .maximizeWindow()
            .navigate()
    },
    afterEach: browser => {
        employeeManager.end()
    },
    'Test 1 - Employee Editor: Valid Data, Cancel Button': browser => {
        employeeManager.verifyCancelButton(employeeFieldData)
    },
    'Test 2 - Employee Editor: Valid Data, Add Employee, Search Box, Save/Clear/Delete Button': browser => {
        employeeManager.verifyAddEmployeeFlow(employeeFieldData)
    },
    'Test 3 - Employee Editor: Invalid Overfilled Name Input': browser => {
        employeeManager.verifyOverfilledEmployeeName("1234567890123456789012345678901234567890", "name")
    },
    'Test 4 - Employee Editor: Invalid Empty Name Input': browser => {
        employeeManager.verifyEmptyEmployeeName(" ", browser, "name")
    },
    'Test 5 - Employee Editor: Invalid Overfilled Title Input': browser => {
        employeeManager.verifyOverfilledEmployeeTitle("1234567890123456789012345678901234567890", "title")
    },
    'Test 6 - Employee Editor: Invalid Single Space Character Name Input': browser => {
        employeeManager.verifySingleSpaceEmployeeName()
    },
    'Test 7 - Employee Editor: Invalid Single Space Character Title Input': browser => {
        employeeManager.verifySingleSpaceEmployeeTitle()
    }
}