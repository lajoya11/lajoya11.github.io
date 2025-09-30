/* myFunctions.js - Final Version with Updated & Relevant Videos and Images */

const STORAGE_KEY = 'AI_APPS_DATA';

$(document).ready(function() {

    // --- 1. التحكم في مظهر الموقع (Light/Dark Mode) ---
    const themeToggleBtn = $('<button id="theme-toggle" aria-label="تبديل المظهر"></button>');
    $('header .container').prepend(themeToggleBtn);

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        $('body').addClass('dark-mode');
        themeToggleBtn.html('☀️');
    } else {
        themeToggleBtn.html('🌙');
    }

    themeToggleBtn.click(function() {
        $('body').toggleClass('dark-mode');
        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            $(this).html('☀️');
        } else {
            localStorage.setItem('theme', 'light');
            $(this).html('🌙');
        }
    });

    // --- 2. قائمة الموبايل (Simple & Reliable slideToggle) ---
    $('#nav-toggle').click(function() {
        $('#main-nav').slideToggle(300);
    });

    // --- 3. تهيئة البيانات ---
    initializeData();

    // --- 4. معالجة صفحة add_app.html ---
    if ($('#addAppForm').length) {
        $('#addAppForm').submit(function(event) {
            event.preventDefault();
            if (validateAppForm()) {
                saveAppDataAndRedirect();
            } else {
                if ($('.invalid').length > 0) {
                     $('html, body').animate({
                        scrollTop: ($('.invalid').first().offset().top - ($('header').outerHeight() + 20))
                    }, 500);
                }
            }
        });
        $('#addAppForm').on('reset', function() {
            resetValidationErrors();
            $('#validationStatus').hide();
        });
    }

    // --- 5. معالجة صفحة apps.html ---
    if ($('#appsTable').length) {
        loadAppsData();

        $('#appsTableBody').on('click', '.toggle-details-btn', function() {
            const button = $(this);
            const detailsRow = button.closest('tr').next('.app-details');
            const iframe = detailsRow.find('iframe');

            if (detailsRow.is(':visible')) {
                iframe.removeAttr('src');
            } else {
                const videoSrc = iframe.data('src');
                if (videoSrc) {
                    iframe.attr('src', videoSrc);
                }
            }
            
            detailsRow.slideToggle(400, function() {
                if (detailsRow.is(':visible')) {
                    button.text('إخفاء التفاصيل');
                } else {
                    button.text('إظهار التفاصيل');
                }
            });
        });
    }
});


function getAppsFromStorage(){const data=localStorage.getItem(STORAGE_KEY);return data?JSON.parse(data):[]}
function saveAppsToStorage(apps){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(apps))}catch(e){alert("حدث خطأ أثناء حفظ البيانات.")}}

function initializeData() {
    if (getAppsFromStorage().length > 0) {
        return;
    }
    const initialData = [
        {
            id: 1, appName: "ChatGPT", developer: "OpenAI", websiteUrl: "https://chatgpt.com/", usageField: "Productivity", isFree: true,
            description: "نموذج لغوي رائد يمكنه الإجابة على الأسئيم وتلخيص النصوص وإنشاء محتوى متنوع.",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", // تم الإبقاء على رابط ويكيبيديا أو يمكنك استبداله برابط مباشر آخر إذا أردت
            mediaUrl: "https://www.youtube.com/embed/OGmDr8TLtTo?autoplay=0" /* فيديو: ChatGPT New Official Intro */
        },
        {
            id: 2, appName: "GitHubCopilot", developer: "GitHub Microsoft", websiteUrl: "https://github.com/features/copilot", usageField: "Development", isFree: false,
            description: "مساعد برمجي يعمل بالذكاء الاصطناعي يساعد المطورين على كتابة التعليمات البرمجية بشكل أسرع وبأخطاء أقل.",
            logoUrl: "https://a.top4top.io/p_3560b4hx81.png", /* تم تحديث رابط الشعار */
            mediaUrl: "https://www.youtube.com/embed/xf65vxjNWdk?autoplay=0" /* تم تحديث رابط الفيديو */
        },
        {
            id: 3, appName: "Midjourney", developer: "Midjourney Inc", websiteUrl: "https://www.midjourney.com/", usageField: "Art & Design", isFree: false,
            description: "أداة ذكاء اصطناعي توليدية لإنشاء صور فنية عالية الجودة من خلال أوصاف نصية بسيطة.",
            logoUrl: "https://f.top4top.io/p_3560b2j0i1.png", /* تم تحديث رابط الشعار */
            mediaUrl: "https://www.youtube.com/embed/E9PvSeIO5NY?autoplay=0" /* تم تحديث رابط الفيديو */
        },
        {
            id: 4, appName: "TensorFlow", developer: "Google", websiteUrl: "https://www.tensorflow.org/", usageField: "Machine Learning", isFree: true,
            description: "منصة مفتوحة المصدر وشاملة لتعلم الآلة (ML). توفر مكتبة قوية لبناء وتدريب نماذج الذكاء الاصطناعي.",
            logoUrl: "https://k.top4top.io/p_356044ty31.png", /* تم تحديث رابط الشعار */
            mediaUrl: "https://www.youtube.com/embed/i8NETqtGHms?autoplay=0" /* تم تحديث رابط الفيديو */
        },
        {
            id: 5, appName: "AlphaFold", developer: "DeepMind", websiteUrl: "https://deepmind.google/technologies/alphafold/", usageField: "Healthcare", isFree: true,
            description: "نظام ذكاء اصطناعي يتنبأ بالبنية ثلاثية الأبعاد للبروتين من تسلسل الأحماض الأمينية الخاصة به.",
            logoUrl: "https://g.top4top.io/p_35601qa0t1.png", // تم الإبقاء على رابط DeepMind الرسمي
            mediaUrl: "https://www.youtube.com/embed/KpedmJdrTpY?autoplay=0" /* فيديو: AlphaFold Explained | DeepMind */
        }
    ];
    saveAppsToStorage(initialData);
}

function resetValidationErrors(){$('.error-message').hide();$('input, select, textarea').removeClass('invalid')}
function validateAppForm(){let isValid=true;resetValidationErrors();const appName=$('#appName').val().trim();if(appName===""||!/^[A-Za-z]+$/.test(appName)){$('#appNameError').text('اسم التطبيق يجب أن يحتوي على أحرف إنجليزية فقط وبدون فراغات أو أرقام.').show();$('#appName').addClass('invalid');isValid=false}
const developer=$('#developer').val().trim();if(developer===""||!/^[A-Za-z0-9\s]+$/.test(developer)){$('#developerError').text('اسم الشركة يجب أن يحتوي على أحرف إنجليزية وأرقام فقط (بدون رموز خاصة).').show();$('#developer').addClass('invalid');isValid=false}
const websiteUrlInput=document.getElementById('websiteUrl');if($('#websiteUrl').val().trim()===""||websiteUrlInput.validity.typeMismatch||websiteUrlInput.validity.patternMismatch){$('#websiteUrlError').text('يرجى إدخال رابط موقع صحيح يبدأ بـ http أو https.').show();$('#websiteUrl').addClass('invalid');isValid=false}
if($('#usageField').val()===""){ $('#usageFieldError').text('يرجى اختيار مجال الاستخدام.').show();$('#usageField').addClass('invalid');isValid=false}
if($('#description').val().trim()===""){ $('#descriptionError').text('يرجى إدخال شرح مختصر.').show();$('#description').addClass('invalid');isValid=false}
const logoUrlInput=document.getElementById('logoUrl');if($('#logoUrl').val().trim()===""||logoUrlInput.validity.typeMismatch||logoUrlInput.validity.patternMismatch){$('#logoUrlError').text('يرجى إدخال رابط شعار صحيح.').show();$('#logoUrl').addClass('invalid');isValid=false}
const mediaUrlInput=document.getElementById('mediaUrl');if($('#mediaUrl').val().trim()===""||mediaUrlInput.validity.typeMismatch||mediaUrlInput.validity.patternMismatch){$('#mediaUrlError').text('يرجى إدخال رابط ميديا صحيح.').show();$('#mediaUrl').addClass('invalid');isValid=false}
return isValid}
function saveAppDataAndRedirect(){const newApp={id:Date.now(),appName:$('#appName').val().trim(),developer:$('#developer').val().trim(),websiteUrl:$('#websiteUrl').val().trim(),usageField:$('#usageField').val(),isFree:$('#isFree').is(':checked'),description:$('#description').val().trim(),logoUrl:$('#logoUrl').val().trim(),mediaUrl:$('#mediaUrl').val().trim()};const apps=getAppsFromStorage();apps.push(newApp);saveAppsToStorage(apps);$('#validationStatus').text('تم الحفظ بنجاح. جاري الانتقال...').show();$('input[type="submit"]').prop('disabled',true);setTimeout(function(){window.location.href='apps.html'},1000)}
function loadAppsData(){const apps=getAppsFromStorage();const tableBody=$('#appsTableBody');tableBody.empty();if(apps.length===0){tableBody.append('<tr><td colspan="5" style="text-align: center;">لا توجد بيانات لعرضها.</td></tr>');return}
apps.forEach(app=>{const freeStatus=app.isFree?'مجاني':'غير مجاني';const row=`<tr data-id="${app.id}"><td data-label="اسم التطبيق">${app.appName}</td><td data-label="الشركة المطورة">${app.developer}</td><td data-label="مجال الاستخدام">${app.usageField}</td><td data-label="التكلفة">${freeStatus}</td><td data-label="اختيار"><button class="toggle-details-btn">إظهار التفاصيل</button></td></tr>`;tableBody.append(row);const detailsRow=`<tr class="app-details" data-details-id="${app.id}"><td colspan="5"><div class="details-container"><div class="details-info"><h4>تفاصيل إضافية</h4><p><strong>عنوان الموقع الالكتروني:</strong> <a href="${app.websiteUrl}" target="_blank" dir="ltr">${app.websiteUrl}</a></p><p><strong>شرح مختصر:</strong> ${app.description}</p></div><div class="details-media"><p><strong>(Logo) صورة:</strong></p><img src="${app.logoUrl}" alt="${app.appName} Logo" class="app-logo" onerror="this.alt='فشل تحميل الشعار';"><p><strong>ملف صوتي أو فيديو:</strong></p><div class="media-wrapper"><iframe data-src="${app.mediaUrl}" title="Video player for ${app.appName}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></div></td></tr>`;tableBody.append(detailsRow)})}
