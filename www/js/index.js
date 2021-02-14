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
    var data = app.content
    if (data){
        // var categordata[0]
        var categories_list = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            // console.log(data[i]);
            categories_list += '<div class="category_wrapper"><ons-card  data-category-id="'+category.id+'" data-category-name="'+category.name+'"" ><ons-icon icon="'+category.icon+'"></ons-icon>'+ category.name +'</ons-card></div>'
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
                    featured_html += '<div class="topic_wrapper" ><ons-card data-topic-id="'+topic.id+'">'+ topic.title +'</ons-card></div>'
                    console.log(featured_html);
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
    console.log(category_id)
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
                    topics_html += '<div class="topic_wrapper" ><ons-card data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div></br>'
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
    var data = app.content
    if (data){
        // var categordata[0]
        var content_html = '';
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            for (let x = 0; x < category.topics.length; x++) {
                const topic = category.topics[x];
                if(topic.id == topic_id){
                    console.log(topic)
                    content_html += topic.content
                }
            }
        }
        console.log(content_html)
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
                if (topic.title.includes(txt_search)){
                    topics_html += '<div class="topic_wrapper" ><ons-card data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+topic.title+'</ons-card>'
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
                        var el = e.target
                        console.log($(el).attr('data-category-id'))
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
            'img/teachergate .png',
            
        ]
    },{
        topic_id: 2,
        img: [
            'img/login.png',
            'img/successmsg.png',
            'img/2password.png',
            'img/opensite.png',
        ]
    },{
        topic_id: 3,
        img: [
            'img/2createaccount.png',
            'img/createnewaccount2.png',            
            'img/3createaccount.png',
            'img/4createaccount.png',
            'img/5createaccount.png',

        ]
    },{
        topic_id: 4,
        img: [
            'img/searchengine.png',
            'img/searchengine2.png',
         
        ]
    },{
        topic_id: 5,
        img: [
            'img/discovery.png',
            'img/discoverysite.png',
            'img/searchtable.png',
            'img/video.png',
            'img/curriculum.png',
            'img/curriculumstep.png',
            'img/videolang.png',
            'img/webEdTV.png',
            'img/webEdTVdetails.png',
        ]
    },{
        topic_id: 6,
        img: [
            'img/Britannica.png',
            'img/2Britannica.png',
            'img/2Britannica2.png',

        ]
    }
    ,{
        topic_id: 7,
        img: [
            'img/eibikab.png',
            'img/2eibikab.png',
            'img/3eibikab.png',

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
        icon:"school",

        topics:[
            {
                id:1,
                title:'إنشاء حساب على بنك المعرفه',
                content:'<p>1. قم بالضغط على الرابط التالي <a href="http://www.ekb.eg/ar/register">http://www.ekb.eg/ar/register</a> او يمكنك الضغط على مستخدم جديد ) كما في الصورة</p> <img class="content_image" src="'+ app.images[2].img[1] +'"> <p>2.بعد ذلك سوف يطلب منك الموقع تحديد البوابة التي تناسبك ( تم الشرح مسبقا ) وفی حالتنا سوف نختار بوابة الطالب والمعلمون</p><img class="content_image" src="'+ app.images[2].img[0] +'"> <p>3.الان سوف يطلب منك معلومات شخصية قم باستيفاء جميع البيانات كما في الصورة ملحوظة : تأكد من كتابة البريد الالكتروني صحيح لانه سوف يتم إرسال عليه كلمة المرور لهذاالحساب</p><img class="content_image" src="'+ app.images[3].img[0] +'">  <p>4.الان سوف يطلب منك معلومات وظيفية قم باستيفاء جميع البيانات كما في الصورة ملحوظة في حالة الا تكونمادة التدريس غير موجودة بالقائمة نختار اخرى وبعدها سوف يظهر مربع اخر نكتب فيه المادة التي نقوم بتدريسها او اخصائي = NILE</p><img class="content_image" src="'+ app.images[4].img[0] +'"> <p>5.الان بعد كتابة كل البيانات والمعلومات اللازمة اكتب التحقق من التص ) كما بالصورة وضع علامة صح امام مربع ( الموافقة على شروط الاستخدام ) واضغط على مربع &quot; ارسال &quot; بعدها تظهر لك رسالة انه تم بعدها يتم ارسال رسالة الى بريدك الذي سجلت بيه تحت في الرسالة على باسورد حسابك ( كلمة السر )</p><img class="content_image" src="'+ app.images[5].img[0] +'">',
                featured:true,

            },
            {
                id:2,
                title:'تسجيل الدخول الى بنك المعرفه',
                content:'<p>1.تظهر لك رسالة انه يتم ارسال رسالة الى بريدك الذي سجلت بيه تحتوي على كلمه المرور الخاصه بك</p><img class="content_image" src="'+ app.images[2].img[0] +'"><p>2.بعد ذلك افتح صفحة تسجيل الدخول واكتب البريد الالكتروني الذي سجلت به وكلمة السر التي تم ارسالها لك عبر البريد الالكتروني واضغط على تسجيل الدخول بعدها يتم تحويلك الى صفحة جديدة</p><img class="content_image" src="'+ app.images[1].img[0] +'"><p>3.- بعد ذلك تظهر الشاشة التالية تكتب باسورد جديد خاص بك تكتبه مره اخري للتأكيد اضغط على &quot; إحفظ &quot; بعدها يمكنك تصفح الموقع وتصفح المواد العلمية كما تريد</p><img class="content_image" src="'+ app.images[2].img[3] +'"><p>4.<a href="http://www.ekb.eg/">http://www.ekb.eg/</a> طريقة فتح موقع بنك المعرفة اما الضغط على الرابط التالي : واما تذهب المتصفح الخاص بك وفي شريط العنوان قم بكتابة ekb.eg قم الضغط على مفتاح الادخال Enter</p><img class="content_image" src="'+ app.images[2].img[4] +'">',
                featured:false,
                icons:"" 
            }
        ]        
    },
    {
        id:2,
        name:'محرك البحث الأكاديمي',
        icon:"search",

        topics:[
            {
                id:3,
                title:'كيفيه استخدام محرك البحث',
                content:'<p>البحث المتقدم مثال على البحث المتقدم : قم بكتابة كلمة مصر العربية في خانة البحث المتقدم وانظر ماذا اترى سوف وجد الشاشة التالية <img class="content_image" src="'+ app.images[3].img[1] +'"><br>وفق اللجدول كن كتابة كلمة البحث اذهب او قم بالبدء في عملية البحث شبة التقدم في عملية البحث جميع المصادر التي تظهر فيها نتائج البحث نتائج البحث ويمكنك الضغط بزر الماوس الأيمن على اي ناتج بحث ثم فتحة في نافذه مستقلة لعرض محتواه او لفتحة الروابط الثابته له أو عرض النصوص التحكم في حجم الخط الخاص بنتائج البحث التحكم في طريقة عرض بنتائج البحث اما تفاصيل مختصرة او نص او تفاصيل السجل الكاملة .. الخ ازالة التكرار من بنتائج البحث الفرز عملية البحث من أ إلى ياء والعكس او حسب الأقدم لتحديد مجلات بحث معينة وبعد ذلك يظهر لك عدد السجلات التي قمت بتحديدها اختيارات منها حذف السجلات المحدة او ابقائها أو طباعتها أو ارسالها الى بريد الكتروني..غ حفظ السجلات بين متعددة منها اللص أو لغة HTML .. الخ التحكم في كل السجلات المعروضة في الصفحة الواحدة</p><img class="content_image" src="'+ app.images[3].img[0] +'">',
                featured:false,
                icons:""
            }
        ]        
    },
    {
        id:3,
        name:'المصادر',
        icon:"book",

        topics:[
            {
                id:4,
                title:' Discovery Education',
                content:' <li>التعرف على المحتوى المعرفي لموقع Discovery education يعتبر Discovery education احد اهم دور النشر التي توفر محتوى تعليم على موقع بنك المعرفة وهو ربط بين مناهج التعليم المصرية عند الدخول على قائمة مصادرنا ثم كل المصادر سوف يفتح لك جميع المصادر : المصادر المتاحة مصدر ( Discovery education ) ثم اكتشف المزيد</li><img class="content_image" src="'+ app.images[4].img[0] +'"> <li>يوفر محتوى فيديو تعليمي مناسب للمناهج الدراسية للمراحل التعليمية ابتدائي - اعدادي - ثانوی ) | للبحث ثم بالذهاب الى مربع النص أعلى النافذة ثم قم بكتابة اي منهج تريد البحث عنه ثم الضغط على أمر بحث مثال : قم بكتابة كلمة وحدات القياس في خانة البحث المتقدم وانظر ماذا اترى سوف ترى الشاشة التالية وفق للجدول 1 مكان لعبة كلمة البحث ثم الضغط علي امر بحث کد تقع البحث التي نتجت قمة الفرن على حسب المرحلة التعليمية وستلاحظ عند اختيار مرحلة معينة سوف يتغير عدد نتائج البحث نبع البحث التي تنجت المشاركة مقطع الفيديو على الفيس بوك او تويتر أو غيره</li><img class="content_image" src="'+ app.images[4].img[3] +'"> <li>هو ربط المنهج المصري بمحتوى رقمي ممتع . فلم يعد المعلمون بحاجة للبحت على نطاق واسع عن موارد رقمية لدعم دروسهم ويمكن للطلاب دراستها سرا . يوفر Curriculum Connect الوصول عبر الإنترنت وعبر الهاتف المحمول إلى الآلاف من مقاطع الفيديو ، والمقالات النصية ، والعروض التفاعلية ، وملفات الصوت والصور المدققة التي تم تعيينها إلى كل دروس العلوم والرياضيات لجميع المراحل الدراسية الابتدائي - الإعدادي - الثانوي</li><img class="content_image" src="'+ app.images[4].img[3] +'">  <p>4.قم باختيار من Curriculum Connect المرحلة الابتدائية سوف تجد هنا الكورسات او مقاطع الفيديو الخاصة بالوحدة التي قمت باختيارها</p> <img class="content_image" src="'+ app.images[4].img[5] +'"><p>5.تابع مثال قم باختيار من Connect Curriculum المرحلة الابتدائية وبعد اختيار الكورس او الفيديو سوف يقوم بافتع مباشرة ويمكنك تغيير لغة الفيديو وكذلك يمكن مشاركته على مواقع التواصل ويوجد اسف الفيديو اشارات مرجعية Tags لالفاظ ورد ذكرها داخل الفيديو تساعد الطالب المعرفة اكثر عن اي لفظ من هذه الألفاظ بمجرد الضغط عليها ومن ثم يتنقوم الي ناتج بحث اضافی</p><img class="content_image" src="'+ app.images[4].img[6] +'"> <p>6.المصدر Discovery education استخدام WebEdTV قرقر شبكة WebEdTV للمدرسين ، والأباء ، والطلاب مجموعة منتقاة من أفضل الموارد المعلوماتية الشيقة من مجموعة مقاطع الفيديو ذات المستوى العالمي من إنتاج .Discovery Education ويتم انتقاء الموارد بعناية لتتلاءم مع موضوعات المناهج الدراسية لطلاب المراحل الابتدائية ، والإعدانية ، والثانوية في كل أسبوع ، يتم اختيار موارد في خمس مواد ، هي : العلوم والرياضيات ، ومهن STEM ، ومهارات القرن الحادي والعشرين ، والموضوعات العالمية ، بالإضافة إلى مقاطع فيديو تمهيدية مخصصة ، واستراتيجيات تدريس و أدلة تعلم لإثارة الفضول ودعم التعلم في المدرسة أو في المنزل</p><img class="content_image" src="'+ app.images[4].img[7] +'"> <p>7.استخدام WebEdTV هي عبارة عن قناة تليفزيونية يتم بثها يوميا عبر الانترنت من الأحد إلى الخميس لمدة ثلاثة ساعات تقدم مجموعة الفيديوهات التعليمية للمراحل الإبتدائية والاعدادية والثانوية وجميع الفيديوهات يتم اعادة عرضها يوم السبت - الان قم باختيار المرحلة التي تناسبك 1 لتحديد الشهر واليوم أو الأمابيع العرض المادة نتائح العرض يمكنك أيضا تنزيل أضواء على استراتيجيات التعلم الأداء الحركي والتي يتم فيها عرض الاستراتيجية المستخدمة والخطوات الإجرائية التي يمكن للمعلم أن يتبعها داخل الفصل لتحقيق نوع من انواع من التعلم النشط مع تلاميذه</p> <img class="content_image" src="'+ app.images[4].img[8] +'"> <li>8.استخدام WebEdTV بعد الضغط على الفيديو التي قمت باختيارة يمكنك من عرض قائمة التشغيل المتعلقة او المرتبطة بذلك الفيديو ويمكنك من تنزيل بديل التعليم على هيئة كتاب PDF</li> <img class="content_image" src="'+ app.images[4].img[1] +'">',
                featured:false,

            },
            {
                id:5,
                title:'  Britannica',
                content:'1.هی لا تعتبر موسوعة بریتانیکا ناشر تعلیمی عالمی المنتجات تعزز المعرفة و التعلم في أحد دور النشر ويقوم بنك المعرفي المصري المحتوى العلمي التي بها عند الدخول على قائمة مصادرنا شم کن مصادرنا الانجليزية سوفسا من المصادر المتاحة مصدر ( Britannica ) ثم اكتشف المزيد لك جميع المصادر 2.بعد الضغط على إكتشف المزيد تظهر لنا شاشة بها المنتجات التي تقدمها لنا موسوعة Britannica وهي : Britannica Academic Britannica school Britannica Library Britannica E - Books Britannica ImageQuest a وسوقيدا مع ا Britannica school 3.استخدام ا Britannia schoo وهو مصدر تعلیمی تفاعلي على الانترنت لطلاب المدارس و المعلمين من المراحل الابتدائية الى الثانوية . فهي توفر ثلاثة مراحل التعليم : الأساسي ( المرحلة الإبتدائية - متوسط ( المرحلة المتوسطه ) المتقدم ( المرحلة الثانوية ) للإستخدام المدرسي و في المنازل . وقد وضع هذا المنتج لمساعدة تطوير الطلاب من المراحل المتقدمة الى المتطورة . وهذا الخيار يدعم الأهداف المنهجية للعديد من المواد و يقدم مختارات من الموسوعات و الصحف والمجلات و المصادر الاساسية و ايضا تشمل الصور و الفيديوهات و الدروس التفاعلية و الأنشطة والألعاب والملازم التعليمية و غيرها من ادوات البحث الطلاب . و توجت مختلف المستويات للمطالعة لكي تساعد على تحقيق تعليم ملامر متخصص لمختلف المستويات وسوف يفتح الموقع افتراضي على متوسط المرحلة المتوسطه ) 4.استخدام Britannica school في هذه الشاشة تقوم بالضغط في أعلى الناحية اليسرى على Britannica school بعدها ستجد أنه قام بعرض لك ثلاثة مستويات التي يمكنك التعامل من خلالهما الأساسي ( المرحلة الإبتدائية Elementary ) - متوسط ( المرحلة المتوسطه Middle ) - المتقدم ( المرحلة الثانوية High ) وليكن نقوم باختيار Elementary 5.وليكن نقوم باختيار Elementary ترى في هذه الشاشة الأيقونات والواجهة والالوان واشكال تناسب المرحلة العمرية للتلامية وسماجد مقطع فديو يسكناك عرضه ثم الاجابة على السؤال الموجود بجواره كذلك قد تجد صورة و عليها سوال كذلك تجد في الجذء الأسفل تجد انه بامكانك تصفح Britannica school على مجموعة من المنتديات من خلالها تستطيع أن ترى مجموعة من ليظهر له المستوى التي تقف فيه وهو المرحلة الابتدائية المقالات وهی Elementary عرض لك فيديو و صور من النوم باجابة السؤال المتر با اسهم التنقل لكي تتنقوم مابين الصور ومقاطع الفيديو السنترا . Show More لرؤية المزيد من المنتديات 1 ARTICLES مجموعة من المقالات V Media مقاطع فيديو A World Atlas دارند اطلس الخاص بالقرامط 1 HIES BIOG سيرة ذاتيه العلماء ANIMAL KINGDOM FOR PREK - 2 STUDENTS عالم الحيوان الاطفال قبل المرحلة الابتدائية جولة الولايات المتحدة الأمريكية TOUR THE U.S.A GEOGRAPHY EXPLORER 11 COMPARE COUNTRIES مستكشف جغرافي مقارنة البلدان طريقة العرض كطالب - کالرپین او معلمین اد 1 Educators - Students 6.استخدام Britannica school Britannica السمشر من الامكانات المتاحة ايضا خاصية جدول المحتويات تستطيع أن ننتقل منه مباشرة الى جذع آخر من المحتويات العامة المقال كما يوجد أيضا جذء خاص بلمقالات المتصلة بهذا المقال ويتم فتحها من داخل بریتانیکا Articles ، اشر مقالات من مصادر اخری خارجية خارج بریتانیکا Web"s Best Sites ويمكن تصغير وكبير حجم خط المقال ويمكن ايضا الرسالة عبر البريد 7.المصدر Britannica استخدام ا Britannica schoo من الامكانات المتاحة Images & Videos وهو يقوم بعرض مجموعة من الصور والفيديو المرتبطة بناتج البحث الذي قمت بالبحث عنه وايضا يمكن ارسال مقطع الفيديو عبر البريد او وضع الفيديو في قائمة المفضلة او طباعتها ان كانت صورة أو اضافة الفيديو كمرجع بوضعه في قائمة المراجع 8.High المصدر Britannica استخدام Britannica school ففي نلاحظ أن الواجهة تختلف على حسب المرحلة العمرية هذه الشاشة تجد بعض الخيارات الجديدة منها وراء الأخبار BEHIND THE NEWS مايحدث في العالم IN THEIR WORDS مايحدث في هذا اليوم NEWSON THIS DAY<img class="content_image" src="'+ app.images[5].img[0] +'"><img class="content_image" src="'+ app.images[5].img[1] +'"><img class="content_image" src="'+ app.images[5].img[2] +'">',
                featured:true,

            },
            {
                id:6,
                title:' العبيكان',
                content:'<ol<p>1.المصدر مكتبة العبيكان تعتبر مكتبة العبيكان | هي مكتية للكتب باللغة العربية والتي تحتوي على ما يقرب من ۲۹۰۰۰ كتاب تناسب جميع التخصسسات والاهتمامات بالإضافة إلى بعض المصادر البحثية المختلفة</p><img class="content_image" src="'+ app.images[6].img[0] +'"></ol><ol><li>أنشئت مكتبة العبيكان لكي تكون منارة للفكر والثقافة تضيء من المملكة العربية السعودية للعالم العربي كله ، وقد تبنت مكتبة العبيكان منذ إنشائها نهجا مبنية على تحمل مسؤوليتها الاجتماعية في نشر العلم والثقافة والمعرفة بين أبناء الوطن والمنطقة ، وهذا ماتجلى في إسهامها في عالم النشر والترجمة . إذ بلغت إصداراتها أكثر من ثلاث آلاف عنوان في كافة التخصصات وفروع العلم والمعرفة . تقوم بتوزيعها على مستوى العالم العربي عبر وكلائها ومكاتبها المنتشرة في العوا العربية ، وعبر المشاركة في جميع المعارض الدولية على مستوى العالم . تعد مكتبة العبيكان أحد أكبر المكتبات في العالم العربي والشرق الأوسط ، فهي تمتد إلى ۲۰ فرعا في جميع أنحاء المملكة ، تضم أكثر من مئة ألف من العناوين العربية والأجنبية توفرها لكل قارئ أو باحث أو طالب علم ، كما تضم مكتبة متخصصة للطفل تلبي كافة احتياجاتة المعرفية والتربوية . وقد قامت المكتبة بإتاحة محتوى رقمي يخدم الاحتياجات التعليمية والبحثية والمعرفية للدارسين والباحثين والمثقفين المهتمين بالمحتوى العربي من خلال التطوير المستمر لمكتبة العبيكان الرقمية وقاعدة بيانات إثراء المعارف الرقمية والتي يمكن استخدامها من خلال منصة بحث وواجهات تعامل معيارية ، وآليات الفهرسة والتكشيف وفقا للمعايير الدولية وبما يحقق التكامل المعر والتكنولوجي في الوقت نفسه</li></ol><img class="content_image" src="'+ app.images[6].img[1] +'"><img class="content_image" src="'+ app.images[6].img[2] +'">',
                featured:false,


            },
            {
                id:7,
                title:' Atomic Traning',
                content:'<ol><li>للدخول الى قائمة مصادر  يفتح لك جميع المصادر تقوم باختيار Atomic Training ثم اكتشف المزيد و يقدم يقوم بعرض مصادر من اكبر دور نشر عالمية متخصصة منها باللغة العربية والانجليزية والفرنسية وكذا الدوريات . وذلك مايخدم العملية التعليمية و من المصادر المتاحة مصدر ( Atomic training ) ثم اكتشف المزيد ثم قم بعمل حساب على ذلك المصدر</li></ol><p>2.مثال اذا اردنا أن نتعلم کورسات مايكروسوفت المتاحة E نقوم بتنشيطه ثم الضغط على Browse Tutorials عرض الكورسات لا ولیکن قم باختيار كورسات اكسيل ثم اختار رقم الاصدار من تلك البرنامج عند اتمام الاستماع الى جميع الموديلات ومقاطع الفيديو ستحصل على شهادة اون لاين من الموقع يمكنك بعد تلك الانتقال الى كورسات اخرى والتنقوم بكل حرية</p><img class="content_image" src="'+ app.images[7].img[0] +'"><img class="content_image" src="'+ app.images[7].img[1] +'"><img class="content_image" src="'+ app.images[7].img[2] +'">',
                featured:false,


            },
            {
                id:8,
                title:'الجمعيه الملكيه الأمريكيه',
                content:'<ol> <li>Leam Chemistry a ستار الجمعية الملكية للكيمياء هي من اكبر المجتمعات الكيميائية الرائدة في العالم ، توصيل المع العقول في العلوم الكيميائية في أي مكان في العالم و النهوض و التميز في العلوم الكيميائية هو من أهم اولويات الجمعية الجمعية الملكية للكيمياء منظمة غير هادفة للربح ذات تراث من العمر يصل الى اكثر من 175 عاما ، لدى الجمعية رؤية دولية طموحة تأتي من أكثر من ۵۲,۰۰۰ عضوا من 114 بلدا في جميع مجالات العلوم والأوساط الأكاديمية والصناعية . بالاضافة لبرامج التعليم ( لجميع الأعمار ابتداء من سن الخمس سنوات ) و برامج الاعتماد الأكاديمي لأقسام الكيمياء في الجامعات ، فإن الجمعية الملكية للكيمياء تعتبر افضل ناشر في العالم في مجال الكيمياء و العلوم المتعلقة بالكيمياء حسب اخر تصنيف لل ISI بمعدل * تاثير 5.68 average Impact Factor لجميع الدوريات حيث ان اكثر من 85 % من الدوريات لها عامل تأثير IF اكثر من 3 ( اعلی عامل تاثیر هو ۳۳.۳۸ وأقلها هو ۱۰۸۲ ) . الجمعية تنشر 4 دورية علمية تغطي كافة تخصصات و فروع الكيمياء ، بالاضافة لانتاج أكثر من ۱۰۰ کتاب سنويا و نشر العديد من قواعد البيانات . معدل التأثير ( ( average IF تم حسابه بجمع عامل التاثير F الكل دورية و من ثم قسمة الناتج على عدد الدوريات</li> </ol><img class="content_image" src="'+ app.images[12].img[0] +'">',
                featured:false,

            },
            {
                id:9,
                title:' Learn chemistry',
                content:'<ol> <li>المصدر Learn Chernial و ستلاحظ ان الموقع باللغة الانجليزية - اذا اردت ان تقوم بترجمته إلى اي لغة اخرى اضغط في مكان فارغ في النافذه سوف تظهر تتمة مختصر أختر منها Translate into English</li> </ol><img class="content_image" src="'+ app.images[8].img[0] +'"> <p>2.المصدر Learn Charalstry البحث في Learn Chemistry نستطيع أن تتعلم من خلاله وكذلك تستطيع أن تبحث من خلاله في الكيمياء بطريقتين او عن طريق قائمة المصادر Search resources وعند الضغط على السهم المقابل لها تظهر قائمة منسدله فيها A All resources جميع الموارد All resources except substances جميع الموارد بفناء المواد Information &amp; data المعلومات والبيانت Snippets &amp; articles المقتطفات والمقالات Educational resources &amp; tests الموارد التعليمية والاختبارات Lesson plans &amp; topics خطط الدرس والموضوعات Training &amp; curricula التدريب والمناهج الدراسية</p> </p><img class="content_image" src="'+ app.images[8].img[1] +'"><p>3.المصدر الم Learn Chemis لمن يريد تطوير نفسه ويدعم نفسه مهنيا يوجد شيار يسمي Courses Listings موجود تحت تيويب CPD بالضغط عليها سوف تظهر لك نافذه اخرى فيها الكورسات التي يمكن الاستفادة منها<img class="content_image" src="'+ app.images[8].img[2] +'">',
                featured:true,

            },
            {
                id:10,
                title:' Me book',
                content:'<p>لتعرف على Me Books المصدر Me Books . الضغط على ME Books Online سوف تظهر نافذه اخرى ربها Enjoy hundreds of popular children&#39;s stories : with the award - winning Me Books app ! تتمتع مئات من قصص الأطفال شعبية مع الحائز على جائزة لابد من استخدام تطبیق می بوك ! تتمتع بتكتب المصور نحتاج الى Create a Me Books acoount تسجيل حساب ثم لابد وان يكون هناك موبايل مثبت عليه هذا التطبيق</p><img class="content_image" src="'+ app.images[9].img[0] +'"><img class="content_image" src="'+ app.images[9].img[1] +'">',
                featured:false,
          },
            {
                id:11,
                title:' OneClickDigital',
                content:'<p>1.OneClickDigital je من أحد مصادر المتاحة ببنك المعرفة عباره عنة كتب صوتيه مسجلة وايضا الكترونية عند الدخول على قائمة مصادرنا تم کل مصادرنا الأنجليزية سوف يفتح</p><p>2.التعرف على OneClickDigital OneClickDigital السفر تمل ون كليك ديجيتال كتب مسجله حصريا ، وأيضا محتوى من جميع كبار الناشرین ، جنبا إلى جنب مع خدمة الكتاب الاليكتروني تجمع بين الكتب والصوت في مجموعة واحدة ، وتقدم المنصة الأكثر شمولا للمحتوى الخاص بك . تحتوي على كتفة واسعة من أفضل أنواع الأدب جنبا إلى جنب مع مجموعة من العناوين الحائزة على جوائز بارزة الشياب الان اضغط على OneClickdigital</p><img class="content_image" src="'+ app.images[10].img[0] +'"><img class="content_image" src="'+ app.images[10].img[1] +'">',
                featured:false,

            },
            {
                id:12,
                title:' National Geographic',
                content:'<p>1.المصدر National Geographic من احد مصادر المتاحة ببنك المعرفة ة تحتوي على منات من الكتب و الخرائط والفيديو والصور عند الدخول على قائمة مصادرنا تم کل مصادرنا الانجليزية سوف يفتح المصادر نقوم باختيار National Geographic</p><p>2.المصدر National Geographic National Geographic D و Gale ، وهي جزء من Cengage Learning ، قد شاركت جلب موارد هائلة للحياة الرقمية مع مكتية ناشيونال جيوغرافيك الافتراضية الآن لديك حق الوصول إلى أرشيف مجلة ناشيونال جيوغرافيك جنبا إلى جنب مع مجموعة عبر البحث من ناشيونال جيوغرافيك . وتشمل هذه المجموعة الشاملة ما يلي وأرشيف مجلة ناشيونال جيوغرافيك ، ۱۸۸۸-۱۹۹۶ مناشيونال جيوغرافيك الناس ، الحيوانات ، والعالم منذ تأسيسها في عام ۱۸۸۸ ، نمت الجمعية الجغرافية الوطنية لتصبح منظمة مرادفة للاستكشاف والتصوير والخرائط ، وإعادة التفكير في العالم كما نعرفه من مجلة ناشيونال جيوغرافيك الشهيرة الى ناشيونال جيوغرافيك المسافر الشهير ومئات من الكتب و الخرائط والفيديو والصور ، وليس هناك ببساطة أي بديل عن العمق والجودة ناتيونال جيوغرافيك فيرتوال ليبراري سيجلب إلى مكتبتك</p><img class="content_image" src="'+ app.images[11].img[0] +'"><img class="content_image" src="'+ app.images[11].img[1] +'">',
                featured:true,

            }
        ]        
    },
    {
        id:4,
        icon:"dungeon",
        name:'بوابة الطلاب و المعلمون',
        topics:[
            {
                id:13,
                title:'بوابة الطلاب و المعلمون',
                content:'<p>تحتوي على العديد من الكتب الخاصة بالمقررات الدراسية ، بالإضافة إلى العديد من المصادر المعرفية والتعليمية من كبرى دور النشر العالمية وشركات الإنتاج العالمية العاملة في هذا المجال ، سواء في صورة نصوص أو الموسوعات أو المصادر المرجعية أو مقاطع فيديو لتبسيط العلوم أو غيرها من الوساط المتعددة الخاصة بذلك . بوابة مخصصة للتعليم في مختلف المراحل العلمية ، ويمكنك التسجيل بها من خلال الضغط على اختيار « بوابة الطلاب والمعلمون » . سهلة الإستخدام تحتوي علي نظام بحث موحد مرن الإستخدام للبحث في آلاف المقرراة الدراسية للعلوم المختلفه للمراحل الجامعية وقيا الجامعية وكذلك الكتب المرجعية من كبري دور النشر العاملة في هذا المجال فضلا عن موسوعة بريتانيكا للطلبة ومءات الالاف من الفيديوهات والصور الحقيقية والتخيلية لتبسيط إستيعاب العلوم ما قنوات ديسكفري وناشيونال جيوجرافيك.</p><img class="content_image" src="'+ app.images[0].img[0] +'">',
                featured:true,
            }
        ]
    }

]

app.initialize()