function cbConsumer(spyCB) {
    spyCB(4);
}


var myObj = {

    save: function () {
        console.log("Saving");
    },

    getQty: function () {
        return 3;
    }
};