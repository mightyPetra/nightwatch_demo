const bookingActions = {
    fillBookingTextFields: function (map) {

        for (let [element, value] of map) {
            this.expect.element(element).to.be.enabled;
            this.clearValue(element)
                .expect.element(element).value.equal('');
            this.setValue(element, value);

            switch (element) {
                case '@txbOrigin':
                    this.api.waitForElementVisible('#bookFlightOriginInput-menu')
                        .click('#bookFlightOriginInput-menu li button:nth-child(1)');
                    break;
                case '@txbDestination':
                    this.api.waitForElementVisible('#bookFlightDestinationInput-menu')
                        .click('#bookFlightDestinationInput-menu li button:nth-child(1)');
                    break;
            }
        }
    },
    setFlightDate: function (element, value) {
        this.clearValue(element)
            .expect.element(element).value.to.equal('');
        this.setValue(element, value)
            .expect.element(element).value.to.equal(value);

        return this;
    },
    selectCabinType: function (type) {
        const listBoxItem = `li[aria-label='${type}']`

        this.click('@drdCabinType')
            .waitForElementVisible('@listCabinType')
            .click(listBoxItem)
            .expect.element('#cabinType div').text.to.equal(type);
    }
};

module.exports = {
    url: 'https://www.united.com/en/us',
    elements: {
        loader: "#fl-results-loader-full"
    },
    sections: {
        booking: {
            selector: '#travelTab-panel',
            commands: [bookingActions],
            elements: {
                rdbOneWay: '#oneway',
                txbOrigin: '#bookFlightOriginInput',
                txbDestination: '#bookFlightDestinationInput',
                // originSearchResult: {
                //     selector: '#bookFlightOriginInput-menu li button',
                //     index: 0
                // },
                // destinationSearchResult: {
                //     selector: '#bookFlightDestinationInput-menu li button',
                //     index: 0
                // },
                txbDepartDate: '#DepartDate',
                drdCabinType: '#cabinType',
                listCabinType: '#cabinType ~ div ul[role="listbox"]',
                btnFindFlights: 'button[type="submit"]',
            }
        }
    }
};
