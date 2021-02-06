var app = {
    // Application varructor
    initialize: function() { 
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        ons.disableAutoStyling()
        ons.platform.select('ios')
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // StatusBar.backgroundColorByName('purple')

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log(id)
    },
};

app.get_categories = function(){
    console.log('send ajax ')
    $.ajax({
        url: 'db.json',
        type: 'GET',
        // contentType: 'application/json',
        success: function(data) {
            console.log(data)
            if (data){
                // var categordata[0]
                var categories_list = ''
                for (var i = 0; i < data.length; i++) {
                    var category = data[i];
                    for (let index = 0; index < category.topics.length; index++) {
                        const element = category.topics[index];
                        $('#featured_topic').html(element.raw_html)

                    }
                    categories_list += '<div class="category_wrapper" category-name="'+category.name+'">'+ category.name +'</div>'
                }
                console.log(categories_list)
                $('#categories_wrapper').html(categories_list)
            } else {
                $('#categories_wrapper').html('<div class="no_results">Sorry, No results found</div>')
            }
        },
    })
}

var test;
// Main Logic 
app.initialize = (function(_super) {
    return function() {
        // New Code
        // Mainly we define event listeners
            document.addEventListener('init', function(event) {
                if (event.target.matches('#main')) {
                    app.get_categories()
                }
            }, false);
    
        // End of new code
        return _super.apply(this, arguments);
    };         
})(app.initialize);

app.onDeviceReady = (function(_super) {
    return function() {
        // New Code
        // define all cordova related events

        // End of new code
        return _super.apply(this, arguments);
    };         

})(app.onDeviceReady);

// // category topics Logic 
// app.initialize = (function(_super) {
//     return function() {
//         // New Code

//         // End of new code
//         return _super.apply(this, arguments);
//     };         
// })(app.initialize);

// app.onDeviceReady = (function(_super) {
//     return function() {
//         // New Code

//         // End of new code
//         return _super.apply(this, arguments);
//     };         

// })(app.onDeviceReady);

// // Topic Logic 
// app.initialize = (function(_super) {
//     return function() {
//         // New Code

//         // End of new code
//         return _super.apply(this, arguments);
//     };         
// })(app.initialize);

// app.onDeviceReady = (function(_super) {
//     return function() {
//         // New Code

//         // End of new code
//         return _super.apply(this, arguments);
//     };         

// })(app.onDeviceReady);

app.initialize()