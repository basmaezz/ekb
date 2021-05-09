
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
        // console.log(id)
    },
};

app.get_categories = function(){
    var data = app.content
    if (data){
        // var categordata[0]
        var categories_list = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            // console.log(data[i]);
            categories_list += '<div class="category_wrapper"><ons-card  data-category-id="'+category.id+'" data-category-name="'+category.name+'"" ><img src="'+category.icon+'">'+ category.name +'</ons-card></div>'
        }
        $('#categories_wrapper').html(categories_list)
    } else {
        $('#categories_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.get_featured = function(){
    var data = app.content
    if (data){
        // var categordata[0]
        var featured_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            
            for (let x = 0; x < category.topics.length; x++) {
                const topic = category.topics[x];
                if(topic.featured == true){
                    featured_html += '<div class="topic_wrapper"><ons-card data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                    // console.log(featured_html);
                }
            }
        }
        $('#featured_wrapper').html(featured_html)
    } else {
        $('#featured_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.get_category_topics = function(category_id){
    var data = app.content
    // console.log(category_id)
    if (data){
        // console.log('h   ere is what we need')
        // console.log(data)
        // var categordata[0]
        var topics_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            if( category.id == category_id){
                for (let x = 0; x < category.topics.length; x++) {
                    const topic = category.topics[x]; 
                    if(topic.color){
                        if (topic.parent_topic){
                            topics_html += '<div  class="topic_wrapper parent_topic" ><ons-card style=" color:white;background:'+topic.color+'" data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        } else {
                            topics_html += '<div  class="topic_wrapper" ><ons-card style=" color:white;background:'+topic.color+'" data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        }
                        // console.log(topic.color)
                    } else {
                        if (topic.parent_topic){
                            topics_html += '<div class="topic_wrapper parent_topic" ><ons-card data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        } else {
                            topics_html += '<div class="topic_wrapper" ><ons-card data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        }
                    }        
                }    
            }
        }
        // console.log(topics_html)
        $('.topics_wrapper').html(topics_html)
    } else {
        $('.topics_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
//////////

app.get_topic_content = function(topic_id){
    var self = this
    // console.log('here we start')
    var data = self.content
    if (data){
        // var categordata[0]
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            for (let x = 0; x < category.topics.length; x++) {
                const topic = category.topics[x];
                if( topic.id == topic_id){
                    if (topic.parent_topic){
                        for (let t = 0; t < topic.child_topics.length; t++) {
                            const child_topic = topic.child_topics[t];
                            if(child_topic.id == topic_id){
                                var content_html = ''
                                // console.log(child_topic.pages)
                                self.active_topic = {'id':child_topic.id,'title':child_topic.title,'parent_topic':child_topic.parent_topic,'child_topics':child_topic.child_topics}
                                    if(child_topic.pages.length > 1){
                                        self.active_topic.pages = child_topic.pages
                                        content_html += self.active_topic.pages[0].content
                                        // console.log(content_html)
                                        $('#topic .content_wrapper').html(content_html)
                                        self.active_page_number = 0
                                        $('#topic .page__content').append('<div class="topic_nav_wrapper"><div class="nav_btn_wrapper"><div class="topic_nav_btn prev hidden">السابق</div></div><div class="nav_btn_wrapper"><div class="topic_nav_btn next">التالي</div></div> </div>')    
                                    } else{
                                        // content_html += 'nothing found'
                                        self.active_topic.pages = child_topic.pages
                                        content_html += self.active_topic.pages[0].content
                                        // console.log(content_html)
                                        $('#topic .content_wrapper').html(content_html)
                                        self.active_page_number = 0
                                        $('#topic .content_wrapper').html(content_html)
                                    }    
                            }
                        }
                    } else {
                            // console.log(topic)
                            // console.log(topic.pages)
                            // console.log(topic)
                            var content_html = ''
                            self.active_topic = {'id':topic.id,'title':topic.title,'parent_topic':topic.parent_topic,'child_topics':topic.child_topics}
                            // console.log(self.active_topic)
                            if (!self.active_topic.parent_topic){
                                if(topic.pages.length > 1){
                                    console.log('we have pages')
                                    // console.log(topic.pages)
                                    self.active_topic.pages = topic.pages
                                    // console.log(self.active_topic.pages)
                                    // for (let i = 0; i < topic.pages.length; i++) {
                                    //     const page = topic.pages[i];
                                    //     self.active_topic.pages.push({'page_id': page.id, 'page_content': page.content})
                                    // }
                                    content_html += self.active_topic.pages[0].content
                                    // console.log(content_html)
                                    $('#topic .content_wrapper').html(content_html)
                                    self.active_page_number = 0
                                    $('#topic .page__content').append('<div class="topic_nav_wrapper"><div class="nav_btn_wrapper"><div class="topic_nav_btn prev hidden">السابق</div></div><div class="nav_btn_wrapper"><div class="topic_nav_btn next">التالي</div></div> </div>')    
                                } else{
                                    // console.log('we have pages')
                                    // console.log(topic.pages)
                                    self.active_topic.pages = topic.pages
                                    // console.log(self.active_topic.pages)
                                    // for (let i = 0; i < topic.pages.length; i++) {
                                    //     const page = topic.pages[i];
                                    //     self.active_topic.pages.push({'page_id': page.id, 'page_content': page.content})
                                    // }
                                    content_html += self.active_topic.pages[0].content
                                    // console.log(content_html)
                                    $('#topic .content_wrapper').html(content_html)
                                    self.active_page_number = 0
                                }    
                            } else {
                                for (let i = 0; i < self.active_topic.child_topics.length; i++) {
                                    const topic = self.active_topic.child_topics[i];
                                    
                                }
                            }
                    }
                }
                // console.log(content_html)
            }
        }
        // console.log(content_html)
    } else {
        $('#topic .content_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.click_topic_next_page = function(){
    // var content_html = app.cont
    if (app.active_topic.pages.length > 1){
        app.active_page_number =  app.active_page_number + 1
        if(app.active_topic.pages.length == app.active_page_number + 1){
            $('.topic_nav_btn.next').addClass('hidden')
            $('.topic_nav_btn.prev').removeClass('hidden')
        } else {
            $('.topic_nav_btn.prev').removeClass('hidden')
        }
        var content = app.active_topic.pages[app.active_page_number].page_content
        $('#topic .content_wrapper').html(content)    
    }
}
app.click_topic_prev_page = function(){
    app.active_page_number =  app.active_page_number - 1
    if(app.active_page_number == 0){
        $('.topic_nav_btn.prev').addClass('hidden')
        $('.topic_nav_btn.next').removeClass('hidden')
    } else {
        $('.topic_nav_btn.next').removeClass('hidden')
    }
    var content = app.active_topic.pages[app.active_page_number].page_content
    $('#topic .content_wrapper').html(content)
}

app.get_search = function(txt_search) {
    if(txt_search != ''){
        var topics_html = ''
        // app.content.array.forEach(element => {
            
        // });
        app.content.forEach(function(category){
            category.topics.forEach(function(topic){
                if (topic.title.toLowerCase().includes(txt_search.toLowerCase()) ){
                    topics_html += '<div class="topic_wrapper" ><ons-card data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+topic.title+'</ons-card></div>'
                }
            })
        })
        $('#search_wrapper').html(topics_html)
        $('#categories_wrapper').hide()
        $('#featured_wrapper').hide()
        $('#search_wrapper').show()    
    } else {
        $('#search_wrapper').hide() 
        $('#categories_wrapper').show()
        $('#featured_wrapper').show()
    }

}

///////////////


// Main Logic 
app.initialize = (function(_super) {
    return function() {
        // New Code
        // Mainly we define event listeners
            $(document).on('click', '.topic_nav_btn.next', app.click_topic_next_page)
            $(document).on('click', '.topic_nav_btn.prev', app.click_topic_prev_page)
            document.addEventListener('init', function(event) {
                if (event.target.matches('#main')) {
                    app.get_categories()
                    app.get_featured()
                    $(document).on('click', '.category_wrapper', function(e){
                        e.stopImmediatePropagation()
                            ekbNav.pushPage('category.html',{
                                data: {
                                  category_id: $(this).find('ons-card').attr('data-category-id'),
                                  category_name: $(this).find('ons-card').attr('data-category-name'),
                                  title: $(this).find('ons-card').attr('data-category-name')
                                },
                            })
                    })
                    $(document).on('input','.search',function(e){
                            var el = e.target
                            var txt_search = $(el).val()
                            app.get_search(txt_search)
                    });
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
        // document.addEventListener('init', function(event) {
        //     if (event.target.matches('#topic')) {
        //         var topic_id = ekbNav.topPage.data.id
        //         var topic_title = ekbNav.topPage.data.title
        //         $('#topic .toolbar__title').html(topic_title)
        //         app.get_topic_content(topic_id)
        //     }
        // }, false);

        // End of new code
        return _super.apply(this, arguments);
    };         

})(app.onDeviceReady);

app.get_child_topics = function(category_id, topic_id){
    var data = app.content
    // console.log(category_id)
    if (data){
        // console.log('h   ere is what we need')
        // console.log(data)
        // var categordata[0]
        var topics_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            if( category.id == category_id){
                for (let x = 0; x < category.topics.length; x++) {
                    const topic = category.topics[x]; 
                    if (topic.id == topic_id){
                        for (let i = 0; i < topic.child_topics.length; i++) {
                            const child_topic = topic.child_topics[i];
                            if(child_topic.color){
                                if (child_topic.parent_topic){
                                    topics_html += '<div  class="topic_wrapper parent_topic" ><ons-card style=" color:white;background:'+child_topic.color+'" data-topic-id="'+child_topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
                                } else {
                                    topics_html += '<div  class="topic_wrapper" ><ons-card style=" color:white;background:'+child_topic.color+'" data-topic-id="'+child_topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
                                }
                                // console.log(topic.color)
                            } else {
                                if (child_topic.parent_topic){
                                    topics_html += '<div class="topic_wrapper parent_topic" ><ons-card data-topic-id="'+child_topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
                                } else {
                                    topics_html += '<div class="topic_wrapper" ><ons-card data-topic-id="'+child_topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
                                }
                            }       
                        }
                    }
                }    
            }
        }
        // console.log(topics_html)
        $('#parent_topic .topics_wrapper').html(topics_html)
    } else {
        $('#parent_topic .topics_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }

}
// // Category Logic
app.onDeviceReady = (function(_super) {
    return function() {
        // New Code
        // define all cordova related events
        document.addEventListener('init', function(event) {
            if (event.target.matches('#category')) {
                // console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var category_name = ekbNav.topPage.data.category_name
                $('#category .toolbar__title').html(category_name)
                app.get_category_topics(category_id)
            }
        }, false);
        document.addEventListener('init', function(event) {
            if (event.target.matches('#parent_topic')) {
                // console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var topic_id = ekbNav.topPage.data.id
                var title = ekbNav.topPage.data.title
                $('#parent_topic .toolbar__title').html(ekbNav.topPage.data.title)
                app.get_child_topics(category_id, topic_id)
            }
        }, false);
        document.addEventListener('init', function(event) {
            if (event.target.matches('#topic')) {
                // console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var topic_id = ekbNav.topPage.data.id
                var title = ekbNav.topPage.data.title
                $('#topic .toolbar__title').html(ekbNav.topPage.data.title)
                app.get_topic_content(topic_id)
            }
        }, false);        
        $(document).on('click','.topic_wrapper', function(){
            if($(this).hasClass('parent_topic')){
                ekbNav.pushPage('parent_topic.html',
                {
                    data: {
                      id: $(this).find('ons-card').attr('data-topic-id'),
                      title: $(this).find('ons-card').attr('data-topic-title'),
                      category_id: $(this).find('ons-card').attr('data-category-id'),
                    }
                })
                // console.log($(this).find('ons-card').attr('data-topic-title'))
            } else {
                ekbNav.pushPage('topic.html',{
                    data:{
                        id: $(this).find('ons-card').attr('data-topic-id'),
                        title: $(this).find('ons-card').attr('data-topic-title'),
                    }
                })
                // console.log($(this).find('ons-card').attr('data-topic-title'))
            }
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
app.images = [
    {
        topic_id: 1,
        img: [
            'img/imgs/intro.png',
            'img/imgs/login.png',
            'img/imgs/login2.png',            
        ]
    },{
        topic_id: 2,
        img: [
            'img/imgs/simplesearch.png',
            'img/imgs/searchresult.png',
            'img/imgs/energy.png',
            'img/imgs/resource.png',
            'img/imgs/key.png',
            'img/imgs/article.png'

              ]
    },{
        topic_id: 3,
        img: [
            'img/imgs/discovery1.png',
            'img/imgs/discovery2.png',
            'img/imgs/video.png',
            'img/imgs/share.png',
            'img/imgs/discovery3.png',
            'img/imgs/discovery4.png',
        ]
    },{
        topic_id: 4,
        img: [
            'img/imgs/teachergate.png',         
        ]
    },{
        topic_id: 5,
        img: [
            'img/imgs/childrengate.png'
         
        ]
    },{
        topic_id: 6,
        img: [
            'img/imgs/research.png'
        ]
    }
    ,{
        topic_id: 7,
        img: [
            'img/imgs/readers.png'
        ]
    },{
        topic_id: 7,
        img: [
            'img/imgs/library.png',
            'img/imgs/searchlibrabry.png',
            'img/imgs/loginlib.png',
            'img/imgs/library2.png'
        ]
    },{
        topic_id: 8,
        img: [
            'img/chemistry.png',
            'img/chemistrysearch.png',
            'img/chemistrysite.png',

        ]
    },{
        topic_id: 9,
        img: [
            'img/mebooks.png',
            'img/mebooksstore.png',
        ]
    }
    ,{
        topic_id: 10,
        img: [
            'img/clickgigiral.png',
            'img/clickgigiral2.png',
            'img/clickgigiralresource.png',

        ]
    },{
        topic_id: 10,
        img: [
            'img/national.png',
            'img/national2.png',

        ]
    },{
        topic_id: 11,
        img: [
            'img/library.png',
        ]
    }
];

app.content = [
            {
                id:1,
                name:'بنك المعرفه',
                icon:"img/undraw_online_test_gba7.svg",
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                    {
                        id:2,
                        title:'إنشاء حساب على بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                      {
                        id:3,
                        title:'تسجيل الدخول الى بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    }
                ],
        

            },
            {
                id:2,
                name:'محرك البحث الأكاديمي',
                color:'#4285F4',
                icon:"img/undraw_Web_search_re_efla.svg",
                topics:[
                    {
                        id:1,
                        title:'كيفيه استخدام محرك البحث',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                        content:'<h1 style="text-align:right"><span style="font-size:16px">يوجد هناك نوعان من البحث&nbsp;</span></h1> <h1 style="text-align:right"><span style="font-size:14px"><strong>اولا البحث البسيط</strong></span></h1><p> نكتب فى شريط البحث <strong>ancient Egypt</strong></p> <img class="content_image" src="'+ app.images[1].img[0] +'"><p dir="rtl"><span style="font-size:16px">بالضغط على <em><strong>Enter</strong></em>&nbsp;تظهر النتيجه كما فى النافذه التاليه</span></p><img class="content_image" src="'+ app.images[1].img[1] +'"><p dir="rtl"><span style="font-size:16px">نكتب في شريط البحث عنوان الطاقه ثم نظغط علي بحث متقدم</span></p><img class="content_image" src="'+ app.images[1].img[2] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وهى تحتوى على جميع المصادر التي بها عنوان البحث يمكن التحكم في نتائج البحث &nbsp;من حيث اختيار مصادر معينة&nbsp;</span></span><span dir="RTL" lang="AR-SA"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن تحديد نطاق البحث في مجلات &nbsp;معينة يحددها الباحث كما في <strong>النافذة التالية</strong> </span></span></span></p><img class="content_image" src="'+ app.images[1].img[3] +'"><p dir="RTL" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:16px">تستطيع من خلال البحث المتقدم البحث عن الكلمه المفتاحيه أو المؤلف أو العنوان أو الموضوع أو الوصف كما فى<strong> النافذة التالية</strong></span></span></p><img class="content_image" src="'+ app.images[1].img[4] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">أما عند اختيارالمقال الأول لنتيجة البحث عن الطاقة تظهر النافذة التالية&nbsp; التى&nbsp;يتاح من خلالها أمكانية ارسال المقال بأكثر من طريقة لصديق مثل&nbsp; الفيس او البريد الالكتروني أو تويتر ..... وكذلك امكانية عرض المقال باللغة الانجليزية و امكانية&nbsp; طباعة المقال</span></span></span></p><img class="content_image" src="'+ app.images[1].img[5] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">توضح&nbsp; كيفية ارسال المقال لصديق عبر البريد الالكتروني</span></span></span></p>',
                            },   {
                                id:2,
                        content:'<h1 style="text-align:right"><span style="font-size:16px">يوجد هناك نوعان من البحث&nbsp;</span></h1> <h1 style="text-align:right"><span style="font-size:14px"><strong>اولا البحث البسيط</strong></span></h1><p> نكتب فى شريط البحث <strong>ancient Egypt</strong></p> <img class="content_image" src="'+ app.images[1].img[0] +'"><p dir="rtl"><span style="font-size:16px">بالضغط على <em><strong>Enter</strong></em>&nbsp;تظهر النتيجه كما فى النافذه التاليه</span></p><img class="content_image" src="'+ app.images[1].img[1] +'"><p dir="rtl"><span style="font-size:16px">نكتب في شريط البحث عنوان الطاقه ثم نظغط علي بحث متقدم</span></p><img class="content_image" src="'+ app.images[1].img[2] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وهى تحتوى على جميع المصادر التي بها عنوان البحث يمكن التحكم في نتائج البحث &nbsp;من حيث اختيار مصادر معينة&nbsp;</span></span><span dir="RTL" lang="AR-SA"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن تحديد نطاق البحث في مجلات &nbsp;معينة يحددها الباحث كما في <strong>النافذة التالية</strong> </span></span></span></p><img class="content_image" src="'+ app.images[1].img[3] +'"><p dir="RTL" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:16px">تستطيع من خلال البحث المتقدم البحث عن الكلمه المفتاحيه أو المؤلف أو العنوان أو الموضوع أو الوصف كما فى<strong> النافذة التالية</strong></span></span></p><img class="content_image" src="'+ app.images[1].img[4] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">أما عند اختيارالمقال الأول لنتيجة البحث عن الطاقة تظهر النافذة التالية&nbsp; التى&nbsp;يتاح من خلالها أمكانية ارسال المقال بأكثر من طريقة لصديق مثل&nbsp; الفيس او البريد الالكتروني أو تويتر ..... وكذلك امكانية عرض المقال باللغة الانجليزية و امكانية&nbsp; طباعة المقال</span></span></span></p><img class="content_image" src="'+ app.images[1].img[5] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">توضح&nbsp; كيفية ارسال المقال لصديق عبر البريد الالكتروني</span></span></span></p>',
                            }
                        ]
                    },
                   
                ],
            },
            {
                id:3,
                name:'المصادر',
                color:'#4285F4',
                icon:"img/undraw_online_articles_79ff.svg",
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                    {
                        id:2,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },   {
                        id:3,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },   {
                        id:4,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },   {
                        id:5,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },   {
                        id:6,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },   {
                        id:7,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },{
                        id:8,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },{
                        id:9,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    }                   
                ],
            },  {
                id:4,
                icon:"img/undraw_everywhere_together_bdmn.svg",
                name:' بوابه الطلاب و المعلمون',
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                   
                ],
            },  {
                id:5,
                icon:"img/child.svg",
                name:' بوابه الأطفال',
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                   
                ],
            },  {
                id:6,
                icon:"img/research.svg",
                name:' بوابه الباحثين',
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                   
                ],
            },  {
                id:7,
                icon:"img/book.svg",
                name:'بوابه القراء',
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                   
                ],
            },  {
                id:8,
                icon:"img/more.svg",
                name:' أعرف أكثر عن بنك المعرفه',
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                   
                ],
            },  {
                id:9,
                icon:"img/team.svg",
                name:' فريق العمل',
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            },   {
                                id:2,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                            }
                        ]
                    },
                   
                ],
            }
]

app.initialize()