
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
        $('#category .topics_wrapper').html(topics_html)
    } else {
        $('#category .topics_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
//////////

app.get_topic_content = function(params){
    var self = this
    // console.log('here we start')
    var data = self.content
    var category_id = params.category_id
    var parent_topic_id = params.parent_topic_id
    var topic_id = params.topic_id
    if (data){
        // var categordata[0]
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            if ( category.id == category_id){
                if ( parent_topic_id != undefined){
                    console.log(parent_topic_id)
                } else {
                    console.log('no parent')
                }
            }
        }
        // console.log(content_html)
    } else {
        $('#topic .content_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.get_child_topic_content = function(parent_id,child_topic_id){
    var self = this
    // console.log('here we start')
    var data = self.content
    if (data){
        // var categordata[0]
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            for (let x = 0; x < category.topics.length; x++) {
                const parent_topic = category.topics[x];
                if( parent_topic.id == parent_id){
                    if (parent_topic.parent_topic){
                        for (let i = 0; i < parent_topic.child_topics.length; i++) {
                            const child_topic = parent_topic.child_topics.length[i];                       
                        
                            if(child_topic.id == child_topic_id){
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
        var content = app.active_topic.pages[app.active_page_number].content
        // console.log(content)
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
    var content = app.active_topic.pages[app.active_page_number].content
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
                                    topics_html += '<div  class="topic_wrapper" ><ons-card style=" color:white;background:'+child_topic.color+'"  data-category-id="'+category_id+'" data-parent-topic-id="'+topic_id+'" data-topic-id="'+child_topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
                                // console.log(topic.color)
                            } else {
                                    topics_html += '<div class="topic_wrapper" ><ons-card  data-category-id="'+category_id+'" data-parent-topic-id="'+topic_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
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
                $('#parent_topic .toolbar__title').html(title)
                app.get_child_topics(category_id, topic_id)
            }
        }, false);
        document.addEventListener('init', function(event) {
            if (event.target.matches('#topic')) {
                // console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var parent_topic_id = ekbNav.topPage.data.parent_topic_id
                var topic_id = ekbNav.topPage.data.id
                var title = ekbNav.topPage.data.title
                $('#topic .toolbar__title').html(title)
                var params = {
                    category_id : category_id,
                    parent_topic_id : parent_topic_id,
                    topic_id : topic_id 
                }
                console.log(params)
                app.get_topic_content(params)
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
                        category_id: $(this).find('ons-card').attr('data-category-id'),
                        parent_topic_id:$(this).find('ons-card').attr('data-parent-topic-id'),
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
            'img/imgs/registeration.PNG',
            'img/imgs/newuser.png',
            'img/imgs/newaccount.png',
            'img/imgs/newaccount2.png',
            'img/imgs/conditions.png',
            'img/imgs/login.png',
            'img/imgs/mail.png'
        ]
    },{
        topic_id: 2,
        img: [
            'img/imgs/simplesearch.png',
            'img/imgs/searchresult.png',
            'img/imgs/searchresult2.png',
            'img/imgs/energy.png',
            'img/imgs/searchresource',
            'img/imgs/resource.png',
            'img/imgs/key.png',
            'img/imgs/keyword.png',
            'img/imgs/sharenobile.png',
            'img/imgs/sharetweet.png'

              ]
    },{
        topic_id: 3,
        img: [
            'img/imgs/discoveryeducate.png',
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
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلم</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul>',
                            }
                        ]
                    },   {
                        id:2,
                        title:'إنشاء حساب على بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>كيف أسجل ببنك المعرفة واستفيد منه ؟</strong></em></span></p> <p dir="rtl"><span style="font-size:16px">1- اختر بوابة من البوابات الأربع التى تريدها كمستخدم للبنك (قارئ عام -معلم أو مدرس أو طالب جامعى - باحث أكاديمى جامعى - طفل)</span></p><img class="content_image" src="'+ app.images[0].img[0] +'"><p dir="rtl"><span style="font-size:16px">2-قم بكتابه&nbsp; بياناتك المطلوبه (بريدك الألكترونى - رقمك القومى -ادارتك التعليميه فى حال المعلم + المنطقه أى المديرية التعليميه فى حال المعلم - المدرسه)</span></p><img class="content_image" src="'+ app.images[0].img[1] +'"> ',
                            },{
                                id:2,
                                content:'<p dir="rtl"><span style="font-size:16px">3- الباحثيين لاكاديميين &quot;أى العاملين بالجامعات والكليات من الآساتذه وأعضاء هيئه التدريس ، لا يسمح لهم بالتسجيل الا من داخل الجامعه ذاتها وخط الانترنت بها ، ثم بعد ذلك يمكنهم الدخول من أى مكان بالجمهورية &quot;&nbsp;</span></p><img class="content_image" src="'+ app.images[0].img[2] +'"><p></p><img class="content_image" src="'+ app.images[0].img[3] +'"><p></p><img class="content_image" src="'+ app.images[0].img[4] +'">',
                            },{
                                id:3,
                                content:'<p></p><img class="content_image" src="'+ app.images[0].img[4] +'">',
                            }

                        ]
                    },{
                        id:3,
                        title:'الدخول على بنك المعرفة',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<img class="content_image" src="'+ app.images[0].img[5] +'"><p></p><img class="content_image" src="'+ app.images[0].img[6] +'">',
                            }
                        ]
                    }
                ],
        

            },{
                id:2,
                name:'محرك البحث الأكاديمي',
                icon:"img/undraw_Web_search_re_efla.svg",
                topics:[
                    {
                        id:4,
                        title:'كيفيه استخدام محرك البحث',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<ul> <li dir="rtl" style="text-align:right"><span style="font-size:16px"><strong>يوجد هناك نوعان من البحث&nbsp;</strong></span></li> </ul> <p dir="rtl" style="text-align:right">أولا البحث البسيط نكتب فى شريط البحث <strong>ancient Egypt</strong></p><img class="content_image" src="'+ app.images[1].img[0] +'"><p dir="rtl" style="text-align:right"><span style="text-align:right">بالضغط على <strong>Enter</strong> تظهر النتيجه كما فى النافذه التاليه</span></p><img class="content_image" src="'+ app.images[1].img[1] +'">',
                            },{
                                id:2,
                                content:'<p dir="rtl" style="text-align:right">ثانيا البحث المتقدم نكتب فى شريط البحث <strong>الطاقه </strong>ثم نضغط على بحث متقدم</p><img class="content_image" src="'+ app.images[1].img[3] +'"><p dir="rtl" style="text-align:right">بالضغط على <strong>Enter</strong> تظهر النتيجه كما فى النافذه التاليه</p><img class="content_image" src="'+ app.images[1].img[2] +'">'
                            },{
                                id:3,
                                content:'<p dir="rtl" style="text-align:right">تظهر نتيجه البحث وهى تحتوى على جميع المصادر التى بها عنوان البحث يمكن التحكم فى نتائج البحث من حيث اختيار مصادر معينة يمكن تحديد البحق فى مجالات معينه يحددها الباحث كما فى النافذه التاليه</p><img class="content_image" src="'+ app.images[1].img[5] +'"><p dir="rtl" style="text-align:right">يمكن تحديد البحث فى مجالات معينه يحددها الباحث كما فى النافذه التاليه</p><img class="content_image" src="'+ app.images[1].img[6] +'">'
                            },{
                                id:4,
                                content:'<p dir="rtl" style="text-align:right">نستطيع من خلال البحث المتقدم البحث عن طريق الكلمه المفتاحيه أو المؤلف أو العنوان أو الموضوع أو الوصف&nbsp;</p><img class="content_image" src="'+ app.images[1].img[7] +'"><p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند اختيار &nbsp;المقال الأول لنتيجة البحث عن الطاقة تظهر النافذة التالية&nbsp;ويتاح من خلالها أمكانية ارسال المقال بأكثر من طريقة لصديق مثل&nbsp; الفيس او البريد الالكتروني أو تويتر ..... وكذلك امكانية عرض المقال باللغة الانجليزية و امكانية&nbsp; طباعة المقال</span></span></span></p><img class="content_image" src="'+ app.images[1].img[8] +'">',
                            },{
                                id:5,
                                content:'<p dir="RTL" style="text-align:right"><span style="font-family:Arial, sans-serif"><span style="font-size:14.6667px">توضح النافذه التاليه كيفيه ارسال المفال لصديق عبر البريد الالكترونى&nbsp;</span></span></p><img class="content_image" src="'+ app.images[1].img[9] +'">',
                            }
                        

                        ]
                    }
                ],
            },{
                id:3,
                name:'المصادر',
                icon:"img/undraw_online_articles_79ff.svg",
                topics:[
                    {
                        id:5,
                        title:' Discovery Education',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'main',
                                    },{
                                        id:2,
                                        content:'main2',
                                    }
                                ],
                                featured:false,
                            }, 
                            {
                                id:6,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'main3',
                                    },{
                                        id:2,
                                        content:'main2',
                                    }
                                ],
                                featured:false,
                            },
                            {
                                id:7,          
                                title:' WebEdTV',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<ul dir="rtl"> <li> <h1><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;أنشئت<strong> مكتبة العبيكان </strong>لكي تكون منارة للفكر والثقافة تضيء من المملكة العربية السعودية للعالم العربي كله ، وقد تبنت <strong>مكتبة العبيكان</strong> منذ إنشائها نهجا مبنية على تحمل مسؤوليتها الاجتماعية في نشر العلم والثقافة والمعرفة بين أبناء الوطن والمنطقة ، وهذا ما تجلى في إسهامها في عالم النشر والترجمة . إذ بلغت إصداراتها أكثر من ثلاث آلاف عنوان في كافة التخصصات وفروع العلم والمعرفة .</span></span></span></h1> </li> <li> <h1><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">تقوم بتوزيعها على مستوى العالم العربي عبر وكلائها ومكاتبها المنتشرة في العوالم العربية ، وعبر المشاركة في جميع المعارض الدولية على مستوى العالم . تعد مكتبة العبيكان أحد أكبر المكتبات في العالم العربي والشرق الأوسط ، فهي تمتد إلى </span><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">۲۰</span> <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">فرعا في جميع أنحاء المملكة ، تضم أكثر من مئة ألف من العناوين العربية والأجنبية توفرها لكل قارئ أو باحث أو طالب علم ، كما تضم مكتبة متخصصة للطفل تلبي كافة احتياجاتة المعرفية والتربوية .</span></span></span></h1> </li> <li> <h1><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وقد قامت المكتبة بإتاحة محتوى رقمي يخدم الاحتياجات التعليمية والبحثية والمعرفية للدارسين والباحثين والمثقفين المهتمين بالمحتوى العربي من خلال التطوير المستمر لمكتبة العبيكان الرقمية وقاعدة بيانات إثراء المعارف الرقمية والتي يمكن استخدامها من خلال منصة بحث وواجهات تعامل معيارية ، وآليات الفهرسة والتكشيف وفقا للمعايير الدولية وبما يحقق التكامل المعرفى والتكنولوجي في الوقت نفسه .</span></span></span></h1> </li> </ul>',
                                    },
                                    {
                                        id:2,
                                        content:'<h1 dir="rtl"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وعند اختيار اثراء المعارف الرقمية كما في النافذة التالية</span></span></span></h1> <img class="content_image" src="'+ app.images[7].img[0] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نقوم بكتابة ما نريد البحث عنه&nbsp; في خانة البحث ونختار ما نريد البحث فيه من العلوم الاجتماعية , العلوم الباحتة , الادب والفنون &nbsp;......الخ.</span></span></span></p><img class="content_image" src="'+ app.images[7].img[1] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span dir="RTL" lang="AR-SA"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">توضح النافذة التالية عند اختيار&nbsp; المكتبة المدرسية من قائمة البحث </span></span></span></p><img class="content_image" src="'+ app.images[7].img[2] +'"><p dir="RTL" style="text-align:right"><span style="font-size:16px"><span dir="RTL" lang="AR-SA"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند الضغط على الرابط للبحث داخل المكتبة المدرسية&nbsp; حتي الشريحة &nbsp;106 يتم عرض مثال لعرض قصة يوسف وشجرة المانجو وكذلك&nbsp; البحث عن أعمال المؤلف عمر الصاوي وتنزيل نتيجة البحث في صورة </span></span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">pdf</span><span dir="RTL" lang="AR-EG"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp; للاحتفاظ به على الكمبيوتر الخاص بك</span></span></span></p><img class="content_image" src="'+ app.images[7].img[3] +'">',
                                    }
                                ],
                                featured:false,
                            }, 
                            {
                                id:7,          
                                title:' Curriculum Connect',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:' Curriculum Connect1',
                                    },
                                    {
                                        id:2,
                                        content:' Curriculum Connect2',

                                    }
                                ],
                                featured:false,
                            },{
                                id:8,          
                                title:' مجتمع- DEN',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:' مجتمع- DEN1',
                                    },
                                    {
                                        id:2,
                                        content:' مجتمع- DEN2',

                                    }
                                ],
                                featured:false,
                            }    
                          
                        ],
                    },
                    {
                        id:6,
                        title:'  Britannica',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<p dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">المصدر </span><strong>Discovery education</strong> <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;يوفر محتوى&nbsp; تعليمي مناسب للمناهج الدراسية للمراحل التعليمية المختلفة ( ابتدائي - اعدادي - ثانوی )</span></span></span></p><img class="content_image" src="'+ app.images[2].img[0] +'"><p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">للبحث نذهب الى مربع النص أعلى النافذة ثم نقوم بكتابة اي عنوان &nbsp;تريد البحث &nbsp;عنه مثلا </span>&nbsp;&nbsp;&nbsp;scarecrow <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ثم الضغط على بحث لتظهر</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;نتائج البحث كما يوجد امكانية لفرز النتائج علي حسب المرحلة الدراسية أو&nbsp; نوع المورد سواء كان مقطع فيديو أو فيديو أو صورة </span></span></p><img class="content_image" src="'+ app.images[2].img[1] +'">',
                                    },{
                                        id:2,
                                        content:'<p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند الضغط على احدى &nbsp;نتائج البحث سوف يقوم بعرض الفيديو من نتيجة البحث المختار</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> </span></span></p><img class="content_image" src="'+ app.images[2].img[3] +'"><p dir="RTL" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">كما انه يمكن مشاركة على &nbsp;مواقع التواصل الاجتماعى او ارساله عبر الميل </span></span></p><img class="content_image" src="'+ app.images[2].img[4] +'">',

                                    }
                                ],
                                featured:false,
                            } 
                          
                        ],
                    },
                    {
                        id:7,
                        title:' العبيكان',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<p dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">المصدر </span><strong>Discovery education</strong> <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;يوفر محتوى&nbsp; تعليمي مناسب للمناهج الدراسية للمراحل التعليمية المختلفة ( ابتدائي - اعدادي - ثانوی )</span></span></span></p><img class="content_image" src="'+ app.images[2].img[0] +'"><p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">للبحث نذهب الى مربع النص أعلى النافذة ثم نقوم بكتابة اي عنوان &nbsp;تريد البحث &nbsp;عنه مثلا </span>&nbsp;&nbsp;&nbsp;scarecrow <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ثم الضغط على بحث لتظهر</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;نتائج البحث كما يوجد امكانية لفرز النتائج علي حسب المرحلة الدراسية أو&nbsp; نوع المورد سواء كان مقطع فيديو أو فيديو أو صورة </span></span></p><img class="content_image" src="'+ app.images[2].img[1] +'">',
                                    },{
                                        id:2,
                                        content:'<p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند الضغط على احدى &nbsp;نتائج البحث سوف يقوم بعرض الفيديو من نتيجة البحث المختار</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> </span></span></p><img class="content_image" src="'+ app.images[2].img[3] +'"><p dir="RTL" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">كما انه يمكن مشاركة على &nbsp;مواقع التواصل الاجتماعى او ارساله عبر الميل </span></span></p><img class="content_image" src="'+ app.images[2].img[4] +'">',

                                    }
                                ],
                                featured:false,
                            }                           
                        ],
                    }, {
                        id:6,
                        title:' Atomic Traning',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:6,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[],
                                featured:false,
                            }                          
                        ],
                    }, {
                        id:7,
                        title:'الجمعيه الملكيه الأمريكيه',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[ ],
                                featured:false,
                            }                          
                        ],
                    }, {
                        id:7,
                        title:' Learn chemistry',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[ ],
                                featured:false,
                            }                          
                        ],
                    }, {
                        id:7,
                        title:' Me book',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[ ],
                                featured:false,
                            }                          
                        ],
                    }, {
                        id:7,
                        title:' OneClickDigital',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[ ],
                                featured:false,
                            }                          
                        ],
                    }, {
                        id:7,
                        title:' National Geographic',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[ ],
                                featured:false,
                            }                          
                        ],
                    }
                ],
            },{
                id:4,
                icon:"img/undraw_everywhere_together_bdmn.svg",
                 name:' بوابه الطلاب و المعلمون',
                topics:[
                    {
                        id:9,
                        title:' بوابه الطلاب و المعلمون',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<h3 style="text-align:right"><em><strong>&nbsp; بوابه الطلاب والمعلمون</strong></em></h3> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">تحتوى على العديد من الكتب الخاصة بالمقررات الدراسية ، بالاضافه الى العديد من المصادر المعرفه والتعليميه من كبرى دور النسر العالميو وشركات الانتاج العالميه العامله فى هذا المجال ، سواء فى صورى نصوص أو الموسوعات أو المصادر المرجعيه أو مقاطع فيديو لتبسيط العلوم أو غيرها من الوسائط المتعددة الخاصه بذلك</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">&nbsp;بوابه مخصصه للتعليم فى مختلف المراحل العملية، ويمكنك التجسيل بها من خلال الضغط على اختيار بوابه الطلاب</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">&nbsp;سهله الاستهدام&nbsp;تحتوى على نظام بحث موحد مرن الاستخدام للبحث فى الاف المقررات الدراسية للعلوم المختلفه للمراحل الجامعيه وكذلك الكتب المرجعية من كبرى دور النشر العامله فى هذه المجال فضلا عن موسوعة بريتاتيكا للطلبة ومئات الالاف من الفيديوهات والصور الحقيقيه والتخليليه لتبسيط العلوم من قنوات ديسكفرى وناشيونال جيوجرافيك</span></li> </ul><img class="content_image" src="'+ app.images[3].img[0] +'">',
                            }
                        ]
                    }
                ],
            }, {
                id:5,
                icon:"img/child.svg",
                name:' بوابه الأطفال',
                topics:[
                    {
                        id:10,
                        color:'#3231cc',
                        title:' بوابة الأطفال',
                        pages:[
                            {
                                id:1,
                                content:'<ul dir="rtl"> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن للآباء الاستفادة من بنك المعرفة من خلال تعليم صغارهم عبر بوابة مخصصة للأطفال , تحت عنوان بوابة الاطفال فهي متاحة ضمن اختيارات التسجيل .</span></span></span></li> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن من خلالها إيصال المعلومات إلى أطفالك بطريقة تفاعلية, حيث تتيح البوابة نظام بسيط للتعامل مع الأطفال , كما أنها مدعمة بالوسائل البصرية والسمعية</span></span></span></li> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">. كما تحتوي على العديد من الأدوات المساعدة للآباء لتعليم أبنائهم.يمكن للآباء الاستفادة من بنك المعرفة من خلال تعليم صغارهم عبر بوابة مخصصة للأطفال , تحت عنوان بوابة الاطفال فهي متاحة ضمن اختيارات التسجيل .</span></span></span></li> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">مكن من خلالها إيصال المعلومات إلى أطفالك بطريقة تفاعلية, حيث تتيح البوابة نظام بسيط للتعامل مع الأطفال , كما أنها مدعمة بالوسائل البصرية والسمعية. كما تحتوي على العديد من الأدوات المساعدة للآباء لتعليم أبنائهم.</span></span></span></li> </ul> <p>&nbsp;</p> <p><img class="content_image" src="'+ app.images[4].img[0] +'" /></p>',
                            }],
                        featured:true,
                    }
                ]
            },{
                id:6,
                icon:"img/research.svg",
                name:' بوابه الباحثين',
                topics:[
                    {
                        id:16,
                        color:'#3231cc',
                        title:'بوابةالباحثين',
                        pages:[{
                            id:1,
                            content:'<h3 style="text-align:right">اذا كنت من الباحثين او مهتما بمجال البحث العلمى&nbsp; &nbsp;&nbsp;</h3> <ul dir="rtl"> <li>فعليك التسجيل فى بوابة الباحثين وهى بوابه مخصصه</li> <li>تحتوى على اكبر ما وصل اليه العلم فى الجامعات البحثيه , والاف الدوريات العلميه المتخصصه</li> <li>بالاضافه الى لمئات الالاف من الكتب والمراجع العامه. وكذلك فواعد البيانات : وموسوعه بريتنكا وديسكفرى التعليميه</li> </ul><img class="content_image" src="'+ app.images[5].img[0] +'">',
                        }],
                        featured:true,
                    }
                ]
            }, {
                id:7,
                icon:"img/book.svg",
                name:'بوابه القراء',
                topics:[
                    {
                        id:17,
                        color:'#3231cc',
                        title:'بوابة القراء',
                        pages:[
                            {
                                id:1,
                                content:'<img class="content_image" src="'+ app.images[6].img[0] +'"><p style="text-align:right">تحتوى البوابه الخاصه بعموم القراء على المصادر المعرفيه المحليه والاقلميه والعالميه باللغه الانجليزيه مدعمه بواجهه تشغيل وبحث سهله الاستخدام ومن أبرز<strong> المصادر</strong></p> <ul dir="rtl"> <li><strong>قناه ديسكفرى العالميه</strong></li> <li><strong>قناه ناشيونال جيوجرفيك التعليميه</strong> والتى توفر العديد من وسائل شرح وتبسيط العلوم المختلفه فى صورها المقروء والمسوعه والمرئيه</li> <li><strong>موسوعه بريتانيكا</strong> العامه الشهيره والتى توفر ملايين المقالات والفيديوهات والصور فى كل اتجاهات المعرفه بالاضافه الى أمهات الكتب التراثيه والادبيه من المكتبه البريطانيه باللغه العربيه والعديد من المصادر الاخرى كما تسعى البوابه الى تكامل المشروعات الوثائقيه والمعرفه الموجوده فى الجهات والهيئات المحليه كمكتبه والازهر الشريف وغيرها</li> </ul>',
                            },{
                                id:2,
                                content:'<ul dir="rtl"> <li>تحتوى البوابه الخاصه بعموم القراء على المصادر المعرفيه المحليه والأقليميه والعالميه باللغه الانجليزيه مدعمه بواجهه تشغيل وبحث سهله الاستخدام ومن أبرزالمصادر <strong>قناه ديسكفرى العالميه</strong> و<strong>قناه ناشيونال جيوجرافيك التعليميه</strong>&nbsp; والتى توفر العديد من وسائل شرح وتبسيط العلوم المختلفه فى صورها المقروء والمسموعه والمرئيه كما تحتوى على موسوعه بريتاتيكا العامه الشهيره والتى توفر ملايين المقالات والفيديوهات والصور فى كل اتجاهات المعرفه بالاضافه الى أمهات الكتب التراثيه والادبيه من المكتبه البريطانيه باللغه العربية والعدديد من المصادر الاخرى كما تسعى البوابه الى التكامل المشروعات الوثائقيه والمعرفه المحليه الموجوده فى الجهات والهيئات المحليه مكتبة والأزهر الشريف وغيرها.</li> </ul><ul dir="rtl"> <li>تحتوى على مختلف المصادر المعرفيه والثقافيه لمختلف الاهتمامات للقراء من مختلف الصحف المحليه والعالميه والموسوعات العالمية.</li> </ul>',
                            },{
                                id:3,
                                content:'<ul dir="rtl"> <li>والعديد من المصادر المعرفية الخاصه بالهيئات المحلية والمكتبات العامة المحليه والعالمية سواء كانت فى صورة نصوص أو مقاطع فيديو لتبسيط العلوم من أشهر شركات الانتاج العالميه , وهى مزوده بواجهه تشغيل شهله الاستخدام ونظام بحث بسيط</li> </ul>',
                            }
                        ],
                        featured:true,
                    }
                ]
            },
            {
                id:8,
                icon:"img/more.svg",
                name:' أعرف أكثر عن بنك المعرفه',
                topics:[
                    {
                        id:18,
                        color:'#3231cc',
                        title:'اعرف أكثر عن بنك المعرفه',
                        parent_topic:false,
                        child_topics:[],
                        pages:[{
                            id:1,
                            content:'test',
                        }

                        ]
                    }
                ]
            },
            {
                id:9,
                name:'فريق العمل',
                icon:"img/team.svg",
                topics:[
                    {
                        id:19,
                        title:'فريق العمل',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلم</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul>',
                            }
                        ]
                    }
                ],     

            },
            

]

app.initialize()