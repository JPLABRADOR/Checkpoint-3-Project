var employeeManager = {}
var nameValue = ""
var titleValue = ""
var fieldData = require('../testAssets/employeeManagerV2Array')

module.exports = {
    beforeEach: browser => {
        employeeManager = browser.page.employeeManagerV2Page()
        employeeManager.navigate()

    },
    afterEach: browser => {
        employeeManager.end()
    },

    'Test 1 - Employee Editor: Valid Data, Cancel Button': browser => {
        employeeManager
            .click('@selectFirstEmployee')

            .getValue('@employeeNameInput', function(result) {
                nameValue = result.value

                //Test the Cancel Button
                employeeManager
                    .inputName(fieldData[0])
                    .click("@employeeCancelButton")            
                employeeManager
                    .inputPhone(fieldData[0])
                    .click("@employeeCancelButton")
                employeeManager
                    .inputEmail(fieldData[0])
                    .click("@employeeCancelButton")
                employeeManager
                    .inputTitle(fieldData[0])
                    .click("@employeeCancelButton")

                employeeManager
                    .inputName(fieldData[0])
                employeeManager
                    .inputPhone(fieldData[0])
                employeeManager
                    .inputEmail(fieldData[0])
                employeeManager
                    .inputTitle(fieldData[0])
                    .click("@employeeCancelButton")

                employeeManager
                    .verify.attributeContains("@employeeNameInput", 'value', nameValue, "VERIFIED: No change in employee file.")
            })
    },

    'Test 2 - Employee Editor: Valid Data, Add Employee, Search Box, Save/Clear/Delete Button': browser => {
        //Test Add Employee, Save/Clear Buttons, Search Box
        employeeManager
            .click('@addEmployee')
            .pause(1000)
            .click('@selectEmployee')

        employeeManager
            .inputName(fieldData[0])
            .click("@employeeSaveButton")
            .pause(1000)
        employeeManager
            .inputPhone(fieldData[0])
            .click("@employeeSaveButton")
            .pause(1000)
        employeeManager
            .inputEmail(fieldData[0])
            .click("@employeeSaveButton")
            .pause(1000)
        employeeManager
            .inputTitle(fieldData[0])
            .click("@employeeSaveButton")
            .pause(1000)

            .verify.attributeContains("@employeeNameInput", 'value', "Spike Spiegel", "VERIFIED: Saved name change.")
            .verify.attributeContains("@employeePhoneInput", 'value', "8001234567", "VERIFIED: Saved phone change.")
            .verify.attributeContains("@employeeEmailInput", 'value', "Spike@crazymail.com", "VERIFIED: Saved email change.")
            .verify.attributeContains("@employeeTitleInput", 'value', "Bounty Hunter", "VERIFIED: Saved title change.")

            .setValue('@searchBox', "Spike")
            .click("@selectNewEmployee")
            .verify.attributeContains("@employeeNameInput", 'value', "Spike Spiegel", "VERIFIED: Employee Created.")

        //Test the Delete Button
        employeeManager
            .dismissDelete(fieldData[0])
        employeeManager
            .acceptDelete(fieldData[0])
    },

    'Test 3 - Employee Editor: Invalid Overfilled Name Input': browser => {
        employeeManager
            .click('@selectFirstEmployee')

            .clearValue('@employeeNameInput')
            .setValue('@employeeNameInput', "1234567890123456789012345678901234567890")
            .click("@employeeSaveButton")

            .click("@selectFirstEmployee")

            .verify.containsText("@nameError", "The name field must be between 1 and 30 characters", "VERIFIED: Invalid input in the Name field caused an error message.")
            .verify.containsText("@titleError", "The title field must be between 1 and 30 character", "BUG: The Title input field error message should not have appeared.")

            .verify.attributeContains('@employeeNameInput', 'class', 'invalidInfo', "VERIFIED: Invalid input in the Name field is underlined in red.")
            .verify.attributeContains('@employeeEmailInput', 'class', 'invalidInfo', "BUG: The Email input field should not be underlined in red.")
            .verify.attributeContains('@employeeTitleInput', 'class', 'invalidInfo', "BUG: The Title input field should not be underlined in red.")

            .pause(1000)
    },

    'Test 4 - Employee Editor: Invalid Empty Name Input': browser => {
        employeeManager
            .click('@selectFirstEmployee')

            .clearValue('@employeeNameInput')
            .setValue('@employeeNameInput', " ")
            .setValue('@employeeNameInput', [browser.Keys.BACK_SPACE])
            .click("@employeeSaveButton")

            .click("@selectFirstEmployee")

            .verify.containsText("@nameError", "The name field must be between 1 and 30 characters", "VERIFIED: Invalid input in the Name field caused an error message.")
            .verify.attributeContains('@employeeNameInput', 'class', 'invalidInfo', "VERIFIED: Invalid input in the Name field is underlined in red.")

            .pause(1000)
    },

    'Test 5 - Employee Editor: Invalid Overfilled Title Input': browser => {
        employeeManager
            .click('@selectFirstEmployee')

            .clearValue('@employeeTitleInput')
            .setValue('@employeeTitleInput', "1234567890123456789012345678901234567890")
            .click("@employeeSaveButton")

            .verify.attributeContains('@employeeTitleInput', 'class', 'materialInput', "BUG: The Title input field is not underlined in red.")
            .expect.element('@titleError').to.not.be.present

        employeeManager
            .click("@selectFirstEmployee")

            .getValue('@employeeTitleInput', function(result) {
                employeeManager.verify.ok(result.value.length > 1 && result.value.length < 30)
              })

        employeeManager
            .pause(1000)
    },

    'Test 6 - Employee Editor: Invalid Single Space Character Name Input': browser => {
        employeeManager
            .click('@selectFirstEmployee')

            .getValue('@employeeNameInput', function(result) {
                nameValue = result.value
                employeeManager
                    .clearValue('@employeeNameInput')
                    .setValue('@employeeNameInput', " ")
                    .click("@employeeSaveButton")
                    .pause(1000)
                    .verify.attributeContains('@employeeNameInput', 'value', '', "BUG: The Name input field should not be able to be saved while empty.")
                    .clearValue('@employeeNameInput')
                    .setValue('@employeeNameInput', nameValue)
                    .click("@employeeSaveButton")
                })

        employeeManager
            .pause(1000)
    },

    'Test 7 - Employee Editor: Invalid Single Space Character Title Input': browser => {
        employeeManager
            .click('@selectFirstEmployee')

            .getValue('@employeeTitleInput', function(result) {
                titleValue = result.value
                employeeManager
                    .clearValue('@employeeTitleInput')
                    .setValue('@employeeTitleInput', " ")
                    .click("@employeeSaveButton")
                    .pause(1000)
                    .verify.attributeContains('@employeeTitleInput', 'value', '', "BUG: The Title input field should not be able to be saved while empty.")
                    .clearValue('@employeeTitleInput')
                    .setValue('@employeeTitleInput', titleValue)
                    .click("@employeeSaveButton")
                })

        employeeManager
            .pause(1000)
    }
}