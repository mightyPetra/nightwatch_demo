const tableActions = {
    sortByBasicEconomy: function (order) {
        const selector = '#column-ECO-BASIC';
        var actualOrder;
        this.api.getAttribute(selector, order, function (result) {
            actualOrder = result.value;
        }).perform(function () {
            if (actualOrder !== order) {
                this.click(selector);
                if (!actualOrder && order === 'descending') {
                    this.click(selector);
                }
            }
        });
    }
};

module.exports = {
    commands: [tableActions],
    elements: {
        resultTable: "#fl-results",
    }
}
;