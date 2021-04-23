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
        console.log(data)
        // var categordata[0]
        var topics_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            if( category.id == category_id){
                for (let x = 0; x < category.topics.length; x++) {
                    const topic = category.topics[x]; 
                    if(JSON.stringify(topic).includes('color')){
                        // console.log(topic.color)
                        topics_html += '<div  class="topic_wrapper" ><ons-card style=" color:white;background:'+topic.color+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                    } else {
                        topics_html += '<div class="topic_wrapper" ><ons-card data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                    }        
                }    
            }
        }
        console.log(topics_html)
        $('.topics_wrapper').html(topics_html)
    } else {
        $('.topics_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
//////////

app.get_topic_content = function(topic_id){
    console.log(topic_id)
    var data = app.content
    if (data){
        // var categordata[0]
        var content_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            for (let x = 0; x < category.topics.length; x++) {
                const topic = category.topics[x];
                if(topic.id == topic_id){
                    if('pages' in topic){
                        content_html += topic.pages[0].content
                        $('.next_page_btn').show()
                    } else {
                        content_html += topic.content   
                    }
                }
                // console.log(content_html)
            }
        }
        // console.log(content_html)
        $('#content_wrapper').html(content_html)
    } else {
        $('#content_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.get_search=function(txt_search) {
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
                // console.log(ekbNav.topPage.data.category_name)
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
            // 'img/imgs/bank.png',
            'img/imgs/simplesearch.png',
            'img/imgs/searchresult.png',

              ]
    },{
        topic_id: 3,
        img: [
            'img/imgs/teachergate.png',
  

        ]
    },{
        topic_id: 4,
        img: [
            // 'img/imgs/discovery1.png',
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

            // 'img/eibikab.png',
            // 'img/2eibikab.png',
            // 'img/3eibikab.png',

        ]
    },{
        topic_id: 7,
        img: [
            'img/atomic.png',
            'img/atomic2.png',

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
        name:'بنك المعرفة',
        icon:"img/undraw_online_test_gba7.svg",
        topics:[
            {
                id:1,
                title:'نبذه عن بنك المعرفه',
                pages:[
                    {
                        id:1,
                        content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبغضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلمين ومشروع تأهيل الشباب للقيادة وكذلك &quot;بنك المعرفة المصرب &quot;</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابو رقميه على الويب ومنفذ مرتبظ بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك ميع المصادر هذه أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أرض البلد )</span></li> </ul> <p>&#39;,</p>',
                    },
                 ],
                featured:true,

            },
            {
                id:2,
                title:'إنشاء حساب على بنك المعرفه',
                content:'<h3></h3><div class="gates_wrapper"> <div class="gate_wrapper"> <div class="gate_icon_wrapper education_gate"> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-graduation-cap fa-w-20 fa-5x"><path fill="currentColor" d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z" class=""></path></svg> </div> <div class="gate_title_wrapper"> بوابه القراء </div> </div> <div class="gate_wrapper"> <div class="gate_icon_wrapper children_gate"> <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="fort-awesome" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-fort-awesome fa-w-16 fa-7x"><path fill="currentColor" d="M489.2 287.9h-27.4c-2.6 0-4.6 2-4.6 4.6v32h-36.6V146.2c0-2.6-2-4.6-4.6-4.6h-27.4c-2.6 0-4.6 2-4.6 4.6v32h-36.6v-32c0-2.6-2-4.6-4.6-4.6h-27.4c-2.6 0-4.6 2-4.6 4.6v32h-36.6v-32c0-6-8-4.6-11.7-4.6v-38c8.3-2 17.1-3.4 25.7-3.4 10.9 0 20.9 4.3 31.4 4.3 4.6 0 27.7-1.1 27.7-8v-60c0-2.6-2-4.6-4.6-4.6-5.1 0-15.1 4.3-24 4.3-9.7 0-20.9-4.3-32.6-4.3-8 0-16 1.1-23.7 2.9v-4.9c5.4-2.6 9.1-8.3 9.1-14.3 0-20.7-31.4-20.8-31.4 0 0 6 3.7 11.7 9.1 14.3v111.7c-3.7 0-11.7-1.4-11.7 4.6v32h-36.6v-32c0-2.6-2-4.6-4.6-4.6h-27.4c-2.6 0-4.6 2-4.6 4.6v32H128v-32c0-2.6-2-4.6-4.6-4.6H96c-2.6 0-4.6 2-4.6 4.6v178.3H54.8v-32c0-2.6-2-4.6-4.6-4.6H22.8c-2.6 0-4.6 2-4.6 4.6V512h182.9v-96c0-72.6 109.7-72.6 109.7 0v96h182.9V292.5c.1-2.6-1.9-4.6-4.5-4.6zm-288.1-4.5c0 2.6-2 4.6-4.6 4.6h-27.4c-2.6 0-4.6-2-4.6-4.6v-64c0-2.6 2-4.6 4.6-4.6h27.4c2.6 0 4.6 2 4.6 4.6v64zm146.4 0c0 2.6-2 4.6-4.6 4.6h-27.4c-2.6 0-4.6-2-4.6-4.6v-64c0-2.6 2-4.6 4.6-4.6h27.4c2.6 0 4.6 2 4.6 4.6v64z" class=""></path></svg> </div> <div class="gate_title_wrapper"> بوابه الباحثين </div> </div> <div class="gate_wrapper"> <div class="gate_icon_wrapper researcher_gate"> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microscope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-microscope fa-w-16 fa-3x"><path fill="currentColor" d="M160 320h12v16c0 8.84 7.16 16 16 16h40c8.84 0 16-7.16 16-16v-16h12c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32V16c0-8.84-7.16-16-16-16h-64c-8.84 0-16 7.16-16 16v16c-17.67 0-32 14.33-32 32v224c0 17.67 14.33 32 32 32zm304 128h-1.29C493.24 413.99 512 369.2 512 320c0-105.88-86.12-192-192-192v64c70.58 0 128 57.42 128 128s-57.42 128-128 128H48c-26.51 0-48 21.49-48 48 0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48zm-360-32h208c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8H104c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8z" class=""></path></svg> </div> <div class="gate_title_wrapper"> بوابه الطلاب والمعلمين </div> </div> <div class="gate_wrapper"> <div class="gate_icon_wrapper readers_gate"> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="books" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-books fa-w-18 fa-3x"><path fill="currentColor" d="M575.11 443.25L461.51 19.06C458.2 6.7 445.61-3.18 430.15.96L414.7 5.1c-6.18 1.66-11.53 6.4-16.06 14.24-14.03 6.94-52.3 17.21-68 18.22-7.84-4.53-14.85-5.96-21.03-4.3l-15.46 4.14c-2.42.65-4.2 1.95-6.15 3.08V32c0-17.67-14.33-32-32-32h-64c-17.67 0-32 14.33-32 32v64h128l101.66 396.94c3.31 12.36 15.9 22.24 31.36 18.1l15.45-4.14c6.18-1.66 11.53-6.4 16.06-14.24 13.91-6.88 52.18-17.2 68-18.22 7.84 4.53 14.85 5.96 21.03 4.3l15.46-4.14c15.45-4.14 21.41-18.99 18.09-31.35zm-134.4-7.06L348.64 92.37l61.82-16.56 92.07 343.82-61.82 16.56zM0 384h128V128H0v256zM96 0H32C14.33 0 0 14.33 0 32v64h128V32c0-17.67-14.33-32-32-32zM0 480c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H0v64zm160-96h128V128H160v256zm0 96c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H160v64z" class=""></path></svg> </div> <div class="gate_title_wrapper"> بوابه الآطفال </div> </div> </div> <style> .gates_wrapper { display: flex; height: 100px; justify-content: center; align-items: center; width: 100%; background: white; border-radius:10px; margin-bottom:39px; margin-top:40px; } .gate_wrapper { width: 25%; display: flex; justify-content: space-between; align-items: center; flex-direction: column; height: 80%; } .gate_icon_wrapper { height: 50px; width: 50px; display: flex; border-radius: 50%; color: white; justify-content: center; align-items: center; } .gate_icon_wrapper.readers_gate { background: #ffc107; } .gate_icon_wrapper.researcher_gate { background: #e91e63; } .gate_icon_wrapper.children_gate { background: #2196f3; } .gate_icon_wrapper.education_gate { background: #4caf50; } .gate_icon_wrapper svg { max-width: 50%; } .gate_title_wrapper { text-align: center; } </style><p dir="rtl"><span style="font-size:20px"><em><strong></strong></em></span></p> <ol dir="rtl"> <li><span style="font-size:18px">اختر بوابة من البوابات الأربع التى تريدها كمستخدم للبنك (قارئ عام - معلم أو طالب مدرسى أو طالب جامعى - باحث أكاديمي جامعى - طفل )</span></li> <li><span style="font-size:18px">قم بكتابه بياناتك المطلوبه (بريدك الألكترونى - رقمك الثومى - أدراتك التعليميه فى حال المعلم - النطقه أى المديريه التعليميه فى حال المعلم - المدرسة)</span></li> <li><span style="font-size:18px">الباحثين الاكاديمين (أى العاملين بالجامعات والكليات من الأساتذه أو أعضاء هيئه التدريس ، لا يسمح لهم بالتسجيل الا من داخل الجامعه ذاتها وخط الانترنت بها . ثم بعد ذلك يمكنهم الدخول من أى مكان بالجمهورية).</span></li> </ol>',
                featured:true,

            },
            {
                id:3,
                title:'تسجيل الدخول الى بنك المعرفه',
                content:'<img class="content_image" src="'+ app.images[0].img[1] +'"><h1 dir="rtl"><span style="font-size:16px">عند الضغط علي تسجيل الدخول في اعلي النافذه يتم كتابة عنوان البريد الالكتروني وكلمة المرور التي تم ارسالها علي بريدك&nbsp;الالكتروني من خلال بنك المعرفه</span></h1><h1 dir="rtl"><span style="font-size:16px">في حالة الدخول علي البنك بعد ذلك يطلب منك عنوان البريد الالكتروني وكلمة المرور الجديدة بعد تغيرها&nbsp;كما في النافذة التاليه</span></h1><img class="content_image" src="'+ app.images[0].img[2] +'">',
                featured:false,
                icons:"" 
            }
        ]        
    },
    {
        id:2,
        name:'محرك البحث الأكاديمي',
        icon:"img/undraw_Web_search_re_efla.svg",

        topics:[
            {
                id:4,
                title:'كيفيه استخدام محرك البحث',
                content:'<p dir="rtl"><span style="font-size:16px"><strong>مثال&nbsp;  للبحث بشكل بسيط نكتب فى شريط البحث ancient Egypt</strong></span></p><img class="content_image" src="'+ app.images[1].img[0] +'"><h1 dir="rtl"><strong><span style="font-size:16px">بالضغط على Enter</span></h1><img class="content_image" src="'+ app.images[1].img[1] +'">',
                featured:false,
                icons:""
            }
        ]        
    },
    {
        id:3,
        name:'المصادر',
        icon:"img/undraw_online_articles_79ff.svg",

        topics:[
            {
                id:5,
                color: 'linear-gradient(to top left, #3366cc 0%, #ff99cc 100%)',
                title:' Discovery Education',
                content:'<p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">المصدر<em><strong> </strong></em></span><em><strong>Discovery education </strong></em><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;يوفر محتوى&nbsp; تعليمي مناسب للمناهج الدراسية للمراحل التعليمية المختلفة ( ابتدائي - اعدادي - ثانوی )</span></span></span></p><img class="content_image" src="'+ app.images[2].img[0] +'"> <p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">للبحث نذهب الى مربع النص أعلى النافذة ثم نقوم بكتابة اي عنوان &nbsp;تريد البحث &nbsp;عنه مثلا </span>&nbsp;&nbsp;&nbsp;scarecrow <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ثم الضغط على بحث </span></span></span></p> <p dir="rtl"><span style="font-size:16px"><span dir="RTL" lang="AR-JO"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وانظر ماذا ترى سوف ترى الشاشة التالية</span></span></span></p> <p dir="rtl">&nbsp;</p> <p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ا</span></span></span></p>',
                featured:false,

            },
            {
                
                id:6,
                color: 'linear-gradient(to top left, #3366cc 0%, #0099cc 100%)',
                title:'  Britannica',
                content:'<p style="text-align:right">تعتبر موسوعة <strong>بریتانیکا </strong>ناشر تعلیمی عالمی للمنتجات تعزز المعرفة و التعلم في أحد دور النشر ويقوم <strong>بنك المعرفة المصري </strong>بعرض المحتوى العلمي التي بها عند الدخول على قائمة مصادرنا.</p> <p style="text-align:right">تحتوى هذه الشاشة على المنتجات التي تقدمها لنا موسوعة <strong>Britannica </strong>وهى:-</p> <p style="text-align:right">&nbsp;Britannica Academic</p> <p style="text-align:right">&nbsp;Britannica school</p> <p style="text-align:right">يمكن اختيار ما يناسب المعلم وليكن<strong> Britannica school</strong> لتظهر النافذة التالية</p>',
                featured:true,

            },
            {
                id:7,          
                color: 'linear-gradient(to top left, #3366cc 0%, #006699 100%)',
                title:' العبيكان',
                content:'<p>1. مكتبة العبيكان تعتبر مكتبة العبيكان | هي مكتية للكتب باللغة العربية والتي تحتوي على ما يقرب من ۲۹۰۰۰ كتاب تناسب جميع التخصسسات والاهتمامات بالإضافة إلى بعض المصادر البحثية المختلفة</p><img class="content_image" src="'+ app.images[6].img[0] +'"><li>2.أنشئت مكتبة العبيكان لكي تكون منارة للفكر والثقافة تضيء من المملكة العربية السعودية للعالم العربي كله ، وقد تبنت مكتبة العبيكان منذ إنشائها نهجا مبنية على تحمل مسؤوليتها الاجتماعية في نشر العلم والثقافة والمعرفة بين أبناء الوطن والمنطقة ، وهذا ماتجلى في إسهامها في عالم النشر والترجمة . إذ بلغت إصداراتها أكثر من ثلاث آلاف عنوان في كافة التخصصات وفروع العلم والمعرفة . تقوم بتوزيعها على مستوى العالم العربي عبر وكلائها ومكاتبها المنتشرة في العوا العربية ، وعبر المشاركة في جميع المعارض الدولية على مستوى العالم . تعد مكتبة العبيكان أحد أكبر المكتبات في العالم العربي والشرق الأوسط ، فهي تمتد إلى ۲۰ فرعا في جميع أنحاء المملكة ، تضم أكثر من مئة ألف من العناوين العربية والأجنبية توفرها لكل قارئ أو باحث أو طالب علم ،<img class="content_image" src="'+ app.images[6].img[1] +'"></br> 3.كما تضم مكتبة متخصصة للطفل تلبي كافة احتياجاتة المعرفية والتربوية . وقد قامت المكتبة بإتاحة محتوى رقمي يخدم الاحتياجات التعليمية والبحثية والمعرفية للدارسين والباحثين والمثقفين المهتمين بالمحتوى العربي من خلال التطوير المستمر لمكتبة العبيكان الرقمية وقاعدة بيانات إثراء المعارف الرقمية والتي يمكن استخدامها من خلال منصة بحث وواجهات تعامل معيارية ، وآليات الفهرسة والتكشيف وفقا للمعايير الدولية وبما يحقق التكامل المعر والتكنولوجي في الوقت نفسه</li><img class="content_image" src="'+ app.images[6].img[2] +'">',
                featured:false,


            },
            {
                id:8,
                color: ' linear-gradient(315deg, #0cbaba 0%, #380036 74%)',
                title:' Atomic Traning',
                content:'<li>للدخول الى قائمة مصادر  يفتح لك جميع المصادر تقوم باختيار Atomic Training ثم اكتشف المزيد و يقدم يقوم بعرض مصادر من اكبر دور نشر عالمية متخصصة منها باللغة العربية والانجليزية والفرنسية وكذا الدوريات . وذلك مايخدم العملية التعليمية و من المصادر المتاحة مصدر ( Atomic training ) ثم اكتشف المزيد ثم قم بعمل حساب على ذلك المصدر</li><p>2.مثال اذا اردنا أن نتعلم کورسات مايكروسوفت المتاحة E نقوم بتنشيطه ثم الضغط على Browse Tutorials عرض الكورسات لا ولیکن قم باختيار كورسات اكسيل ثم اختار رقم الاصدار من تلك البرنامج عند اتمام الاستماع الى جميع الموديلات ومقاطع الفيديو ستحصل على شهادة اون لاين من الموقع يمكنك بعد تلك الانتقال الى كورسات اخرى والتنقوم بكل حرية</p><img class="content_image" src="'+ app.images[7].img[0] +'"><img class="content_image" src="'+ app.images[7].img[1] +'"><img class="content_image" src="'+ app.images[7].img[2] +'">',
                featured:false,


            },
            {
                id:9,
                color: 'linear-gradient(to top left, #3366cc 0%, #00cc00 100%)',
                title:'الجمعيه الملكيه الأمريكيه',
                content:' <li>1.Leam Chemistry a ستار الجمعية الملكية للكيمياء هي من اكبر المجتمعات الكيميائية الرائدة في العالم ، توصيل المع العقول في العلوم الكيميائية في أي مكان في العالم و النهوض و التميز في العلوم الكيميائية هو من أهم اولويات الجمعية الجمعية الملكية للكيمياء منظمة غير هادفة للربح ذات تراث من العمر يصل الى اكثر من 175 عاما ، لدى الجمعية رؤية دولية طموحة تأتي من أكثر من ۵۲,۰۰۰ عضوا من 114 بلدا في جميع مجالات العلوم والأوساط الأكاديمية والصناعية . بالاضافة لبرامج التعليم ( لجميع الأعمار ابتداء من سن الخمس سنوات ) و برامج الاعتماد الأكاديمي لأقسام الكيمياء في الجامعات ، فإن الجمعية الملكية للكيمياء تعتبر افضل ناشر في العالم في مجال الكيمياء و العلوم المتعلقة بالكيمياء حسب اخر تصنيف لل ISI بمعدل * تاثير 5.68 average Impact Factor لجميع الدوريات حيث ان اكثر من 85 % من الدوريات لها عامل تأثير IF اكثر من 3 ( اعلی عامل تاثیر هو ۳۳.۳۸ وأقلها هو ۱۰۸۲ ) . الجمعية تنشر 4 دورية علمية تغطي كافة تخصصات و فروع الكيمياء ، بالاضافة لانتاج أكثر من ۱۰۰ کتاب سنويا و نشر العديد من قواعد البيانات . معدل التأثير ( ( average IF تم حسابه بجمع عامل التاثير F الكل دورية و من ثم قسمة الناتج على عدد الدوريات</li> <img class="content_image" src="'+ app.images[12].img[0] +'">',
                featured:false,

            },
            {
                id:10,
                color: 'linear-gradient(to top left, #3366cc 0%, #339933 100%)',
                title:' Learn chemistry',
                content:' <li> Learn Chernial و ستلاحظ ان الموقع باللغة الانجليزية - اذا اردت ان تقوم بترجمته إلى اي لغة اخرى اضغط في مكان فارغ في النافذه سوف تظهر تتمة مختصر أختر منها Translate into English</li> <img class="content_image" src="'+ app.images[8].img[0] +'"> <p>2.المصدر Learn Charalstry البحث في Learn Chemistry نستطيع أن تتعلم من خلاله وكذلك تستطيع أن تبحث من خلاله في الكيمياء بطريقتين او عن طريق قائمة المصادر Search resources وعند الضغط على السهم المقابل لها تظهر قائمة منسدله فيها A All resources جميع الموارد All resources except substances جميع الموارد بفناء المواد Information &amp; data المعلومات والبيانت Snippets &amp; articles المقتطفات والمقالات Educational resources &amp; tests الموارد التعليمية والاختبارات Lesson plans &amp; topics خطط الدرس والموضوعات Training &amp; curricula التدريب والمناهج الدراسية</p> </p><img class="content_image" src="'+ app.images[8].img[1] +'"><p>3.المصدر الم Learn Chemis لمن يريد تطوير نفسه ويدعم نفسه مهنيا يوجد شيار يسمي Courses Listings موجود تحت تيويب CPD بالضغط عليها سوف تظهر لك نافذه اخرى فيها الكورسات التي يمكن الاستفادة منها<img class="content_image" src="'+ app.images[8].img[2] +'">',
                featured:true,

            },
            {
                id:11,
                color: 'linear-gradient(315deg, #f5d020 0%, #f53803 74%)',
                title:' Me book',
                content:'<p>لتعرف على Me Books المصدر Me Books .<img class="content_image" src="'+ app.images[9].img[0] +'"> الضغط على ME Books Online سوف تظهر نافذه اخرى ربها Enjoy hundreds of popular children&#39;s stories : with the award - winning Me Books app ! تتمتع مئات من قصص الأطفال شعبية مع الحائز على جائزة لابد من استخدام تطبیق می بوك ! تتمتع بتكتب المصور نحتاج الى Create a Me Books acoount تسجيل حساب ثم لابد وان يكون هناك موبايل مثبت عليه هذا التطبيق</p><img class="content_image" src="'+ app.images[9].img[1] +'">',
                featured:false,
          },
            {
                id:12,
                color: 'linear-gradient(315deg, #ee9617 0%, #fe5858 74%)',
                title:' OneClickDigital',
                content:'<p>1.OneClickDigital je من أحد مصادر المتاحة ببنك المعرفة عباره عنة كتب صوتيه مسجلة وايضا الكترونية عند الدخول على قائمة مصادرنا تم کل مصادرنا الأنجليزية سوف يفتح</p><img class="content_image" src="'+ app.images[10].img[0] +'"><p>2.التعرف على OneClickDigital OneClickDigital السفر تمل ون كليك ديجيتال كتب مسجله حصريا ، وأيضا محتوى من جميع كبار الناشرین ، جنبا إلى جنب مع خدمة الكتاب الاليكتروني تجمع بين الكتب والصوت في مجموعة واحدة ، وتقدم المنصة الأكثر شمولا للمحتوى الخاص بك . تحتوي على كتفة واسعة من أفضل أنواع الأدب جنبا إلى جنب مع مجموعة من العناوين الحائزة على جوائز بارزة الشياب الان اضغط على OneClickdigital</p><img class="content_image" src="'+ app.images[10].img[1] +'">',
                featured:false,

            },
            {
                id:13,
                color: 'linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)',
                title:' National Geographic',
                content:'<p>1.المصدر National Geographic من احد مصادر المتاحة ببنك المعرفة ة تحتوي على منات من الكتب و الخرائط والفيديو والصور عند الدخول على قائمة مصادرنا تم کل مصادرنا الانجليزية سوف يفتح المصادر نقوم باختيار National Geographic</p><img class="content_image" src="'+ app.images[11].img[0] +'"><p>2.المصدر National Geographic National Geographic D و Gale ، وهي جزء من Cengage Learning ، قد شاركت جلب موارد هائلة للحياة الرقمية مع مكتية ناشيونال جيوغرافيك الافتراضية الآن لديك حق الوصول إلى أرشيف مجلة ناشيونال جيوغرافيك جنبا إلى جنب مع مجموعة عبر البحث من ناشيونال جيوغرافيك . وتشمل هذه المجموعة الشاملة ما يلي وأرشيف مجلة ناشيونال جيوغرافيك ، ۱۸۸۸-۱۹۹۶ مناشيونال جيوغرافيك الناس ، الحيوانات ، والعالم منذ تأسيسها في عام ۱۸۸۸ ، نمت الجمعية الجغرافية الوطنية لتصبح منظمة مرادفة للاستكشاف والتصوير والخرائط ، وإعادة التفكير في العالم كما نعرفه من مجلة ناشيونال جيوغرافيك الشهيرة الى ناشيونال جيوغرافيك المسافر الشهير ومئات من الكتب و الخرائط والفيديو والصور ، وليس هناك ببساطة أي بديل عن العمق والجودة ناتيونال جيوغرافيك فيرتوال ليبراري سيجلب إلى مكتبتك</p><img class="content_image" src="'+ app.images[11].img[1] +'">',
                featured:true,

            }
        ]        
    },
    {
        id:4,
        icon:"img/undraw_everywhere_together_bdmn.svg",
        name:' بوابه الطلاب و المعلمون',
        topics:[
            {
                id:14,
                title:'نبذه عن بوابة الطلاب و المعلمون',
                content:'<h3 style="text-align:right"><em><strong>&nbsp; بوابه الطلاب والمعلمون</strong></em></h3> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">تحتوى على العديد من الكتب الخاصة بالمقررات الدراسية ، بالاضافه الى العديد من المصادر المعرفه والتعليميه من كبرى دور النسر العالميو وشركات الانتاج العالميه العامله فى هذا المجال ، سواء فى صورى نصوص أو الموسوعات أو المصادر المرجعيه أو مقاطع فيديو لتبسيط العلوم أو غيرها من الوسائط المتعددة الخاصه بذلك</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">&nbsp;بوابه مخصصه للتعليم فى مختلف المراحل العملية، ويمكنك التجسيل بها من خلال الضغط على اختيار بوابه الطلاب</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">&nbsp;سهله الاستهدام&nbsp;تحتوى على نظام بحث موحد مرن الاستخدام للبحث فى الاف المقررات الدراسية للعلوم المختلفه للمراحل الجامعيه وكذلك الكتب المرجعية من كبرى دور النشر العامله فى هذه المجال فضلا عن موسوعة بريتاتيكا للطلبة ومئات الالاف من الفيديوهات والصور الحقيقيه والتخليليه لتبسيط العلوم من قنوات ديسكفرى وناشيونال جيوجرافيك</span></li> </ul><img class="content_image" src="'+ app.images[3].img[0] +'">',
                featured:true,
            }
        ]
    }, {
        id:5,
        icon:"img/child.svg",
        name:' بوابه الأطفال',
        topics:[
            {
                id:15,
                color:'linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)',
                title:'نيذه عن بوابة الأطفال',
                content:'<ul dir="rtl"> <li style="text-align: right;"><strong><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"><span style="color:#4f81bd">يمكن للآباء الاستفادة من بنك المعرفة من خلال تعليم صغارهم عبر بوابة مخصصة للأطفال , تحت عنوان بوابة الاطفال فهي متاحة ضمن اختيارات التسجيل .</span></span></span></span></strong></li> <li style="text-align: right;"><strong><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"><span style="color:#4f81bd">يمكن من خلالها إيصال المعلومات إلى أطفالك بطريقة تفاعلية, حيث تتيح البوابة نظام بسيط للتعامل مع الأطفال , كما أنها مدعمة بالوسائل البصرية والسمعية</span></span></span></span></strong></li> <li style="text-align: right;"><strong><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"><span style="color:#4f81bd">. كما تحتوي على العديد من الأدوات المساعدة للآباء لتعليم أبنائهم.يمكن للآباء الاستفادة من بنك المعرفة من خلال تعليم صغارهم عبر بوابة مخصصة للأطفال , تحت عنوان بوابة الاطفال فهي متاحة ضمن اختيارات التسجيل .</span></span></span></span></strong></li> <li style="text-align: right;"><strong><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"><span style="color:#4f81bd">يمكن من خلالها إيصال المعلومات إلى أطفالك بطريقة تفاعلية, حيث تتيح البوابة نظام بسيط للتعامل مع الأطفال , كما أنها مدعمة بالوسائل البصرية والسمعية. كما تحتوي على العديد من الأدوات المساعدة للآباء لتعليم أبنائهم.</span></span></span></span></strong></li> </ul></p><img class="content_image" src="'+ app.images[4].img[0] +'">',
                featured:true,
            }
        ]
    }, {
        id:6,
        icon:"img/research.svg",
        name:' بوابه الباحثين',
        topics:[
            {
                id:16,
                title:'بوابةالباحثين',
                content:'<h3 style="text-align:right">اذا كنت من الباحثين او مهتما بمجال البحث العلمى&nbsp; &nbsp;&nbsp;</h3> <ul dir="rtl"> <li>فعليك التسجيل فى بوابة الباحثين وهى بوابه مخصصه</li> <li>تحتوى على اكبر ما وصل اليه العلم فى الجامعات البحثيه , والاف الدوريات العلميه المتخصصه</li> <li>بالاضافه الى لمئات الالاف من الكتب والمراجع العامه. وكذلك فواعد البيانات : وموسوعه بريتنكا وديسكفرى التعليميه</li> </ul><img class="content_image" src="'+ app.images[5].img[0] +'">',
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
                        content:'<h3 style="text-align:right"><em><strong>&nbsp; &nbsp;بوابه القراء</strong></em></h3> <p style="text-align:right">تحتوى البوابه الخاصه بعموم القراء على المصادر المعرفيه المحليه والاقلميه والعالميه باللغه الانجليزيه مدعمه بواجهه تشغيل وبحث سهله الاستخدام ومن أبرز<strong> المصادر</strong></p> <ul dir="rtl"> <li><strong>قناه ديسكفرى العالميه</strong></li> <li><strong>قناه ناشيونال جيوجرفيك التعليميه</strong> والتى توفر العديد من وسائل شرح وتبسيط العلوم المختلفه فى صورها المقروء والمسوعه والمرئيه</li> <li><strong>موسوعه بريتانيكا</strong> العامه الشهيره والتى توفر ملايين المقالات والفيديوهات والصور فى كل اتجاهات المعرفه بالاضافه الى أمهات الكتب التراثيه والادبيه من المكتبه البريطانيه باللغه العربيه والعديد من المصادر الاخرى كما تسعى البوابه الى تكامل المشروعات الوثائقيه والمعرفه الموجوده فى الجهات والهيئات المحليه كمكتبه والازهر الشريف وغيرها</li> </ul><img class="content_image" src="'+ app.images[6].img[0] +'">',
                    },
                    {
                        id:2,
                        content:'<p>تحتوى البوابه الخاصه بعموم القراء على المصادر المعرفيه المحليه والأقليميه والعالميه باللغه الانجليزيه مدعمه بواجهه تشغيل وبحث سهله الاستخدام ومن أبرز&nbsp; &nbsp;&nbsp;المصادر قناه ديسكفرى العالميه وقناه ناشيونال جيوجرافيك التعليميه&nbsp; والتى توفر العديد من وسائل شرح وتبسيط العلوم المختلفه فى صورها المقروء والمسموعه والمرئيه كما تحتوى على موسوعه بريتاتيكا العامه الشهيره والتى توفر ملايين المقالات والفيديوهات والصور فى كل اتجاهات المعرفه بالاضافه الى أمهات الكتب التراثيه والادبيه من المكتبه البريطانيه باللغه العربية والعدديد من المصادر الاخرى كما تسعى البوابه الى التكامل المشروعات الوثائقيه والمعرفه المحليه الموجوده فى الجهات والهيئات المحليه كمكتبة والأزهر الشريف وغيرها.&nbsp;</span></p>, وتحتوى على مختلف المصادر المعرفيه والثقافيه لمختلف الاهتمامات للقراء من مختلف الصحف المحليه والعالميه والموسوعات العالمية</span></p>والعديد من المصادر المعرفية الخاصه بالهيئات المحلية والمكتبات العامة المحليه والعالمية سواء كانت فى صورة نصوص أو مقاطع فيديو لتبسيط العلوم من أشهر شركات الانتاج العالميه , وهى مزوده بواجهه تشغيل شهله الاستخدام ونظام بحث بسيط&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p></p>',    
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
                title:'اعرف أكثر عن بنك المعرفه',
                content:'<p>تحتوي على العديد من الكتب الخاصة بالمقررات الدراسية ، بالإضافة إلى العديد من المصادر المعرفية والتعليمية من كبرى دور النشر العالمية وشركات الإنتاج العالمية العاملة في هذا المجال ، سواء في صورة نصوص أو الموسوعات أو المصادر المرجعية أو مقاطع فيديو لتبسيط العلوم أو غيرها من الوساط المتعددة الخاصة بذلك . بوابة مخصصة للتعليم في مختلف المراحل العلمية ، ويمكنك التسجيل بها من خلال الضغط على اختيار « بوابة الطلاب والمعلمون » . سهلة الإستخدام تحتوي علي نظام بحث موحد مرن الإستخدام للبحث في آلاف المقرراة الدراسية للعلوم المختلفه للمراحل الجامعية وقيا الجامعية وكذلك الكتب المرجعية من كبري دور النشر العاملة في هذا المجال فضلا عن موسوعة بريتانيكا للطلبة ومءات الالاف من الفيديوهات والصور الحقيقية والتخيلية لتبسيط إستيعاب العلوم ما قنوات ديسكفري وناشيونال جيوجرافيك.</p><img class="content_image" src="'+ app.images[0].img[0] +'">',
                featured:true,
            }
        ]
    },
    {
        id:9,
        icon:"img/team.svg",
        name:' فريق العمل',
        topics:[
            {
                id:19,
                title:'فريق العمل',
                content:'<p>تحتوي على العديد من الكتب الخاصة بالمقررات الدراسية ، بالإضافة إلى العديد من المصادر المعرفية والتعليمية من كبرى دور النشر العالمية وشركات الإنتاج العالمية العاملة في هذا المجال ، سواء في صورة نصوص أو الموسوعات أو المصادر المرجعية أو مقاطع فيديو لتبسيط العلوم أو غيرها من الوساط المتعددة الخاصة بذلك . بوابة مخصصة للتعليم في مختلف المراحل العلمية ، ويمكنك التسجيل بها من خلال الضغط على اختيار « بوابة الطلاب والمعلمون » . سهلة الإستخدام تحتوي علي نظام بحث موحد مرن الإستخدام للبحث في آلاف المقرراة الدراسية للعلوم المختلفه للمراحل الجامعية وقيا الجامعية وكذلك الكتب المرجعية من كبري دور النشر العاملة في هذا المجال فضلا عن موسوعة بريتانيكا للطلبة ومءات الالاف من الفيديوهات والصور الحقيقية والتخيلية لتبسيط إستيعاب العلوم ما قنوات ديسكفري وناشيونال جيوجرافيك.</p><img class="content_image" src="'+ app.images[0].img[0] +'">',
                featured:true,
            }
        ]
    }

]

app.initialize()