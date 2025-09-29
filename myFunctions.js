/* myFunctions.js */

// المفتاح المستخدم للتخزين في LocalStorage
const STORAGE_KEY = 'AI_APPS_DATA';

// =====================================================
// وظائف إدارة البيانات (LocalStorage Management)
// =====================================================

function getAppsFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveAppsToStorage(apps) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    } catch (e) {
        alert("حدث خطأ أثناء حفظ البيانات.");
    }
}

// دالة لتهيئة البيانات الأولية (لتحقيق متطلب الـ 5 بنود)
function initializeData() {
    if (getAppsFromStorage().length === 0) {
        // ملاحظة للطلاب: يجب استبدال هذه الروابط بملفات صور وفيديو مناسبة وصغيرة الحجم.
        const sampleVideo = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";

        const initialData = [
            {
                id: 1, appName: "TensorFlow", developer: "Google", websiteUrl: "https://www.tensorflow.org/", usageField: "Robotics", isFree: true,
                description: "مكتبة برمجية مفتوحة المصدر لتعلم الآلة.",
                logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/200px-Tensorflow_logo.svg.png",
                mediaUrl: sampleVideo
            },
            {
                id: 2, appName: "PyTorch", developer: "Meta AI", websiteUrl: "https://pytorch.org/", usageField: "Education", isFree: true,
                description: "مكتبة تعلم آلة مفتوحة المصدر تعتمد على مكتبة Torch.",
                logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/PyTorch_logo_icon.svg/200px-PyTorch_logo_icon.svg.png",
                mediaUrl: sampleVideo
            },
            {
                id: 3, appName: "ChatGPT", developer: "OpenAI", websiteUrl: "https://openai.com/chatgpt/", usageField: "E-Commerce", isFree: false,
                description: "نموذج لغوي كبير تم تطويره بواسطة OpenAI.",
                logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/200px-ChatGPT_logo.svg.png",
                mediaUrl: sampleVideo
            },
             {
                id: 4, appName: "Midjourney", developer: "Midjourney Inc", websiteUrl: "https://www.midjourney.com/", usageField: "Art", isFree: false,
                description: "برنامج ذكاء اصطناعي توليدي يقوم بإنشاء صور من أوصاف نصية.",
                // استخدام رابط شعار بديل لأن الرابط في الوكيبيديا قد لا يعمل بشكل جيد في بعض المتصفحات
                logoUrl: "https://miro.medium.com/v2/resize:fit:805/1*843m8g8lJ0z6kweu7Iu1RQ.png",
                mediaUrl: sampleVideo
            },
             {
                id: 5, appName: "Watson", developer: "IBM", websiteUrl: "https://www.ibm.com/watson", usageField: "Healthcare", isFree: false,
                description: "نظام حوسبة معرفي من IBM يساعد المؤسسات على التنبؤ بالنتائج وأتمتة العمليات.",
                logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/IBM_Watson_logo_2019.svg/200px-IBM_Watson_logo_2019.svg.png",
                mediaUrl: sampleVideo
            }
        ];
        saveAppsToStorage(initialData);
    }
}

// =====================================================
// وظائف التحقق من المدخلات (Validation Functions)
// =====================================================

function resetValidationErrors() {
    // استخدام JQuery لإخفاء الرسائل وإزالة الكلاس invalid
    $('.error-message').hide();
    $('input, select, textarea').removeClass('invalid');
}

// دالة التحقق من مدخلات النموذج
function validateAppForm() {
    let isValid = true;
    resetValidationErrors();

    // 1. اسم التطبيق (أحرف إنجليزية فقط، بدون فراغات)
    // Regex: /^[A-Za-z]+$/
    const appName = $('#appName').val().trim();
    if (appName === "" || !/^[A-Za-z]+$/.test(appName)) {
        $('#appNameError').text('اسم التطبيق يجب أن يحتوي على أحرف إنجليزية فقط وبدون فراغات.').show();
        $('#appName').addClass('invalid');
        isValid = false;
    }

    // 2. الشركة المصنعة (أحرف إنجليزية وأرقام)
    // Regex: /^[A-Za-z0-9\s]+$/ (السماح بالفراغات \s لأنها لم تمنع صراحة)
    const developer = $('#developer').val().trim();
    if (developer === "" || !/^[A-Za-z0-9\s]+$/.test(developer)) {
        $('#developerError').text('اسم الشركة يجب أن يحتوي على أحرف إنجليزية وأرقام فقط.').show();
        $('#developer').addClass('invalid');
        isValid = false;
    }

    // 3. الموقع الالكتروني (URL) - استخدام التحقق المدمج في المتصفح (HTML5)
    // التحقق من الفراغ، ومن صحة الصيغة (typeMismatch)، ومن مطابقة النمط (patternMismatch)
    const websiteUrlInput = document.getElementById('websiteUrl');
    if ($('#websiteUrl').val().trim() === "" || websiteUrlInput.validity.typeMismatch || websiteUrlInput.validity.patternMismatch) {
         $('#websiteUrlError').text('يرجى إدخال رابط موقع صحيح يبدأ بـ http أو https (مثل https://example.com).').show();
         $('#websiteUrl').addClass('invalid');
         isValid = false;
    }

    // 4. مجال الاستخدام
    if ($('#usageField').val() === "") {
        $('#usageFieldError').text('يرجى اختيار مجال الاستخدام.').show();
        $('#usageField').addClass('invalid');
        isValid = false;
    }

    // 5. الشرح المختصر
    if ($('#description').val().trim() === "") {
        $('#descriptionError').text('يرجى إدخال شرح مختصر.').show();
        $('#description').addClass('invalid');
        isValid = false;
    }

    // 6. رابط الشعار (URL)
    const logoUrlInput = document.getElementById('logoUrl');
    if ($('#logoUrl').val().trim() === "" || logoUrlInput.validity.typeMismatch || logoUrlInput.validity.patternMismatch) {
        $('#logoUrlError').text('يرجى إدخال رابط شعار صحيح.').show();
        $('#logoUrl').addClass('invalid');
        isValid = false;
    }

    // 7. رابط الميديا (URL)
    const mediaUrlInput = document.getElementById('mediaUrl');
     if ($('#mediaUrl').val().trim() === "" || mediaUrlInput.validity.typeMismatch || mediaUrlInput.validity.patternMismatch) {
        $('#mediaUrlError').text('يرجى إدخال رابط ميديا صحيح.').show();
        $('#mediaUrl').addClass('invalid');
        isValid = false;
    }

    return isValid;
}

// =====================================================
// وظائف العرض والإدخال (Display and Input Functions)
// =====================================================

// دالة لحفظ التطبيق الجديد والانتقال
function saveAppDataAndRedirect() {
    const newApp = {
        id: Date.now(), // معرف فريد
        appName: $('#appName').val().trim(),
        developer: $('#developer').val().trim(),
        websiteUrl: $('#websiteUrl').val().trim(),
        usageField: $('#usageField').val(),
        isFree: $('#isFree').is(':checked'), // استخدام JQuery لقراءة الـ Checkbox
        description: $('#description').val().trim(),
        logoUrl: $('#logoUrl').val().trim(),
        mediaUrl: $('#mediaUrl').val().trim()
    };

    const apps = getAppsFromStorage();
    apps.push(newApp);
    saveAppsToStorage(apps);

    // إظهار رسالة نجاح والانتقال
    $('#validationStatus').text('تم الحفظ بنجاح. جاري الانتقال...').show();
    $('input[type="submit"]').prop('disabled', true);

    setTimeout(function() {
         // الانتقال إلى صفحة عرض التطبيقات (apps.html)
        window.location.href = 'apps.html';
    }, 1000);
}

// دالة لتحميل وعرض البيانات في الجدول
function loadAppsData() {
    const apps = getAppsFromStorage();
    const tableBody = $('#appsTableBody');
    tableBody.empty();

    if (apps.length === 0) {
        tableBody.append('<tr><td colspan="5">لا توجد بيانات لعرضها.</td></tr>');
        return;
    }

    apps.forEach(app => {
        const freeStatus = app.isFree ? 'مجاني' : 'غير مجاني';

        // 1. إنشاء الصف الرئيسي
        const row = `
            <tr data-id="${app.id}">
                <td>${app.appName}</td>
                <td>${app.developer}</td>
                <td>${app.usageField}</td>
                <td>${freeStatus}</td>
                <td><button class="toggle-details-btn">إظهار التفاصيل</button></td>
            </tr>
        `;
        tableBody.append(row);

        // 2. إنشاء صف التفاصيل (مخفي افتراضياً بواسطة CSS)
        const detailsRow = `
            <tr class="app-details" data-details-id="${app.id}">
                <td colspan="5">
                    <div class="details-container">
                        <div class="details-info">
                            <h4>تفاصيل إضافية</h4>
                            <p><strong>عنوان الموقع الالكتروني:</strong> <a href="${app.websiteUrl}" target="_blank" dir="ltr">${app.websiteUrl}</a></p>
                            <p><strong>شرح مختصر:</strong> ${app.description}</p>
                        </div>
                        <div class="details-media">
                             <p><strong>(Logo) صورة:</strong></p>
                             <img src="${app.logoUrl}" alt="${app.appName} Logo" class="app-logo" onerror="this.alt='فشل تحميل الشعار';">

                             <p><strong>ملف صوتي أو فيديو:</strong></p>
                             <video controls src="${app.mediaUrl}" class="app-video" preload="metadata">
                                المتصفح لا يدعم تشغيل الفيديو.
                             </video>
                        </div>
                    </div>
                </td>
            </tr>
        `;
        tableBody.append(detailsRow);
    });
}

// =====================================================
// التنفيذ الرئيسي (Document Ready)
// =====================================================

// استخدام JQuery للتأكد من جاهزية الصفحة قبل التنفيذ
$(document).ready(function() {

    // تهيئة البيانات الأولية
    initializeData();

    // --- 1. معالجة صفحة add_app.html ---
    if ($('#addAppForm').length) {

        $('#addAppForm').submit(function(event) {
            event.preventDefault(); // منع الإرسال الافتراضي

            if (validateAppForm()) {
                saveAppDataAndRedirect();
            } else {
                // تحريك الصفحة لأول خطأ مرئي (تحسين تجربة المستخدم)
                if ($('.invalid').length > 0) {
                     $('html, body').animate({
                        scrollTop: ($('.invalid').first().offset().top - 100)
                    }, 500);
                }
            }
        });

        // معالجة زر "إعادة"
        $('#addAppForm').on('reset', function() {
            resetValidationErrors();
            $('#validationStatus').hide();
            $('input[type="submit"]').prop('disabled', false);
        });
    }

    // --- 2. معالجة صفحة apps.html ---
    if ($('#appsTable').length) {
        loadAppsData();

        // تنفيذ متطلب JQuery: إخفاء وإظهار التفاصيل
        // استخدام تفويض الحدث (Event Delegation) للتعامل مع الأزرار المنشأة ديناميكياً
        $('#appsTableBody').on('click', '.toggle-details-btn', function() {
            const button = $(this);
            const parentRow = button.closest('tr');
            const appId = parentRow.data('id');
            const detailsRow = $(`tr[data-details-id="${appId}"]`);

            // استخدام JQuery لتنفيذ عملية الإظهار/الإخفاء (Toggle) بحركة انسيابية
            detailsRow.slideToggle(400, function() {
                 // تبديل نص الزر بعد انتهاء الحركة
                if (detailsRow.is(':visible')) {
                    button.text('إخفاء التفاصيل');
                } else {
                    button.text('إظهار التفاصيل');
                    // إيقاف الفيديو عند إخفاء التفاصيل
                    detailsRow.find('video').each(function() {
                        this.pause();
                    });
                }
            });
        });
    }
});