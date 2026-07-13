type Lang = 'uz' | 'en' | 'ar';

const serviceMap: Record<string, Record<Lang, string>> = {
  'Oil change + filter':        { en: 'Oil change + filter',        uz: "Moy almashtirish + filtr",    ar: 'تغيير الزيت + الفلتر' },
  'Brake pad replacement':      { en: 'Brake pad replacement',      uz: "Tormoz kolodka almashtirish", ar: 'استبدال وسادات الفرامل' },
  'Engine repair':              { en: 'Engine repair',              uz: "Dvigatel ta'miri",            ar: 'إصلاح المحرك' },
  'Tire replacement':           { en: 'Tire replacement',           uz: "Shina almashtirish",          ar: 'استبدال الإطارات' },
  'Technical inspection':       { en: 'Technical inspection',       uz: "Texnik ko'rik",               ar: 'الفحص الفني' },
  'Electrical system repair':   { en: 'Electrical system repair',   uz: "Elektr tizimi ta'miri",       ar: 'إصلاح النظام الكهربائي' },
  'AC service':                 { en: 'AC service',                 uz: "Konditsioner xizmati",        ar: 'خدمة مكيف الهواء' },
  'AC repair':                  { en: 'AC repair',                  uz: "Konditsioner ta'miri",        ar: 'إصلاح مكيف الهواء' },
  'Transmission fluid change':  { en: 'Transmission fluid change',  uz: "Transmissiya yog'i",          ar: 'تغيير زيت ناقل الحركة' },
  'Battery replacement':        { en: 'Battery replacement',        uz: "Akkumulyator almashtirish",   ar: 'استبدال البطارية' },
  'Carburetor cleaning':        { en: 'Carburetor cleaning',        uz: "Karbyurator tozalash",        ar: 'تنظيف الكاربوريتور' },
  'Water pump repair':          { en: 'Water pump repair',          uz: "Suv nasosi ta'miri",          ar: 'إصلاح مضخة الماء' },
  'Clutch replacement':         { en: 'Clutch replacement',         uz: "Mufta almashtirish",          ar: 'استبدال القابض' },
  'Suspension repair':          { en: 'Suspension repair',          uz: "Amortizator ta'miri",         ar: 'إصلاح نظام التعليق' },
  'Safety inspection':          { en: 'Safety inspection',          uz: "Xavfsizlik tekshiruvi",       ar: 'فحص السلامة' },
  'Cancelled by client':        { en: 'Cancelled by client',        uz: "Mijoz bekor qildi",           ar: 'ألغاه العميل' },
  'Alternator repair':          { en: 'Alternator repair',          uz: "Generator ta'miri",           ar: 'إصلاح المولد' },
  'Shock absorber replacement': { en: 'Shock absorber replacement', uz: "Amortizator almashtirish",    ar: 'استبدال ممتص الصدمات' },
  'Radiator flush':             { en: 'Radiator flush',             uz: "Radiator yuvish",             ar: 'غسيل المبرد' },
  'Fuel pump repair':           { en: 'Fuel pump repair',           uz: "Yonilg'i nasosi ta'miri",     ar: 'إصلاح مضخة الوقود' },
  'Thermostat replacement':     { en: 'Thermostat replacement',     uz: "Termostot almashtirish",      ar: 'استبدال الثرموستات' },
  'Belt replacement':           { en: 'Belt replacement',           uz: "V-kamar almashtirish",        ar: 'استبدال السير' },
};

const specialtyMap: Record<string, Record<Lang, string>> = {
  'Engine & Transmission': { en: 'Engine & Transmission', uz: "Dvigatel va Transmissiya", ar: 'المحرك وناقل الحركة' },
  'Electrical Systems':    { en: 'Electrical Systems',    uz: "Elektr tizimlari",         ar: 'الأنظمة الكهربائية' },
  'Suspension & Brakes':   { en: 'Suspension & Brakes',   uz: "Amortizator va Tormoz",    ar: 'التعليق والفرامل' },
  'AC & Cooling':          { en: 'AC & Cooling',          uz: "Konditsioner va Sovutish", ar: 'التكييف والتبريد' },
  'Body & Paint':          { en: 'Body & Paint',          uz: "Kuzov va Bo'yoq",          ar: 'الهيكل والطلاء' },
  'Diagnostics':           { en: 'Diagnostics',           uz: "Diagnostika",              ar: 'التشخيص' },
};

const partNameMap: Record<string, Record<Lang, string>> = {
  'Oil Filter':         { en: 'Oil Filter',         uz: "Moy filtri",          ar: 'فلتر الزيت' },
  'Air Filter':         { en: 'Air Filter',         uz: "Havo filtri",         ar: 'فلتر الهواء' },
  'Brake Pads (Front)': { en: 'Brake Pads (Front)', uz: "Tormoz kolodkasi (old)", ar: 'وسادات الفرامل (أمامية)' },
  'Engine Oil 5W-30':   { en: 'Engine Oil 5W-30',   uz: "Motor moyi 5W-30",    ar: 'زيت المحرك 5W-30' },
  'Spark Plugs (NGK)':  { en: 'Spark Plugs (NGK)',  uz: "Spark plug NGK",      ar: 'شمعات الإشعال NGK' },
  'Battery 70Ah':       { en: 'Battery 70Ah',       uz: "Akkumulyator 70Ah",   ar: 'بطارية 70Ah' },
  'Drive Belt':         { en: 'Drive Belt',         uz: "V-kamar",             ar: 'سير الإدارة' },
  'Brake Disc':         { en: 'Brake Disc',         uz: "Tormoz diski",        ar: 'قرص الفرامل' },
  'Cabin Air Filter':   { en: 'Cabin Air Filter',   uz: "Salon havo filtri",   ar: 'فلتر هواء المقصورة' },
  'Windshield Wipers':  { en: 'Windshield Wipers',  uz: "Oyna tozalagich",     ar: 'مساحات الزجاج' },
};

const categoryMap: Record<string, Record<Lang, string>> = {
  'Filters':   { en: 'Filters',   uz: "Filtrlar",   ar: 'الفلاتر' },
  'Brakes':    { en: 'Brakes',    uz: "Tormozlar",  ar: 'الفرامل' },
  'Fluids':    { en: 'Fluids',    uz: "Suyuqliklar",ar: 'السوائل' },
  'Ignition':  { en: 'Ignition',  uz: "Alish tizimi",ar: 'نظام الإشعال' },
  'Electrical':{ en: 'Electrical',uz: "Elektrik",   ar: 'كهربائي' },
  'Engine':    { en: 'Engine',    uz: "Dvigatel",   ar: 'المحرك' },
  'Exterior':  { en: 'Exterior',  uz: "Kuzov",      ar: 'الهيكل الخارجي' },
};

const colorMap: Record<string, Record<Lang, string>> = {
  'White':  { en: 'White',  uz: "Oq",     ar: 'أبيض' },
  'Silver': { en: 'Silver', uz: "Kumush", ar: 'فضي' },
  'Black':  { en: 'Black',  uz: "Qora",   ar: 'أسود' },
  'Blue':   { en: 'Blue',   uz: "Ko'k",   ar: 'أزرق' },
  'Red':    { en: 'Red',    uz: "Qizil",  ar: 'أحمر' },
  'Yellow': { en: 'Yellow', uz: "Sariq",  ar: 'sariq' },
  'Gray':   { en: 'Gray',   uz: "Kulrang",ar: 'رمادي' },
};

function tr(map: Record<string, Record<Lang, string>>, key: string, lang: Lang): string {
  return map[key]?.[lang] ?? key;
}

export function trService(key: string, lang: string)   { return tr(serviceMap,   key, (lang as Lang) || 'en'); }
export function trSpecialty(key: string, lang: string) { return tr(specialtyMap, key, (lang as Lang) || 'en'); }
export function trPartName(key: string, lang: string)  { return tr(partNameMap,  key, (lang as Lang) || 'en'); }
export function trCategory(key: string, lang: string)  { return tr(categoryMap,  key, (lang as Lang) || 'en'); }
export function trColor(key: string, lang: string)     { return tr(colorMap,     key, (lang as Lang) || 'en'); }
