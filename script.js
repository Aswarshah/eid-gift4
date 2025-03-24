// تمام ضروری عناصر کو منتخب کریں
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const customizeAgainBtn = document.getElementById('customizeAgainBtn');
const userNameInput = document.getElementById('userName');
const relationSelect = document.getElementById('relation');
const finalMessage = document.getElementById('finalMessage');
const displayName = document.getElementById('displayName');

// URL سے ڈیٹا نکالیں
const urlParams = new URLSearchParams(window.location.search);
const urlName = urlParams.get('name');
const urlRelation = urlParams.get('relation');

// ایونٹ لسٹنرز شامل کریں
startBtn.addEventListener('click', () => showPage('page2'));
nextBtn.addEventListener('click', generateMessage);
whatsappBtn.addEventListener('click', shareOnWhatsApp);
customizeAgainBtn.addEventListener('click', () => showPage('page2'));

// صفحہ لوڈ ہونے پر چیک کریں
window.addEventListener('DOMContentLoaded', () => {
    if (urlName && urlRelation) {
        showPage('page3');
        showCustomMessage(urlName, urlRelation);
    } else {
        showPage('page1');
    }
});

// صفحات کو ظاہر/چھپانے کی فنکشن
function showPage(pageId) {
    document.querySelectorAll('.container').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// میسج جنریٹ کرنے کی فنکشن
function generateMessage() {
    const name = userNameInput.value.trim() || 'احمد';
    const relation = relationSelect.value;
    
    showPage('page3');
    showCustomMessage(name, relation);
    
    // URL اپڈیٹ کریں
    const newUrl = `${window.location.pathname}?name=${encodeURIComponent(name)}&relation=${encodeURIComponent(relation)}`;
    window.history.pushState({}, '', newUrl);
}

// کسٹم میسج دکھانے کی فنکشن
function showCustomMessage(name, relation) {
    const prefix = ['امی', 'بہن'].includes(relation) ? 'میری' : 'میرے';
    finalMessage.textContent = `${prefix} پیارے ${relation} کے لیے`;
    displayName.textContent = `${name} کی طرف سے عید الفطر مبارک ہو`;
}

// واٹس ایپ پر شیئر کرنے کی فنکشن
function shareOnWhatsApp() {
    const name = userNameInput.value.trim() || 'احمد';
    const relation = relationSelect.value;
    const currentUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${currentUrl}?name=${encodeURIComponent(name)}&relation=${encodeURIComponent(relation)}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent('عید مبارک! 🎉 آپ کے لیے خصوصی پیغام: ' + shareUrl)}`);
}