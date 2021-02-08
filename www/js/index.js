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
            if (data){
                // var categordata[0]
                var categories_list = ''
                for (var i = 0; i < data.length; i++) {
                    var category = data[i];
                    categories_list += '<div class="category_wrapper" data-category-id="'+category.id+'" data-category-name="'+category.name+'">'+ category.name +'</div>'
                }
                $('#categories_wrapper').html(categories_list)
            } else {
                $('#categories_wrapper').html('<div class="no_results">Sorry, No results found</div>')
            }
        },
    })
}
app.get_featured = function(){
    console.log('send ajax ')
    $.ajax({
        url: 'db.json',
        type: 'GET',
        // contentType: 'application/json',
        success: function(data) {
            if (data){
                // var categordata[0]
                var featured_html = ''
                for (var i = 0; i < data.length; i++) {
                    var category = data[i];
                    for (let x = 0; x < category.topics.length; x++) {
                        const topic = category.topics[x];
                        if(topic.featured == true){
                            featured_html += '<div class="topic_wrapper" data-topic-id="'+topic.id+'">'+ topic.title +'</div>'
                        }
                    }
                }
                console.log(featured_html)
                $('#featured_wrapper').html(featured_html)
            } else {
                $('#featured_wrapper').html('<div class="no_results">Sorry, No results found</div>')
            }
        },
    })
}
app.get_category_topics = function(category_id){
    $.ajax({
        url: 'db.json',
        type: 'GET',
        // contentType: 'application/json',
        success: function(data) {
            if (data){
                // var categordata[0]
                var topics_html = ''
                for (var i = 0; i < data.length; i++) {
                    var category = data[i];
                    if( category.id == category_id){
                        for (let x = 0; x < category.topics.length; x++) {
                            const topic = category.topics[x];
                            topics_html += '<div class="topic_wrapper" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</div>'
                        }    
                    }
                }
                $('.topics_wrapper').html(topics_html)
            } else {
                $('.topics_wrapper').html('<div class="no_results">Sorry, No results found</div>')
            }
        },
    })
  
}
//////////

app.get_topic_content = function(topic_id){
    console.log('send ajax ')
    $.ajax({
        url: 'db.json',
        type: 'GET',
        success: function(data) {
            if (data){
                // var categordata[0]
                var content_html;
                for (var i = 0; i < data.length; i++) {
                    var category = data[i];
                    for (let x = 0; x < category.topics.length; x++) {
                        const topic = category.topics[x];
                        if(topic.id == topic_id){
                            content_html = topic.content
                        }
                    }
                }
                console.log(content_html)
                $('#content_wrapper').html(content_html)
            } else {
                $('#content_wrapper').html('<div class="no_results">Sorry, No results found</div>')
            }
        },
    })
}

///////////////


// Main Logic 
app.initialize = (function(_super) {
    return function() {
        // New Code
        // Mainly we define event listeners
            document.addEventListener('init', function(event) {
                if (event.target.matches('#main')) {
                    app.get_categories()
                    app.get_featured()
                    $(document).on('click', '.category_wrapper', function(e){
                        var el = e.target
                        // ons.notification.alert($(el).attr('category-name'))
                        ekbNav.pushPage('category.html',{
                            data: {
                              category_id: $(el).attr('data-category-id'),
                              category_name: $(el).attr('data-category-name'),
                              title: $(el).attr('data-category-name')
                              // ...
                            },
                        })
                    })
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
        document.addEventListener('init', function(event) {
            if (event.target.matches('#topic')) {
                var topic_id = ekbNav.topPage.data.topic_id
                var topic_title = ekbNav.topPage.data.topic_title
                $('#topic .toolbar__title').html(topic_title)
                app.get_topic_content(topic_id)
            }
        }, false);

        // End of new code
        return _super.apply(this, arguments);
    };         

})(app.onDeviceReady);

// // Category Logic
app.onDeviceReady = (function(_super) {
    return function() {
        // New Code
        // define all cordova related events
        document.addEventListener('init', function(event) {
            if (event.target.matches('#category')) {
                console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var category_name = ekbNav.topPage.data.category_name
                $('#category .toolbar__title').html(category_name)
                app.get_category_topics(category_id)
            }
        }, false);
        $(document).on('click','.topic_wrapper', function(e){
            var el = e.target
            var topic_id = $(el).attr('data-topic-id')
            var topic_title = $(el).attr('data-topic-title')
            ekbNav.pushPage('topic.html',{
                data:{
                    topic_id: topic_id,
                    topic_title: topic_title
                }
            })
        })

        // End of new code
        return _super.apply(this, arguments);
    };         

})(app.onDeviceReady);


// // Topic Logic 
app.initialize = (function(_super) {
    return function() {
        // New Code
            $(document).on('click', '.back_btn', function(){
                ekbNav.popPage()
            })
        // End of new code
        return _super.apply(this, arguments);
    };         
})(app.initialize);



app.initialize()