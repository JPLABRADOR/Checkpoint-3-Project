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
    dismissDelete: function (data) {
        this
            .click("@employeeDeleteButton")
            .api.dismissAlert()
            .pause(1000)
        return this
    },
    acceptDelete: function (data) {
        this
            .click("@employeeDeleteButton")
            .api.acceptAlert()
            .pause(1000)
        return this
    }
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
            selector: "//div[contains(text(),'The name field must be between 1 and 30 characters')]",
            locateStrategy: 'xpath'
        },
        titleError: {
            selector: "//div[contains(text(),'The title field must be between 1 and 30 character')]",
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
        }
    }
}