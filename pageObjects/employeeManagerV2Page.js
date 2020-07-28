var inputNameFieldCommands = {
    inputName: function (data) {
        this
            .clearValue('@employeeNameInput')
            .setValue('@employeeNameInput', data.employeeName)
        return this
    },
    inputPhone: function (data) {
        this
            .clearValue('@employeePhoneInput')
            .setValue('@employeePhoneInput', data.employeePhone)
        return this
    },
    inputEmail: function (data) {
        this
            .clearValue('@employeeEmailInput')
            .setValue('@employeeEmailInput', data.employeeEmail)
        return this
    },
    inputTitle: function (data) {
        this
            .clearValue('@employeeTitleInput')
            .setValue('@employeeTitleInput', data.employeeTitle)
        return this
    },
    dismissDelete: function () {
        this
            .click("@employeeDeleteButton")
            .api.dismissAlert()
            .pause(250)
        return this
    },
    acceptDelete: function () {
        this
            .click("@employeeDeleteButton")
            .api.acceptAlert()
            .pause(250)
        return this
    },
    inputAllFields: function (data) {
        this
            .clearValue(data.employeeField)
            .setValue(data.employeeField, data.employeeInput)
        return this
    },
    verifyEmployeeFields: function (data) {
        var self = this
        this
            .getValue(data.employeeField, function (result) {
                var employeeField = result.value

                if (employeeField === data.employeeInput) {
                    self
                        .verify.attributeContains(data.employeeField, 'value', data.employeeInput, 
                            "VERIFIED: Saved change: " + data.employeeInput)
                } else {
                    self
                        .verify.not.attributeContains(data.employeeField, 'value', data.employeeInput, 
                            "BUG: The employee field is incorrect: " + data.employeeInput)
                }

            })
        return this
    },
    verifyCanceledEmployee: function (name) {
        var self = this
        this
            .click("@employeeCancelButton")

            .getValue('@employeeNameInput', function (result) {
                var employeeNameField = result.value

                if (employeeNameField === name) {
                    self
                        .verify.attributeContains("@employeeNameInput", 'value', name, 
                            "VERIFIED: No change in employee file: " + name)
                } else {
                    self
                        .verify.not.attributeContains("@employeeNameInput", 'value', name, 
                            "BUG: The employee file has been modified: " + name)
                }

            })
        return this
    },
    verifyCreatedEmployee: function (name) {
        var self = this
        this
            .setValue('@searchBox', name)
            .click("@selectNewEmployee")

            .getValue('@employeeNameInput', function (result) {
                var employeeNameField = result.value

                if (employeeNameField === name) {
                    self
                        .verify.attributeContains("@employeeNameInput", 'value', name, 
                            "VERIFIED: Employee created: " + name)
                } else {
                    self
                        .verify.not.attributeContains("@employeeNameInput", 'value', name, 
                            "BUG: Employee cannot be found: " + name)
                }

            })
        return this
    },
    saveOverfilledEmployeeName: function (name) {
        this
            .click('@selectFirstEmployee')
            .clearValue('@employeeNameInput')
            .setValue('@employeeNameInput', name)
            .click("@employeeSaveButton")
            .click("@selectFirstEmployee")
        return this
    },
    verifyFieldErrors: function (fieldType) {
        this
            .verifyNameFieldErrors(fieldType)
            .verifyPhoneFieldErrors(fieldType)
            .verifyEmailFieldErrors(fieldType)
            .verifyTitleFieldErrors(fieldType)
        return this
    },
    verifyOverfilledEmployeeName: function (name, fieldType) {
        this
            .saveOverfilledEmployeeName(name)
            .verifyFieldErrors(fieldType)
        return this
    },
    saveEmptyEmployeeName: function (name, browser) {
        this
            .click('@selectFirstEmployee')
            .clearValue('@employeeNameInput')
            .setValue('@employeeNameInput', name)
            .setValue('@employeeNameInput', [browser.Keys.BACK_SPACE])
            .click("@employeeSaveButton")
            .click("@selectFirstEmployee")
        return this
    },
    saveOverfilledEmployeeTitle: function (title) {
        this
            .click('@selectFirstEmployee')
            .clearValue('@employeeTitleInput')
            .setValue('@employeeTitleInput', title)
            .click("@employeeSaveButton")
        return this
    },
    verifyNameFieldErrors: function (fieldType) {
        var self = this
        this
            .getAttribute('@employeeNameInput', 'class', function(result) {
                var employeeNameField = result.value

                if (employeeNameField === "materialInput invalidInfo" && fieldType === "name") {
                    self
                        .verify.attributeContains('@employeeNameInput', 'class', 'invalidInfo', 
                            "VERIFIED: The Name field is underlined in red")
                        .verify.containsText("@nameError", 
                            "The name field must be between 1 and 30 characters long.", 
                            "VERIFIED: The Name field error message is visible")
                } else if (employeeNameField === "materialInput invalidInfo" && fieldType != "name") {
                    self
                        .verify.attributeContains('@employeeNameInput', 'class', 'invalidInfo', 
                            "BUG: The Name field should not be underlined in red")
                        .verify.not.containsText("@nameError", 
                            "The name field must be between 1 and 30 characters long.", 
                            "VERIFIED: The Name field error message should not be visible")
                } else if (employeeNameField === "materialInput") {
                    self
                        .verify.attributeContains('@employeeNameInput', 'class', 'materialInput', 
                            "VERIFIED: The Name field is not underlined in red")
                        .expect.element("@nameError").to.not.be.present
                } else {
                    self
                        .verify.not.attributeContains('@employeeNameInput', 'class', 'invalidInfo', 
                            "BUG: The Name field is not underlined in red")
                        .expect.element("@nameError").to.not.be.present
                }

            })
        return this
    },
    verifyEmptyEmployeeName: function (name, browser, fieldType) {
        this
            .saveEmptyEmployeeName(name, browser)
            .verifyNameFieldErrors(fieldType)
        return this
    },
    verifyTitleFieldErrors: function (fieldType) {
        var self = this
        this
            .getAttribute('@employeeTitleInput', 'class', function(result) {
                var employeeTitleField = result.value

                if (employeeTitleField === "materialInput invalidInfo" && fieldType === "title") {
                    self
                        .verify.attributeContains('@employeeTitleInput', 'class', 'invalidInfo', 
                            "VERIFIED: The Title field is underlined in red")
                        .verify.containsText("@titleError", 
                            "The title field must be between 1 and 30 characters long.", 
                            "VERIFIED: The Title field error message is visible")
                } else if (employeeTitleField === "materialInput invalidInfo" && fieldType != "title") {
                    self
                        .verify.attributeContains('@employeeTitleInput', 'class', 'invalidInfo', 
                            "BUG: The Title field should not be underlined in red")
                        .verify.containsText("@titleError", 
                            "The title field must be between 1 and 30 characters long.", 
                            "BUG: The Title field error message should not be visible")
                } else if (employeeTitleField === "materialInput") {
                    self
                        .verify.attributeContains('@employeeTitleInput', 'class', 'materialInput', 
                            "VERIFIED: The Title field is not underlined in red")
                        .expect.element('@titleError').to.not.be.present
                } else {
                    self
                        .verify.not.attributeContains('@employeeTitleInput', 'class', 'invalidInfo', 
                            "BUG: The Title field is not underlined in red")
                        .expect.element('@titleError').to.not.be.present
                }

            })
        return this
    },
    verifyPhoneFieldErrors: function (fieldType) {
        var self = this
        this
            .getAttribute('@employeePhoneInput', 'class', function(result) {
                var employeePhoneField = result.value

                if (employeePhoneField === "materialInput invalidInfo" && fieldType === "phone") {
                    self
                        .verify.attributeContains('@employeePhoneInput', 'class', 'invalidInfo', 
                            "VERIFIED: The Phone field is underlined in red")
                        .verify.containsText("@phoneError", "The phone number must be 10 digits long.", 
                            "VERIFIED: The Phone field error message is visible")
                } else if (employeePhoneField === "materialInput invalidInfo" && fieldType != "phone") {
                    self
                        .verify.attributeContains('@employeePhoneInput', 'class', 'invalidInfo', 
                            "BUG: The Phone field should not be underlined in red")
                } else if (employeePhoneField === "materialInput") {
                    self
                        .verify.attributeContains('@employeePhoneInput', 'class', 'materialInput', 
                            "VERIFIED: The Phone field is not underlined in red")
                        .expect.element("@phoneError").to.not.be.present
                } else {
                    self
                        .verify.not.attributeContains('@employeePhoneInput', 'class', 'invalidInfo', 
                            "BUG: The Phone field is not underlined in red")
                        .expect.element("@phoneError").to.not.be.present
                }

            })
        return this
    },
    verifyEmailFieldErrors: function (fieldType) {
        var self = this
        this
            .getAttribute('@employeeEmailInput', 'class', function(result) {
                var employeeEmailField = result.value

                if (employeeEmailField === "materialInput invalidInfo" && fieldType === "email") {
                    self
                        .verify.attributeContains('@employeeEmailInput', 'class', 'invalidInfo', 
                            "VERIFIED: The Email field is underlined in red")
                        .verify.containsText('@emailError', "", 
                            "BUG: The Email field error message does not exist")
                } else if (employeeEmailField === "materialInput invalidInfo" && fieldType != "phone") {
                    self
                        .verify.attributeContains('@employeeEmailInput', 'class', 'invalidInfo', 
                            "BUG: The Email field should not be underlined in red")
                        .verify.containsText('@emailError', "", 
                            "BUG: The Email field error message does not exist")
                } else if (employeeEmailField === "materialInput") {
                    self
                        .verify.attributeContains('@employeeEmailInput', 'class', 'materialInput', 
                            "VERIFIED: The Email field is not underlined in red")
                        .expect.element('@emailError').to.not.be.present
                } else {
                    self
                        .verify.not.attributeContains('@employeeEmailInput', 'class', 'invalidInfo', 
                            "BUG: The Email field is not underlined in red")
                        .expect.element('@emailError').to.not.be.present
                }

            })
        return this
    },
    verifyFieldCharacterRange: function () {
        var self = this
        this
            .click("@selectFirstEmployee")
            
            .getValue('@employeeTitleInput', function(result) {
                var employeeTitleFieldLength = result.value.length

                if (employeeTitleFieldLength > 1 && employeeTitleFieldLength < 30) {
                    self
                        .verify.ok(employeeTitleFieldLength > 1 && employeeTitleFieldLength < 30, 
                            "VERIFIED: The employee field reset and is between 1 and 30 characters")
                } else {
                    self
                        .verify.not.ok(employeeTitleFieldLength > 1 && employeeTitleFieldLength < 30, 
                            "BUG: The employee field was not reset and is not between 1 and 30 characters")
                }

            })
        return this
    },
    verifyOverfilledEmployeeTitle: function (title, fieldType) {
        this
            .saveOverfilledEmployeeTitle(title)
            .verifyTitleFieldErrors(fieldType)
            .verifyFieldCharacterRange()
        return this
    },
    verifySingleSpaceEmployeeName: function () {
        var self = this
        this
            .click('@selectFirstEmployee')

            .getValue('@employeeNameInput', function(result) {
                var nameValue = result.value
                self
                    .clearValue('@employeeNameInput')
                    .setValue('@employeeNameInput', " ")
                    .click("@employeeSaveButton")

            .perform(function () {
                self.getValue('@employeeNameInput', function (result) {
                    var newNameValue = result.value

                    if (newNameValue === " ") {
                        self
                            .verify.attributeContains('@employeeNameInput', 'value', ' ', 
                                "BUG: The Name input field should not be able to be saved while empty")
                            .expect.element('@nameError').to.not.be.present
                    } else {
                        self
                            .verify.attributeContains('@employeeTitleInput', 'class', 'invalidInfo', 
                                "VERIFIED: The Name input field is underlined in red")
                            .expect.element('@nameError').to.be.present
                    }
                  
                })
            })
            self
                .pause(250)
                .clearValue('@employeeNameInput')
                .setValue('@employeeNameInput', nameValue)
                .click("@employeeSaveButton")
                .pause(250)
            })
        return this
    },
    verifySingleSpaceEmployeeTitle: function () {
        var self = this
        this
            .click('@selectFirstEmployee')

            .getValue('@employeeTitleInput', function(result) {
                var titleValue = result.value
                self
                    .clearValue('@employeeTitleInput')
                    .setValue('@employeeTitleInput', " ")
                    .pause(250)
                    .click("@employeeSaveButton")

            .perform(function () {
                self.getValue('@employeeTitleInput', function (result) {
                    var newTitleValue = result.value

                    if (newTitleValue == " ") {
                        self
                            .verify.attributeContains('@employeeTitleInput', 'value', ' ', 
                                "BUG: The Title input field should not be able to be saved while empty")
                            .expect.element('@titleError').to.not.be.present
                    } else {
                        self
                            .verify.attributeContains('@employeeTitleInput', 'class', 'invalidInfo', 
                                "VERIFIED: The Title input field is underlined in red")
                            .expect.element('@titleError').to.be.present
                    } 
                 
                })
            })   
            self 
                .pause(250)
                .clearValue('@employeeTitleInput')
                .setValue('@employeeTitleInput', titleValue)
                .click("@employeeSaveButton")
                .pause(250)
            })
        return this
    },
    verifyCancelButton: function (data) {
        var self = this
        this
            .click('@selectFirstEmployee')

            .getValue('@employeeNameInput', function(result) {
                var nameValue = result.value

                //Test the Cancel Button, after each field
                data.forEach(test => {
                    self
                        .inputAllFields(test)
                        .click("@employeeCancelButton")
                })

                //Test the Cancel Button, after all fields
                data.forEach(test => {
                    self.inputAllFields(test)
                })

                //Cancel employee and verify
                self.verifyCanceledEmployee(nameValue)
        })
        return this
    },
    verifyAddEmployeeFlow: function (data, browser) {
        this
            //Test Add Employee, Save/Clear Buttons, Search Box
            .click('@addEmployee')
            .click('@selectEmployee')

            //Test the Save Button, after each field
            data.forEach(test => {
                this
                    .inputAllFields(test)
                    .click("@employeeSaveButton")
                    .pause(250)
            })

            data.forEach(test => {
                this.verifyEmployeeFields(test)
            })

        this.verifyCreatedEmployee("Spike Spiegel")

            //Test the Delete Button
            .dismissDelete()
            .acceptDelete()
            .verifyDeletedEmployee("Spike Spiegel")
        return this
    },
    verifyDeletedEmployee: function (name) {
        var self = this
        this
            .click('@clearButton')
            .setValue('@searchBox', name)

            self.api.element('@checkEmployee', function(result) {
                var employeeNameListing = result.value

                if (employeeNameListing) {
                    self
                        .expect.element("@checkEmployee").to.not.be.present
                } else {
                    self
                        .expect.element("@checkEmployee").to.be.present
                }

            })
        return this
    },
}

module.exports = {
    url: 'https://devmountain-qa.github.io/employee-manager-v2/build/index.html',
    commands: [inputNameFieldCommands],
    elements: {
        pageTitle: {
            selector: "//span[@class='titleText']",
            locateStrategy: 'xpath'
        },
        employeeTitle: {
            selector: "//p[@id='employeeTitle']",
            locateStrategy: 'xpath'
        },
        searchBox: {
            selector: "//input[@placeholder='Search Employees']",
            locateStrategy: 'xpath'
        },
        selectFirstEmployee: {
            selector: "//li[2]",
            locateStrategy: 'xpath'
        },
        selectSecondEmployee: {
            selector: "//li[3]",
            locateStrategy: 'xpath'
        },
        employeeNameInput: {
            selector: "//input[@name='nameEntry']",
            locateStrategy: 'xpath'
        },
        employeePhoneInput: {
            selector: "//input[@name='phoneEntry']",
            locateStrategy: 'xpath'
        },
        employeeEmailInput: {
            selector: "//input[@name='emailEntry']",
            locateStrategy: 'xpath'
        },
        employeeTitleInput: {
            selector: "//input[@name='titleEntry']",
            locateStrategy: 'xpath'
        },
        employeeCancelButton: {
            selector: "//button[@name='cancel']",
            locateStrategy: 'xpath'
        },
        employeeSaveButton: {
            selector: "//button[@id='saveBtn']",
            locateStrategy: 'xpath'
        },
        employeeDeleteButton: {
            selector: "//button[@name='delete']",
            locateStrategy: 'xpath'
        },
        clearButton: {
            selector: "//button[@name='clearSearch']",
            locateStrategy: 'xpath'
        },
        nameError: {
            selector: "//div[contains(text(),'The name field must be " + 
                "between 1 and 30 characters long.')]",
            locateStrategy: 'xpath'
        },
        phoneError: {
            selector: "//div[contains(text(),'The phone number must be 10 digits long.')]",
            locateStrategy: 'xpath'
        },
        titleError: {
            selector: "//div[contains(text(),'The title field must be " +
                "between 1 and 30 characters long.')]",
            locateStrategy: 'xpath'
        },
        emailError: {
            selector: "//span[@class='errorMessage']//div[last()]",
            locateStrategy: 'xpath'
        },
        addEmployee: {
            selector: "//li[@name='addEmployee']",
            locateStrategy: 'xpath'
        },
        selectEmployee: {
            selector: "//li[text()='New Employee']",
            locateStrategy: 'xpath'
        },
        selectNewEmployee: {
            selector: "//li[text()='Spike Spiegel']",
            locateStrategy: 'xpath'
        },
        checkEmployee: {
            selector: "//li[contains(@name,'employee')]",
            locateStrategy: 'xpath'
        }
    }
}