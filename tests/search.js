module.exports = {
    'Search for a flight': function (browser) {

        const timeout = 6000;
        const united = browser.page.homePage();
        const bookingSection = united.section.booking;
        const searchResults = browser.page.searchResultsPage();

        united.navigate()
        united.expect.element('body').to.be.present;
        bookingSection.click('@rdbOneWay');

        bookingSection.fillBookingTextFields(new Map(
            [['@txbOrigin', 'New York JFK'],
                ['@txbDestination', 'Miami'],
                ['@txbDepartDate', 'Aug 20']]
        ));

        bookingSection.expect.element('@txbOrigin').value.to.equal('New York JFK');
        bookingSection.expect.element('@txbDestination').value.to.equal('Miami MFL');
        bookingSection.expect.element('@txbDepartDate').value.to.equal('Aug 20');

        bookingSection.selectCabinType('Economy');
        bookingSection.click('@btnFindFlights')
            .expect.element('@btnFindFlights').to.not.be.present.before(timeout);
        united.expect.element('@loader').to.be.present.before(timeout);

        searchResults.expect.element('@resultTable').to.be.visible.before(10000);
        searchResults.sortByBasicEconomy('ascending');

        var array = [];
        browser.waitForElementVisible('#fl-results').elements('xpath', '//ul[@id="flight-result-list-revised"]/li[*]',
            function (result) {
                for (let i = 1; i < result.value.length; i++) {
                    let parent = `//li[*][${i}]`;
                    let departure = `${parent}//div[contains(@class,'depart')]`;
                    let arrival = `${parent}//div[contains(@class,'arrive')]`;
                    let stops = `${parent}//*[contains(@class,'connection-count')]`;
                    let duration = `${parent}//a[contains(@class,'flight-duration')]`;
                    let price = `${parent}//div[contains(@class,'price-point-revised')][1]`;

                    let json = {};
                    browser.getText('xpath', departure, function (result) {
                        json['Departure'] = result.value.replace(/\n/g, " ");
                    })
                        .getText('xpath', arrival, function (result) {
                            json['Arrival'] = result.value.replace(/\n/g, " ");
                        })
                        .getText('xpath', stops, function (result) {
                            json['Stops'] = result.value;
                        })
                        .getText('xpath', duration, function (result) {
                            json['Duration'] = result.value;
                        })
                        .getText('xpath', price, function (result) {
                            json['Price'] = result.value;
                        })
                        .perform(function () {
                            array.push(json);
                        })
                }
            })
            .perform(
                function () {
                    array.filter(
                        function (json) {
                            json.Price !== 'Not available';
                        })
                    console.log("Json array size " + array.length);
                    console.log("Json array " + JSON.stringify(array, null, '\t'));
                }
            )
    },

    afterEach: function (browser) {
        {
            browser.end();
        }
    }

};